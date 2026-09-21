---
title: DotNet Publish, GitHub Actions, and Octopus Deploy
navMenu: false
pubDate: 2021-08-19T14:51:52+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - ASP.NET
    - Azure
    - GitHub
    - 'Octopus Deploy'
---

This was the first time I needed to create an end-to-end process with GitHub Actions and Octopus Deploy. Here's how I did it. The set up is a .NET (Core 3.1 currently) website that has an existing Publishing Profile that I have been using to create the artefacts as I've been testing different hosting scenarios. Now I know where this app is going, I need to create a proper pipeline to build, test, and deploy it to Azure.

That gives me the following set-up for the application.

<dl><dt>IDE</dt><dd>Visual Studio</dd><dt>Source Control</dt><dd>GitHub</dd><dt>Builds</dt><dd>GitHub Actions</dd><dt>Deployments</dt><dd>Octopus Deploy</dd><dt>Hosting</dt><dd>Azure</dd></dl>

## GitHub Actions – simple .NET build and test

GitHub actions run based on a file you place in a folder named `.github/workflows`. The files use YAML, but don't on it. This is one use case where YAML is quite a good solution as most other data formats would put you in quote-escaping hell.

Let's start with the "basic .NET build and test" action, so we can eliminate the noise from the stuff we are about to add.

This action is triggered by a push to "trunk" or by a pull request to "trunk" – you can see these triggers in the section that starts with `on:`.

Based on these triggers, it runs the build job containing the following four steps (each step has a `name` and something to `run`).

1. It makes sure we have the right version of .NET to build the code
2. It restores dependencies. It's useful to do this once up front rather than allow it to happen implicitly every time you built, test, or publish the code
3. It runs a release build (making sure to avoid restoring dependencies again)
4. It runs a test (making sure to avoid restoring dependencies again)

Here's the YAML file to do this.

```yaml
name: SimpleDotNetBuild

on:
  push:
    branches: [ trunk ]
  pull_request:
    branches: [ trunk ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: 🥅 Setup .NET Core
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 3.1.301
    - name: 🥅 Install dependencies
      run: dotnet restore
    - name: 🥅 Build
      run: dotnet build --configuration Release --no-restore
    - name: 🥅 Test
      run: dotnet test --no-restore --verbosity normal
```

## GithHub Actions – calling dotnet publish

Let's add a step at the end of this process to use our existing publishing profile to create the "distribution artefacts" that we will deploy in a later step.

The name can be anything you like, so just add something descriptive like "Publish WWW". Then we run our DotNet Publish command, using the `$GITHUB_WORKSPACE` environment variable to be specific about our file paths.

```yaml
   - name: 🥅 Publish WWW
      run: dotnet publish $GITHUB_WORKSPACE/Fenton.Website/Fenton.Website.csproj --configuration FolderProfile-winx64 --output $GITHUB_WORKSPACE/distwww --no-restore
```

In the above command, the `--configuration` flag is the name we gave our publishing profile. If you have multiple target platforms, you can add a step for each different profile name you need to publish. The `--output` flag sets where the output of the publish process should go. We will need this later when we package and publish the artefacts to Octopus Deploy. You'll notice the `--no-restore` flag is there, as we have done that once at the start of the whole build process.

## GitHub Actions – Package and Publish to Octopus Deploy

There are some community actions available for these steps, but it's also super simple to just use Octopus CLI in your actions, as the Octopus Deploy team has done a great job of making it easy to use. I'm using it directly, rather than through the pre-made actions. I'm a bit like that.

To publish to Octopus Deploy, we need the server address and an API key. If you sign-in to Octopus Deploy, the server address is just the URL with no path, i.e. `https://example.octopus.app`. You can generate an API key by going to your profile and selecting "API Keys". I recommend creating keys for specific purposes, rather than sharing the same key everywhere.

:::figure{.inset}
:img{src="/img/2021/08/octopus-api-key.jpg" alt="Octopus Deploy API Keys" loading="lazy"}
:::

With this information to hand, head over to **GitHub > Settings > Secrets** to add these two items to your list of secrets. I've called them "OCTOPUS\_SERVER" and "OCTOPUS\_APIKEY" and lots of other people have also named them like this, so let's call this a convention that will make it easier to re-use our GitHub action definitions.

:::figure{.inset}
:img{src="/img/2021/08/github-actions-secrets.jpg" alt="GitHub Actions Secrets" loading="lazy"}
:::

We can now write steps to download the Octopus CLI, package our stuff, and publish it to our Octopus Deploy server. That's three things, so we will do it in three steps, thus:

```yaml
    - name: 🐙 Install Octopus CLI
      uses: OctopusDeploy/install-octopus-cli-action@v1.1.6
      with:
        version: latest
    - name: 🐙 WWW Package
      run: octo pack --id="Website" --format="zip" --version="${{ github.run_number }}" --basePath="$GITHUB_WORKSPACE/distwww" --outFolder="$GITHUB_WORKSPACE/distoctopus"
    - name: 🐙 WWW Push
      run: octo push --package="$GITHUB_WORKSPACE/distoctopus/Website.${{ github.run_number }}.zip" --server="${{ secrets.OCTOPUS_SERVER }}" --apiKey="${{ secrets.OCTOPUS_APIKEY }}"
```

The first step uses the community action written by Octopus Deploy to install the latest version of the Octopus CLI. You can also specify a specific version of the CLI if you need to.

We then run `octo pack` to grab the contents of the "distwww" folder (that we created in the DotNet Publish step earlier) and place it in a package in the "distoctopus" folder. We use the `github.run_number` to version the package. Your version strategy could be more complex than this! This step is neat because you don't need to manage a whole NuGet package with associated package specs. It's just a zip file of things you want to deploy.

After this, we run `octo push` to send the package to the server. You can see here that being precise with all the paths makes it easier to correlate all these files we are creating as we progress through the build pipeline. We use `secrets.OCTOPUS_SERVER` and `secrets.OCTOPUS_APIKEY` to get the information we need for this step. Not only are secrets kept nice and safe in the GitHub UI, they are blanked-out of the logging statements that GitHub Actions write:

```cmd
Run octo push --package="$GITHUB_WORKSPACE/distoctopus/Website.88.zip" --server="***" --apiKey="***"
```

If you run all these steps, the result is a package in Octopus Deploy that is ready to release.

## Appendix one – Complete GitHub Action sample

```yaml
name: WebsiteBuildTestDeploy

on:
  push:
    branches: [ trunk ]
  pull_request:
    branches: [ trunk ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Setup .NET Core
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 3.1.301
    - name: 🥅 Install dependencies
      run: dotnet restore
    - name: 🥅 Build
      run: dotnet build --configuration Release --no-restore
    - name: 🥅 Test
      run: dotnet test --no-restore --verbosity normal
   - name: 🥅 Publish WWW
      run: dotnet publish $GITHUB_WORKSPACE/Fenton.Website/Fenton.Website.csproj --configuration FolderProfile-winx64 --output $GITHUB_WORKSPACE/distwww --no-restore
    - name: 🐙 Install Octopus CLI
      uses: OctopusDeploy/install-octopus-cli-action@v1.1.6
      with:
        version: latest
    - name: 🐙 WWW Package
      run: octo pack --id="Website" --format="zip" --version="${{ github.run_number }}" --basePath="$GITHUB_WORKSPACE/distwww" --outFolder="$GITHUB_WORKSPACE/distoctopus"
    - name: 🐙 WWW Push
      run: octo push --package="$GITHUB_WORKSPACE/distoctopus/Website.${{ github.run_number }}.zip" --server="${{ secrets.OCTOPUS_SERVER }}" --apiKey="${{ secrets.OCTOPUS_APIKEY }}"
```

## Appendix 2 – GitHub Actions screen

The below is the output for my whole production example – you'll see that I'm actually packaging two components rather just a single website component.

:img{src="/img/2021/08/github-actions-output.jpg" alt="GitHub Actions Output" loading="lazy"}
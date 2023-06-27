---
title: 'Upgrading Octopus GitHub Actions'
navMenu: false
pubDate: 2022-12-19
keywords: octopus deploy,github actions
description: Here are the things I found when updating Octopus Deploy GitHub Actions to v3.
bannerImage:
    src: /img/topic/octopus/github-actions-octopus.png
    alt: A happy blue Octopus wearing glasses is connected to GitHub Actions
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Octopus Deploy
    - GitHub
---

I have an existing app that is built by GitHub Actions and deployed by Octopus Deploy. It has been using the Octopus CLI to zip up the `/dist` directory, upload it to Octopus, and kick of the deployment to the first environment.

The new [Octopus Deploy GitHub Actions](https://octopus.com/blog/github-actions-for-octopus-deploy-v3) were released recently, so I decided to upgrade my Action to use the new versions.

Here's the key points I found along the way.

## Set environment variables

Rather than passing values the same values in each step, you can set some standard environment variables for Octopus to use. Add an `env:` node in your YAML file and set `OCTOPUS_URL`, `OCTOPUS_API_KEY`, and `OCTOPUS_SPACE`. The URL and key are set up as secrets in my GitHub repository.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    env:
      OCTOPUS_URL: ${{ secrets.OCTOPUSSERVERURL }}
      OCTOPUS_API_KEY: ${{ secrets.OCTOPUSSERVERAPIKEY }}
      OCTOPUS_SPACE: "My App Space"
```

## Creating a ZIP package

Here's a comparison of creating a ZIP package using the CLI, vs the new Actions:

Octopus CLI:

```yaml
- name: Install Octopus CLI
  uses: OctopusDeploy/install-octopus-cli-action@v1.2
  with:
    version: latest

- name: Package
  run: |
    octo pack \
      --format="Zip" \
      --id="MyApp" \
      --version="$PACKAGE_VERSION" \
      --basePath="$GITHUB_WORKSPACE/dist" \
      --outFolder="$GITHUB_WORKSPACE/artifacts"
```

Octopus Create ZIP Package Action:

```yaml
- name: Create a Zip package 🐙
  id: package
  uses: OctopusDeploy/create-zip-package-action@v3
  with:
    package_id: 'MyApp'
    version: "${{ env.PACKAGE_VERSION  }}"
    base_path: "./dist"
    output_folder: "./artifacts"
    files: |
      **/*.*
```

Key differences:

1. I no longer need a step to install the CLI
2. The version changes from `$PACKAGE_VERSION` to `${{ env.PACKAGE_VERSION }}`
3. I don't need to provide the full path with `$GITHUB_WORKSPACE` any longer

## Pushing the package

I'm going to show another example, as this shows how the "Create a Zip Package" step makes output variables available. You'll notice that the Zip step has and identifier: `id: package`. This let's us grab the information it has.

Octopus Actions v2:

```yaml
- name: Push Package
  uses: OctopusDeploy/push-package-action@v2
  with:
    api_key: ${{ secrets.OCTOPUSSERVERAPIKEY }}
    server: ${{ secrets.OCTOPUSSERVERURL }}
    space: ${{ secrets.OCTOPUSSERVER_SPACE }}
    packages: "artifacts/MyApp.${{ env.PACKAGE_VERSION }}.zip"
```

Octopus Actions v3:

```yaml
      - name: Push a package to Octopus Deploy 🐙
        uses: OctopusDeploy/push-package-action@v3
        with:
          packages: ${{ steps.package.outputs.package_file_path }}
```

Key differences:

1. The Octopus Server information all comes from the environment variables
2. The name and path of the Zip file is available from the `package` step

## Using Config as Code

If you are using Config as Code (i.e. your deployment is stored in the repository as OCL files), you will need to specify a `git_ref` in the "Create Release" step. This tells Octopus which branch to use for the deployment process.

The example below sends the current branch:

```yaml
- name: Create a release in Octopus Deploy 🐙
  uses: OctopusDeploy/create-release-action@v3
  id: "create_release"
  with:
    project: "MyApp"
    package_version: "${{ env.PACKAGE_VERSION }}"
    git_ref: ${{ github.ref }}
```

The `git_ref` in the example above will resolve the error message: "No GitRef value provided. Please provide the GitRef argument passing the branch name or commit that contains the project details for this release."

## Summary

You'll notice across the v3 Actions that you can do the same thing with fewer lines in your YAML file.

Here are links to the available GitHub Actions for Octopus Deploy:

- Create a zip file with [OctopusDeploy/create-zip-package-action@v3](https://github.com/marketplace/actions/create-zip-package-for-octopus-deploy) (or a Nuget package with [OctopusDeploy/create-nuget-package-action@v3
](https://github.com/marketplace/actions/create-nuget-package-for-octopus-deploy))
- Push the package to Octopus with [OctopusDeploy/push-package-action@v3](https://github.com/marketplace/actions/push-package-to-octopus-deploy)
- Send build information to Octopus with [OctopusDeploy/push-build-information-action@v3](https://github.com/marketplace/actions/push-build-information-to-octopus-deploy)
- Create an Octopus Release with [OctopusDeploy/create-release-action@v3](https://github.com/marketplace/actions/create-release-in-octopus-deploy)
- Deploy the release with [OctopusDeploy/deploy-release-action@v3](https://github.com/marketplace/actions/deploy-a-release-in-octopus-deploy)
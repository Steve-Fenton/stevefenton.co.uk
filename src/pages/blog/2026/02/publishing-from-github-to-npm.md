---
title: Setting GitHub as a trusted publisher for npm
avMenu: false
pubDate: 2026-02-14
keywords: npm,github
description: "How to set GitHub as a trusted publisher for npm."
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Continuous Delivery
---

So, stuff happened and **npm** has been updated to reduce the volume of stuff happening. In a world of SBOMs, SLSA, and supply chain attacks, it's time to get serious about publishing packages. In this case, that means using the new *Trusted Publisher* feature to connect GitHub (or GitLab) to **npm**.

## Set the trusted publisher on npm

1. Sign into [npm](https://npmjs.com)
2. Select the package you want to set up, for example `astro-accelerator-utils`
3. Click *Settings*
4. In the *Trusted Publishers* section, select your provider, in my case it's **GitHub**
5. Enter you repository information:
    - Organization or user name, for example `Steve-Fenton`
    - Repository name, for example `astro-accelerator-utils`
    - The result should be that `Steve-Fenton/astro-accelerator-utils` matches your repo in GitHub
6. Provide the workflow file name
   - This should match the workflow that will publish the package, in my case `build-astro.yml`
   - The file must be in `.github/workflows/`
7. Click **Set up connection**

If you use environments, you can optionally limit publishing by environment.

## Check you GitHub Action

In your permissions section, you need to allow `id-token` to be written.

```yaml
permissions:
    id-token: write
```

You can then use the `npm publish` step in your workflow.

I conditionally publish based on the version number, so I only publish when the version number changes.

```yaml
- name: Publish if version has been updated
    env:
        NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
    run: |
        PACKAGE_NAME=$(node -p "require('./package.json').name")
        LOCAL_VERSION=$(node -p "require('./package.json').version")
        REMOTE_VERSION=$(npm view $PACKAGE_NAME version || echo "0.0.0")

        if [ "$LOCAL_VERSION" != "$REMOTE_VERSION" ] && [ "$(printf '%s\n%s' "$REMOTE_VERSION" "$LOCAL_VERSION" | sort -V | tail -n1)" = "$LOCAL_VERSION" ]; then
        echo "Local version $LOCAL_VERSION is higher than remote version $REMOTE_VERSION. Publishing..."
        echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" > ~/.npmrc
        npm publish --access public
        else
        echo "Version $LOCAL_VERSION is not newer than $REMOTE_VERSION. Skipping publish."
        fi
```

This is a more secure way to publish npm packages, but it's also easier because you don't need to keep updating tokens and secrets.

---
id: 11707
layout: src/layouts/Default.astro
title: 'How to enable config-as-code in Octopus Deploy'
pubDate: 2021-10-07T09:28:54+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=11707'
permalink: /2021/10/how-to-enable-config-as-code-in-octopus-deploy/
categories:
    - Automation
tags:
    - octopus
---

Config-as-code is a new feature that has just been released in the early-access program at Octopus Deploy. This feature allows you to store your deployment process in version control, using Git to manage your deployment code in the same way you manage your application code.

I have enabled the preview on a non-production project to try out the new feature.

### About config-as-code

The Octopus Configuration as Code feature let’s you put your deployment process in version control, where you can view a history of changes in plain text files. The feature will later expand beyond deployment processes to include other deployment resources and runbooks.

You would normally store the configuration in the same repository as your application code. A folder named “.octopus” is created for you when you set this up.

If you have multiple deployment projects in the same repository, you can put them in separate sub-folders, which the UI will guide you through when you set it.

### Enable config-as-code

At the time of writing, this feature preview is rolling out to Octopus Cloud customers. If you don’t see the configuration setting described below, check back in a few days to see if it has arrived. It will be made available to Octopus Server at a later date.

From the dashboard in Octopus Deploy, navigate to **Configuration -&gt; Features** to see if you have the Early Access settings group.

Expand Configuration as Code and select Enabled. Then hit SAVE to store the change.

[![The Octopus Deploy configuration setting for Configuration-as-Code](https://www.stevefenton.co.uk/wp-content/uploads/2021/10/octopus-deploy-config-as-code-1024x646.png)](https://www.stevefenton.co.uk/2021/10/how-to-enable-config-as-code-in-octopus-deploy/octopus-deploy-config-as-code/)

When you navigate to a deployment project, you will now see a new setting called Version Control.

### Connect a Git repository

I’m going to connect my deployment project to the same Git repository I use for the application code. I am using GitHub to do this, but any Git repository can be used. You can also decide to store your deployment code in a separate repository if you would prefer to manage it that way.

There are two things you need to obtain from GitHub before you set up the Git repository in Octopus Deploy:

1. The URL of your GitHub repository
2. A personal access token for GitHub

The URL of your GitHub repository can be found in the Code tab, using the drop-down panel behind the green Code button.

[![Obtain your GitHub repository URL from the Code tab in GitHub.](https://www.stevefenton.co.uk/wp-content/uploads/2021/10/github-repository-url-1024x487.png)](https://www.stevefenton.co.uk/2021/10/how-to-enable-config-as-code-in-octopus-deploy/github-repository-url/)

You can obtain a new personal access token from **Profile -&gt; Settings -&gt; Developer settings -&gt; Personal access tokens**.

Click “Generate new token” and put in a descriptive name for the token in the Note field. For example “Octopus Deploy config-as-code Access”. The token will need to be assigned the repo permissions and the admin:repo\_hook read and write permissions. Once you generate the token, complete the next steps before you leave this page as it won’t be displayed again.

Go back to Octopus Deploy and open your deployment project. Navigate to **Settings -&gt; Version Control**.

Paste in your repository URL, and enter your GitHub username and personal access token in the Authentication section. If your primary branch has a different name, for example “trunk” rather than “main”, adjust the Default Branch Name.

Use the TEST button to check your settings and the CONFIGURE… button to save the changes. You’ll be prompted to enter a commit message to be used to send the configuration to your repository. If your test is not successful, check the permissions you assigned to your personal access token.

If you navigate to your GitHub repository, you’ll see the new commit, along with a new “.octopus” folder. You can edit the text files in this folder using your normal developer workflow. The changes will be reflected in the Octopus Deploy dashboard. You can also continue to make edits in the dashboard and commit them back to version control. You can also use branches and pull requests to manage your changes. The Git repository becomes the single source of truth for the deployment process.

### Testing branches

Once you have connected Octopus Deploy to a Git repository using config-as-code, you will see some changes when you are editing your deployment process.

The SAVE button changes to a COMMIT button, with a message icon on the right-hand side that allows you to write a descriptive commit message. You should always use this option for non-trivial projects as it will help you understand the history of changes to your deployment process.

The other key change is the branch selection box. This allows you to switch to a branch, make changes, and even test the deployment process in the branch before you create a pull request to bring the changes into your main line. At the current time, you create the branches outside of Octopus Deploy. Adding branches from the Octopus Deploy dashboard might be a future feature.

### Summary

Setting up config-as-code is just a matter of switching on the feature preview, and entering your repository information.

Once enabled, you can work trunk-based, or within branches. You can make edits using your preferred text-editor or within the Octopus Deploy dashboard. All the benefits of your team’s current development practices can be applied to the changes you make to the deployment process.

Keep an eye on the [Octopus Blog](https://octopus.com/blog) for general availability, but why not try it out on a non-production app now?

### Further reading and watching

The full webinar is available on YouTube.

[![A new dot-octopus folder in the GitHub repository](https://www.stevefenton.co.uk/wp-content/uploads/2021/10/initial-octopus-deploy-commit.png)](https://www.stevefenton.co.uk/2021/10/how-to-enable-config-as-code-in-octopus-deploy/initial-octopus-deploy-commit/)

You can read about [configuration-as-code in the Octopus Deploy docs](https://octopus.com/docs/projects/version-control) and watch the webinar below, which also has a rich Q&amp;A section at the end.

There are also some [recommended config-as-code strategies](https://octopus.com/blog/config-as-code-strategies).

<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="315" loading="lazy" src="https://www.youtube.com/embed/oZfxlbpSP14" title="YouTube video player" width="560"></iframe>
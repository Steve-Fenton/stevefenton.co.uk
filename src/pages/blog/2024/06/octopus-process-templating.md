---
title: 'Templating deployment processes in Octopus Deploy'
navMenu: false
pubDate: 2024-06-19
keywords: deployment, automation, octopus deploy
description: Find out how to make your deployment process templatable in Octopus Deploy.
bannerImage:
    src: /img/topic/octopus/exploring-octopus-banner.png
    alt: A banner featuring the book Exploring Octopus Deploy (second edition)
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Octopus Deploy
    - Platform Engineering
---

Whether or not you formally adopt the approach, Platform Engineering encourages us to get re-use from our toolchains - just like we do within our code. Some time ago I applied this thinking to a suite of [JMeter tests](/blog/2012/06/modularising-jmeter-tests/), using controllers to make modules more re-usable and reducing the amount of work involved in changing the test suite. Today, I'm going to apply the same thought process to [Octopus Deploy](https://octopus.com).

::::div{.note}

:::div{.simple-grid}

:img{src="/img/topic/books/exploring-octopus-deploy.jpg" alt="Exploring Octopus Deploy"}

Want to find out more about Octopus Deploy? I've published a book called [Exploring Octopus Deploy](https://octopus.com/publications/exploring-octopus-deploy), which you can download for free or buy in paperback format from Amazon.

:::

::::

## Easier reuse, easier maintenance

When writing application code, we organize things into reusable functions. The function can behave differently based on its parameters, so we call the function with arguments and it can do things like `writeFile` for any file - we just supply the file path and file contents and we can write any file in any disk location. The code inside the `writeFile` function exists one time, so if we need to improve it, change it to support a new file system, or fix a bug - we do that one time. If we duplicated that code everywhere we wrote a file, the task of updating all those places would be nothing short of daunting.

This is exactly the idea we need to transfer into tool-land. The same benefits are available whether it's a continuous integration tool, test automation, or deployment automation.

## Configuration as code

Octopus Deploy has a configuration as code feature that lets you store your deployment process in version control. Normally, you'd put the deployment process alongside the application code, so you can evolve them together. The process is stored in `.ocl` files and by default these are in the `.octopus` folder.

The `.ocl` format lets the process be expressed in a text file (hello GitOps fans). You can manage the process directly in those text files, or you can edit it through the Octopus UI. That means you don't have to be a programmer to contribute to the deployment pipeline.

We're going to use configuration as code to super-charge re-usability, though you can apply the same *thinking* to projects that don't use configuration as code. The underlying principle at work here can be applied to all good tools in your toolchain.

## Reusability trip hazards

Here's a miniature example of a deployment process that uploads files to an AWS S3 static website. I've removed lines of code that detract from the example.

File: `.octopus/deployment_process.ocl`

```ruby
step "upload-microsite-to-aws-s3" {
    name = "Upload Microsite to AWS S3"

    action {
        action_type = "Octopus.AwsUploadS3"
        is_required = true
        properties = {
            Octopus.Action.Aws.S3.BucketName = "#{AWS.BucketName.MyProject}"
            Octopus.Action.Package.PackageId = "MyProjectMicrosite"
        }
        worker_pool = "hosted-ubuntu"

        packages {
            acquisition_location = "Server"
            feed = "octopus-server-built-in"
            package_id = "MyProjectMicrosite"
            properties = {
                SelectionMode = "immediate"
            }
        }
    }
}
```

There are two things stopping this process from being immediately re-usable in other static site projects:

1. The variable name from the S3 bucket name is project specific: `#{AWS.BucketName.MyProject}`
2. The package id is hard coded: `MyProjectMicrosite`

By solving these two trip-hazards, this deployment process could be used by any static website hosted on AWS S3. We just need to make this more like our idea of how a function works.

Let's fix it.

## Remove hard-coded values

In Octopus, you can bind practically anything to a variable. That's what we need to do with our package id. Instead of the hard coded `MyProjectMicrosite` we can use Octostache to introduce a variable. The same variable can be used in the process step and in the package list.

File: `.octopus/deployment_process.ocl`

```ruby
step "upload-microsite-to-aws-s3" {
    name = "Upload Microsite to AWS S3"

    action {
        action_type = "Octopus.AwsUploadS3"
        is_required = true
        properties = {
            Octopus.Action.Aws.S3.BucketName = "#{AWS.BucketName.MyProject}"
            Octopus.Action.Package.PackageId = "#{PackageId}"
        }
        worker_pool = "hosted-ubuntu"

        packages {
            acquisition_location = "Server"
            feed = "octopus-server-built-in"
            package_id = "#{PackageId}"
            properties = {
                SelectionMode = "immediate"
            }
        }
    }
}
```

We need to add a variable that will fill this value in, so in `variables.ocl` we add the following:

File: `.octopus/variables.ocl`

```ruby
variable "PackageId" {
    value "MyProjectMicrosite" {}
}

```

Hopefully you can see what just happened... `deployment_process.ocl` is now like a function, and `variables.ocl` contains the project-specific arguments we want to pass to it. The idea is we want to be able to copy `deployment_process.ocl` to a whole list of static site projects when we update it, but leave `variables.ocl` to handle the project-specific differences.

There's just one more trip-hazard to remove before we're done.

## Consistent variable naming

There's a variable in my project called `AWS.BucketName.MyProject`. This is fine for this one project, but it would need a different name for the next project. We don't want to end up with `AWS.BucketName.MyProject` and `AWS.BucketName.MyOtherProject` and so on. We need to be more consistent with our variable names, so every project uses the same name for the same thing.

In this case, we can resolve the problem by renaming the variable to `AWS.BucketName`.

If we stored the variable in the shared library, it's also time to make it a project variable instead - as we want to vary it per-project (which is often why we came up with the more specific name).

File: `.octopus/deployment_process.ocl`

```ruby
step "upload-microsite-to-aws-s3" {
    name = "Upload Microsite to AWS S3"

    action {
        action_type = "Octopus.AwsUploadS3"
        is_required = true
        properties = {
            Octopus.Action.Aws.S3.BucketName = "#{AWS.BucketName}"
            Octopus.Action.Package.PackageId = "#{PackageId}"
        }
        worker_pool = "hosted-ubuntu"

        packages {
            acquisition_location = "Server"
            feed = "octopus-server-built-in"
            package_id = "#{PackageId}"
            properties = {
                SelectionMode = "immediate"
            }
        }
    }
}
```

Let's add the variable to the `variables.ocl` file, with specific values for the *test* environment and *live* environment.

File: `.octopus/variables.ocl`

```ruby
variable "AWS.BucketName" {
    value "my-project-live-bucket" {
        environment = ["live"]
    }

    value "my-project-test-bucket" {
        environment = ["test"]
    }
}

variable "PackageId" {
    value "MyProjectMicrosite" {}
}
```

## Future changes

The `deployment_process.ocl` file is now generalised and totally re-usable. I can now decide how I automate updates to this file, so when I change a central template all the projects get the new version.

To make future updates smooth, I just need to think how I handle variables being added.

For example, if I add CloudFront into the mix and want to clear the cache as part of the deployment process, I'm going to add a new variable for `AWS.CloudFrontDistribution`. This will be missing from each project, so I need to make sure I have a sensible default, can skip the step if it's not provided, or provide a useful error message to prompt the project maintainer to add the missing value.

## Platform Engineering is thinking, not portals

Platform Engineering should be more focussed on this line of thinking, and less focussed on internal developer portals. Good tools give us ways to apply all the good stuff we apply to code. We just need to pause for a second and think about how we might achieve that.

The example in this post comes from a real set-up I'm using that manages four microsites. We've just completed the process of generalizing the deployment process so all four sites can share the same process. When we added a step to stream deployment notifications to Slack, we only had to do it once because of this. Otherwise, we'd have been doing the toil dance, repeating the configuration multiple times. Twice is too much, four times is eight times worse (the pain of toil is exponential!)

With our changes, we get sub-linear task increases as we add sites, which means we can scale. We just need to add the new variables when we set up a site.
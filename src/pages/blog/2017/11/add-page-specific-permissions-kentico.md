---
layout: src/layouts/Default.astro
navMenu: false
title: 'Add page-specific permissions in Kentico'
pubDate: 2017-11-29T08:50:01+00:00
author:
    - steve-fenton
categories:
    - CMS
tags:
    - kentico
---

There are times when you want to limit a user’s access to a single page, or a specific sub-tree of pages within a Kentico website. This article quickly describes how to set up page specific permissions in Kentico using roles, and page level security.

### Page-only role

Head to the “Roles” application.

Add a new role called “Page-Only Editor”, and click “Save”.

![Page-Only Editor Role](/img/2017/11/page-only-editor-role.png)

Under the “Permissions” tab in your new role, select the permissions group “Module” -&gt; “Content” (don’t look for “Pages”, you want “Content”!).

Select “Allow” for “Browse Tree”.

![Page-Only Editor Role Permissions](/img/2017/11/page-only-editor-role-permissions.png)

### Page-only user

Add a new user with the “Editor” permission level.

Under the “Roles” tab, select the “Page-Only Editor” role.

![User Role](/img/2017/11/user-role.png)

At this stage, the user can log-in and see the “Pages” application and view the tree-view of all pages. They won’t be able to open any of the pages for editing, or see any of the page metadata.

### Assign page-specific permissions

Go to the “Pages” application.

Find the page you want the new user to be able to access, and select “Properties” -&gt; “Security”.

Select the “Add Users” option and find the user account you want to assign.

Give the user “Read”, “Modify”, and “Browse Tree” permissions.

![Page Level Permissions](/img/2017/11/page-level-permissions.png)

### Summary

Your user can now log in and navigate to, view, and modify just the selected page, thanks to the custom role and the page specific permissions in Kentico.
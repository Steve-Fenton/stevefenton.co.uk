---
title: Running Astro in a preview container
avMenu: false
pubDate: 2026-02-19
keywords: astro,containers
description: "Learn how to preview Astro sites in a container with live updates."
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Continuous Delivery
---

If you've ever worked on a collection of different Node apps, you've likely encountered version conflicts. Everyone wants a different version of Node or PNPM, and your new job is trying to align them all, or managing versions daily.

That's when open-source hero [Kostis Kapelonis](https://www.linkedin.com/in/kostiskapelonis/) said, "Why don't we run the preview in a container?" In fact, he didn't just say this; he also submitted a PR. I told you he's an open-source hero.

The PR added a `Dockerfile` and a `docker-compose.yaml` file to the project, which let you spin up the preview site using:

```bash
docker compose up
```

Once Kostis had done all the hard work, I added a small enhancement to make Astro's live preview work when you change files. That meant you could start the container and keep working while all your changes are instantly visible in the preview. That keeps the developer inner loop nice and tight.

If you want to do the same, here's how to make it happen. Once again, I added a very small cherry to Kostis' wonderfully fluffy cake, so send your adoration his way.

## Add a Docker compose file

Here's the `docker-compose.yml` file for your Astro project. It goes in the root directory.

```yaml
services:
  astro:
    build: .
    ports:
 - "3000:3000"
    volumes:
 - .:/app
 - /app/node_modules
    environment:
 - NODE_ENV=development
 - HOST=0.0.0.0
    stdin_open: true
    tty: true
```

This maps the volumes, with a special case for node_modules. It exposes Astro's port 3000 inside the container to port 3000 on your machine so you can open it in your browser.

## The Docker file

Here's the `Dockerfile`, which also goes in your project's root directory.

```dockerfile
# Use Node 20 as the base image
FROM node:20-slim

# Install pnpm globally
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Expose the default Astro port
EXPOSE 3000

# Start the dev server
CMD ["pnpm", "compose:dev"]
```

There's an optimization here around the package files, which is why they get their own copy command. There's an extra command in the `package.json` file that we call here, too. It's a variation of the `dev` script we use, but switches out the Astro run with a slight variation (the addition of the `--host` flag) lets just show the important bits in this code snippet:

```json
"scripts": {     
    "compose:dev": "npm-run-all --parallel dev:img dev:dictionary compose:dev:astro dev:watch",
    "compose:dev:astro": "astro dev --host",
```

## The Vite config change

The final change is the one that makes the live refresh to work. This goes in your `astro.config.mjs` file, and I popped it right after the existing `server` config.

```json
server: {
    port: 3000
}
vite: {
    server: {
        watch: {
            usePolling: true,
        },
    },
},
```

## Spinning it up

The first time I ran this, I started things up with:

```bash
docker compose up --build
```
You can then stop the container with

```bash
docker compose down
```

If you haven't changed the container, you can start it with the faster:

```bash
docker compose up
```

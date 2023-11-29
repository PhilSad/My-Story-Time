# My-Story-Time

## Description

This is an illustrated story generator app allowing users to create stories based on a prompt and the pictures of themself.

You can try it out [here](https://mystorytime-e88bd.web.app/).

This app use Next.js, Firebase, ChatGPT, and Stable Diffusion XL with IP Adapter.

## How it works

1. User uploads a picture of themself.
2. User enters a prompt for the story.
3. ChatGPT generates a story based on the prompt.
4. ChatGPT split chapters and generate Stable Diffusion prompts for each splits
5. Stable Diffusion XL with IP Adapter with low weight generates an avatar based on the picture of the user
6. Stable Diffusion XL with IP Adapter with high weight generates illustrations for each prompts based on the genrated avatar --> **this allow the generated pictures to have consistent style and head across the story**


## Directory Structure

* Web App: `./web-app`
* Story and Prompts generation: `./back/functions/`
* Image Generation: `./back/runpod/`
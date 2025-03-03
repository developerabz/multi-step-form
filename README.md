# Frontend Mentor - Multi-step form solution

See live: https://atom-low-ostrich.glitch.me/

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Demo video](#demo-video)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**




## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Demo video

https://github.com/user-attachments/assets/08e47393-6f18-4308-a5a8-d65927b54b8b

### Links

- Solution URL: https://github.com/developerabz/multi-step-form
- Live Site URL: https://atom-low-ostrich.glitch.me/

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript
- Playwright
- Docker 

### Docker build (Linux)

To build (for testing webkit) docker use the following:
```bash docker build -t playwright-tests .
```
To run:
```bash docker run --rm -v $(pwd):/app -w /app playwright-tests
```
### produrl and localurl bash scripts 

There are two shell scripts in the folder; produrl.sh and localurl.sh. 
These are primarily for being able to switch between testing the development and production versions of the site.

## Author

- Frontend Mentor - [@developerabz](https://www.frontendmentor.io/profile/developerabz)


# TypeScript Basic - Practice TypeScript

## Overview:

- This document provides requirements and estimation for TypeScript practice.

## Author

- This is the author [Hoa.Nguyen](https://gitlab.asoft-python.com/hoa.nguyen)

### Time line:

- Time line: 5 days (Dev 6, 2023 - Dev 12, 2023)

### Design:

- [Figma](<https://www.figma.com/file/LjWaG6ZiQnSajtQ18EoCZ3/Crud-Operations-(Community)?type=design&node-id=0-1&mode=design&t=S6ArtZu7LgN33w4B-0>)

### Editor

- Visual Studio Code

## Target

- Understand and apply knowledge of HTML5, CSS3
- Apply basic knowledge of TypeScript
- Apply knowledge of TypeScript basic to CRUD students
- Apply validation
- Understand how asynchronous code works and apply it in practice
- Apply pagespeed and get a score greater than 98
- Responsive browser support: Chrome(Version: 120.0.6099.110), Firefox(Version: 120.0.1).
- Devices support: Mobile, Tablet vs Desktop

## Requirements

- Login page:
  - User can log in
  - Users may see an error message when they make an error
  - Users can switch to the student list page when they enter the correct login account
  - Loader appears when turning pages
- Students list page:
  - Users can view the student list
  - Additional functions
    - Users can add new students
    - User can update students
    - User can delete students
    - The loader appears when users add, edit, and delete students
    - Users can search for students by name
- Returns to the login page when the user clicks on the logout button

## Technical

- [HTML5/CSS3](https://www.w3schools.com/html/default.asp): HTML (Hypertext Markup Language): is a markup language designed to create web pages, that is, stub information presented on the World Wide Web. CSS (Cascading Style Sheets): defines the appearance of an HTML document. CSS is especially useful in Web design. It helps designers easily apply designed styles to any page of the website quickly and synchronously.
- [TypeScript](https://www.typescriptlang.org/) (Version: 5.3.2): TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Parcel](https://parceljs.org/) (Version: 2.10.3): ParcelJS is a web application package, it is a compiler for all your code, regardless of language.
- [Vercel](https://vercel.com/) (Version: 32.6.1): Vercel is a cloud platform for static websites and serverless functions. It allows developers to build and deploy web projects with ease.
- [MockAPI](https://mockapi.io): A mock API server imitates a real API server by providing realistic responses to requests.
- [Husky](https://www.npmjs.com/package/husky) (Version: 8.0.3): Husky improves your commits and more
- [Eslint](https://eslint.org/) (Version: 8.55.0): ESLint statically analyzes your code to quickly find problems.
- [Prettier](https://prettier.io/) (Version: 1.19.1): Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
- [Commitlint](https://commitlint.js.org/#/) (Version: 18.2.0): Helps your team adhere to a commit convention. By supporting npm-installed configurations it makes sharing of commit conventions easy.

## Prerequisites

- [npm](https://www.npmjs.com/) (Version: 10.1.0)
- [node](https://nodejs.org/en) (Version: 20.9.0)

## Login account

- Account: hoa.nguyen@asnet.com.vn
- Password: @Hoa0919591905

# Folder structure

```
├── .husky
├── src
    ├── assets
        ├── images
    ├── pages
        ├── index.html
        ├── students-list.html
    ├── scripts
        ├── constants
        ├── enums
        ├── helpers
        ├── interfaces
        ├── pages
        ├── services
        ├── templates
        ├── validates
        ├── views
    ├── styles
        ├── abstracts
        ├── bases
        ├── components
        ├── pages
        ├── style.css
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── commitlint.config.js
├── package-lock.json
├── package.json
├── README.md
└──tsconfig.json
```

## Getting started

- Clone repository

```
git clone git@gitlab.asoft-python.com:hoa.nguyen/practice-js.git
```

- Change directory to practice-typescript folder

```
cd practice-javascript
```

- Checkout branch

```
git checkout feature/practice-typescript
```

- Install NPM

```
npm install
```

- Run application

```
npm start
```

- Open browser with the link below

```
http://localhost:1234/
```

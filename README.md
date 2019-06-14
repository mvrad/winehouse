<p align="center">
  <a href="https://travelstar.herokuapp.com">
    <img alt="Gatsby" src="public\images\wino.svg" width="204" />
  </a>
</p>
<div align="center">
  <h1>Wino</h1>
  <h3>Track your wine collection, see its values, and keep notes on taste and food pairing suggestions.</h3>
</div>
<p align="center">
  <a href="https://github.com/matthew-conrad/wino/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="TravelStar is released under the MIT license.">
  </a>
  <a href="https://circleci.com/gh/matthew-conrad/wino">
    <img src="https://circleci.com/gh/matthew-conrad/wino.svg?style=shield" alt="Current CircleCI build status.">
  </a>
  <a href="https://securityheaders.io/?q=https://winoapp.herokuapp.com&hide=on&followRedirects=on">
    <img src="https://securityheadersiobadges.azurewebsites.net/create/badge?domain=https://winoapp.herokuapp.com" alt="Security Header Grade">
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=mc0nrad">
    <img src="https://img.shields.io/twitter/follow/travelstar.svg?label=Follow%20@mc0nrad" alt="Follow @mc0nrad">
  </a>
</p>

## About Wino

A wine cellar management app that lets you track your collection and see its values as well as keep tasting notes and food pairing suggestions.

## Under the Hood

This web app was made using Visual Studio Code in a Linux environment.

## To Set Up Locally

You can take all the files of this site and run them on your computer as if it were live online, only it's just on your machine. This project uses the [Snooth](http://www.snooth.com) API to retrieve data about wines based on user searches.

### Requirements

* [Git](http://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

To copy the repository's files from here onto your computer and to view and serve those files locally, at your computer's command line type:
```
git clone https://github.com/matthew-conrad/wino.git
```
Open the files in a text editor such as [Visual Studio Code](https://code.visualstudio.com/) and in the terminal type:
```bash
npm install
```
to install all of the required dependencies. Install nodemon and run it in the terminal:
```bash
nodemon
```
Now you should be able to visit localhost:3000 in your browser.
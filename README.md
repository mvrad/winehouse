<p align="center">
  <a href="https://winoapp.herokuapp.com">
    <img alt="Logo" src="public\images\wino-red.svg" width="180px" />
  </a>
</p>
<div align="center">
  <h1>Wine House</h1>
  <h3>Track your wine collection, see its values, and keep notes on taste and food pairing suggestions.</h3>
</div>
<p align="center">
  <a href="https://github.com/mvrad/wine-house/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="TravelStar is released under the MIT license.">
  </a>
  <a href="https://circleci.com/gh/mvrad/wine-house">
    <img src="https://circleci.com/gh/mvrad/wine-house.svg?style=shield" alt="Current CircleCI build status.">
  </a>
  <a href="https://securityheaders.io/?q=https://winoapp.herokuapp.com&hide=on&followRedirects=on">
    <img src="https://securityheadersiobadges.azurewebsites.net/create/badge?domain=https://winoapp.herokuapp.com" alt="Security Header Grade">
  </a>
</p>

## About Wine House

Wine House is a wine cellar management app that lets you track your collection and see its values as well as keep tasting notes and food pairing suggestions.

## Under the Hood

This web app was made with the Node.js framework Express and MongoDB.

## To Set Up Locally

You can take all the files of this site and run them on your computer as if it were live online, only it's just on your machine. This project uses the [Snooth](http://www.snooth.com) API to retrieve data about different wines based on user searches.

### Requirements

* [Git](http://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

To copy the repository's files from here onto your computer and to view and serve those files locally, at your computer's command line type:
```
git clone https://github.com/mvrad/wine-house.git
```
Open the files in a text editor such as [Visual Studio Code](https://code.visualstudio.com/) and in the terminal type:
```bash
npm install
```
to install all of the required dependencies.
Run MongoDB:
```bash
mongod
```
Then install nodemon and run this command:
```bash
nodemon ./app localhost 27017
```
You should now be able to visit localhost:3000 in your browser.
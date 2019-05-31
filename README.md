## BigPay Exercise

## Objectives
1. Write code in the language of your choice (probably node.js?) to run a webserver which listens on a websocket connection and emits one message per second containing the current date and time (as text)
  - Write code in Javascript (or Typescript) to connect to this server and print out the messages it produces, one at a time
  - Now have them animate in from the left hand side of the page
  - Modify your code to try to measure the latency between the user’s webpage and the server (without maxing out the user’s connection).
2. Write some code to access the GitHub API and present a webpage that takes a repository name. The page should then display the most recent contributors to that repository, sortable by date or by number of contributions. Colour them as a heat map of recent contributions (most recent contribution is hottest), and have a pop-up which can display the public repositories owned by those users.

## Running the exercise

### Dependencies
- [yarn](https://yarnpkg.com) or `npm`, in which case replace the commands below from `yarn` to `npm run`

### Steps to follow
- Unzip the package
- Change directory to the unziped folder
- Run `$ yarn install` to install dependencies
- Run `$ yarn start` to start the websocket server and the frontend client
- Access the page at the displayed address or `http://localhost:1234`

## Shortcomings
- Was unable to figure out how to group contributors by recent contributions from the Github API

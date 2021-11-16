# Would You Rather

This is a project focus on learning and practicing redux on a react application.
The project calls Would-You-Rather-**js** because there is just js files. In the future this project will have a ts version with Redux Toolkit.

## RoadMap

-   [x] redux - ducks: https://github.com/pvdo/would-you-rather/tree/master/would-you-rather-js/src/state/ducks
-   [x] Components: https://github.com/pvdo/would-you-rather/tree/master/would-you-rather-js/src/views
-   [x] styled-components
-   [ ] Mongo DB
-   [ ] API
-   [x] Upload to website

### Directory Structure

```
would-you-rather-js
│   README.md
│
└───public
│   │   index.html
│   │   logo.png
│   │   manifest.json
│   │   robots.txt
│
└───src
│   │
│   └───images
│   │   │
│   │   │   logo.png
│   │
│   └───state
│   │   │
│   │   └───ducks
│   │   │   │
│   │   │   │   authedUser.js
│   │   │   │   questions.js
│   │   │   │   shared.js
│   │   │   │   users.js
│   │   └───middleware
│   │   │   │
│   │   │   │   index.js
│   │   │   │   logger.js
│   │   │
│   │   │   storeReducer.js
│   │
│   └───utils
│   │   │   _DATA.js
│   │   │   api.js
│   │
│   └───views
│   │   │
│   │   └───Components
│   │   │   │
│   │   │   │   Button.js
│   │   │   │   Input.js
│   │   │   │   Menu.js
│   │   │   │   QuestionTab.js
│   │   │
│   │   └───Containers
│   │   │   │   (Un)AnsweredQuestion.js
│   │   │   │   404.js
│   │   │   │   CreateQuestion.js
│   │   │   │   LeaderBoard.js
│   │   │   │   LogIn.js
│   │   │   │   WouldYouRather.js
│   │   │   App.js
│   │   index.css
│   │   index.js
│   │   reportWebVitals.js

```

### `npm install`

Install all necessary dependencies to run the application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

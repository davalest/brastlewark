# Brastlewark

This is a citizen browser for our heroes

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## Dependencies

    "@material-ui/core": "^4.2.0",
    "@material-ui/icons": "^4.2.1",
    "downshift": "^3.2.10",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "3.0.1",
    "bootstrap": "4.3.0",
   
    
## Description

 Browser that can be used to find information about all citizens of Brastlewark. It has the possibility of being used in Spanish or English.
 
## Extra info

#### Layout

 The whole app is based on the Bootstrap layout and the components are based on Material-UI rules.
  
####Cookies 

This app store a language cookie so it does not have to run a function to know the language. First look for the language in the cookie, if you do not find it, look for the language of the browser and if you do not find this language look for it in the language of the system
 
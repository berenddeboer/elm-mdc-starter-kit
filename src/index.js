"use strict";

import "./app.scss"
import "../elm-mdc/src/elm-mdc.js"

// disable loading index.html here, else html-webpack-plugin does not appear to work
//require('./index.html')
const {Elm} = require('./Main.elm')


// Initialise Elm
const flags = null
Elm.Main.init({node: document.getElementById("main"), flags: flags})

"use strict"

import "./app.scss"
import "../elm-mdc/src/elm-mdc.js"

require('./index.html')
const {Elm} = require('./Main.elm')


// Initialise Elm
const flags = null
Elm.Main.init({node: document.getElementById("main"), flags: flags})

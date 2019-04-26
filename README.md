# About

[![Build Status](https://api.travis-ci.org/berenddeboer/elm-mdc-starter-kit.svg?branch=master)](https://travis-ci.org/berenddeboer/elm-mdc-starter-kit/)

Best practice example of using
[elm-mdc](https://github.com/aforemny/elm-mdc), the Elm implementation
of [Google's Material Design for the web](https://github.com/material-components/material-components-web/), using hot code swapping.


# Install

After cloning the repository:

1. Add the latest [elm-mdc](https://github.com/aforemny/elm-mdc):

```
git submodule init
git submodule update
```

2. Install all required packages (includes a local copy of the elm compiler):

```
npm install
```


# Hot code swapping

Test hot loading:

1. Run: `npm run hot`

2. Point browser at: `http://localhost:3009/`

3. Change the button text in `src/Main.elm` and save. Browser should automatically update.

Whenever you change a `.scss` or `.elm` file, your browser will be
reloaded, but keep its state.


# Production

Create production ready files in the `dist` directory:

```
npm run build
```


# Under the hood

The hot reloading works thanks to the [elm-hot-webpack-loader](https://github.com/klazuka/elm-hot-webpack-loader).

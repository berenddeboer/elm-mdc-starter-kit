# About

Best practice example of using
[elm-mdc](https://github.com/aforemny/elm-mdc) using hot code swapping.


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

Both scss and .elm updates support hot reloading.


# Production

Create production ready files in the `dist` directory:

```
npm run build
```

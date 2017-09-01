# Game lost

Game for Js13kGames, a JavaScript coding competition for HTML5 Game Developers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Installing

Install all node modules using npm.

```
npm install
```

### Running the project

Run the project for testing with hot compiling and reloading, uncompressed.

```
nmp run dev
```

This will start a webserver at `localhost:8080`.
Every time you change and save a file it will compile and load the new bundle file.

For hot testing with a compressed test version of the bundle file run:

```
npm run dev-compress
```

### Compile javascript

If you just want to create a compressed bundle of the javascript run

```
npm run prod
```

of

```
webpack
```

### Build

When you are ready make a build run

```
npm run build
```

This compiles and compresses the javascript,
then it zips the project with the current version name.
Lastly it validates that the file size is within the limit of 13Kb

### Notes

Keep everything clean and class based.
Use ES6.

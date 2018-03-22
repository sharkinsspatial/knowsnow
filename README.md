# knowsnow
Gatineau Park XC Trail Condition Reporting

Development requirements assume Node, NPM and Grunt installed on your system.  To install the Grunt cli
````shell
$ npm install -g grunt-cli
````
To install the project's dependencies and development dependencies change to the project's root directory and run
````shell
$ npm install
````
You can then run
````shell
$ grunt watch
````
And any changes you make in the src files will be compiled on the fly into the /dist/main.js file that the application uses.
Newer versions of OSX may have file handle limitations which prevent the browserify task from running correctly see [this](https://github.com/substack/node-browserify/issues/431) for more information and a solution.

The application requires an instance of the [knowsnowapi](https://github.com/sharkinsspatial/knowsnowapi) running in the background for local testing.  These are referenced in the <code>dev</code> section of the <code>replace</code> task in the <code>Gruntfile.js</code>.

The application requires a file named `Tokens.js` in the root directory which exports the Mapbox token.

To build the application for local testing run
````shell
$ grunt dev
````
To serve the application locally I use [serve](https://github.com/tj/serve). You can install it globally using
````shell
$ npm install -g serve
````
And run
````shell
$ serve
````
To run the application locally on port 3000.

To deploy to production on Amazon s3 you will need to create a .json file with your Amazon key and replace the reference in <code>aws</code> property of the <code>Gruntfile.js</code> (Do not commit this to the repository).

You can then run
````shell
$ grunt dist
````
Which will create a production build of the application and push it to s3 for hosting.

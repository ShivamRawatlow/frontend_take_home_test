# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Unit test cases are written only for the service

## Description
I'm using  'https://api.github.com/users/' url to get the user details. It returns a single user on every search. With the help of service I'm saving the data into localstorage to persist it even after app is shut down.

##
Things that can be added to improve performance for a larger scale application : 

* Standalone Components along with lazy loading can be implemented
* The new angular features like esbuild dev server can be used to improve development time
* The new angular signal variables can be used to provide better control on change detection




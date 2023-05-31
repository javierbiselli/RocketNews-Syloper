# Angular Template

This template was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8

---

## Development server

Run `yarn start` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Development server options

to serve normal use this configuration:

```
  yarn start || npm run start
```

to serve and automatically open the browser use this configuration:

```
  yarn start:open || npm run start:open
```

to serve and access from a local network use this configuration:

```
  yarn start:host || npm run start:host
```

to serve as `production` run use this configuration:

```
  yarn start:prod || npm run start:prod
```

<!-- ## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. -->

---

## Build

Run `yarn build:option` or `npm run build:option` to build the project. The build artifacts will be stored in the `dist/` directory.

### Build options

to compile for `development` use this configuration:

```
  yarn build:dev || npm run build:dev
```

to compile for `production` use this configuration:

```
  yarn build:prod || npm run build:prod
```

to compile for `webpack-bundle-analyzer` use this configuration:

```
  yarn build:stats || npm run build:stats
```

---

## Linter

Run `yarn lint` or `npm run lint` to show in the terminal the error that linter finds according to the configuration

### Linter options

to show error use this configuration:

```
  yarn lint || npm run lint
```

to show error and automatically fix it use this configuration:

```
  yarn lint:fix || npm run lint:fix
```

to run linter default inside angular use this configuration:

```
  yarn lint:ng || npm run lint:ng
```

to show error and automatically fix it use ng configuration:

```
  yarn lint:ng:fix || npm run lint:ng:fix
```

---

## Husky

At the end of the installation of all the packages, husky will be installed, a tool that will allow us to automatically run `git hooks`, in our case to run the `commitlint` and `eslint` linters before committing.

---

## Tools

### Webpack Bundle Analyzer

`Webpack-bundle-analyzer` is a tool that allows us to graphically see when our application weighs and segmented by modules, this helps us to discover failures in the application's performance

to use `webpack-bundle-analyzer`, before you must use this command `yarn build:stats` or `npm run build:stats` which generates the stats files that allow webpack-bundle-analyzer to work properly

```
  yarn analyze || npm run analyze
```

<!-- ## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). -->

<!-- ## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities. -->

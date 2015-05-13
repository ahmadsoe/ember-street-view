# Ember-street-view

Google street view component for emberjs.

## Install

```
ember install ember-street-view
```

This addon will inject google maps API in `<script>` tag by default.
If you don't want this feature, add this to your `config/environment.js`

```javascript
// config/environment.js

ENV.emberStreetView = {
  includeGoogleScriptTag: false
}
```

## Usage

In your Handlebars templates:
```
{{street-view lat=lat lng=lng}}
```

## Demo

Check out the demo on [github pages](http://ahmadsoe.github.io/ember-street-view/ "Ember-street-view demo"). Or:

* `git clone` this repository
* `npm install`
* `bower install`
* `ember server`
* Visit the demo at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

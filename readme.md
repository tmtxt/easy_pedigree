# simple vietnamese pedigree management webapp

project under construction
please come back later

# gen lib for browserify

$ cd easy_pedigree
$ mkdir -p public/js_app
// $ browserify -r jquery-browserify > ./public/js_app/jquery.js && browserify -r jquery-ui-browserify > ./public/js_app/jquery-ui.js && browserify -r d3-browserify > ./public/js_app/d3.js && browserify -r react > ./public/js_app/react.js && browserify -r underscore > ./public/js_app/underscore.js && browserify -r js-csp > ./public/js_app/js-csp.js
$ browserify -r js-csp > ./public/js_app/js-csp.js
$ gulp browserify
$ gulp uglify-client-lib
$ gulp uglify-client-lib-reg
$ gulp uglify-client
$ gulp watch-client

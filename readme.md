# simple vietnamese pedigree management webapp

project under construction
please come back later

# gen lib for browserify

$ cd easy_pedigree
$ cd client
$ browserify -r jquery-browserify > ../public/js_app/lib/jquery.js
$ browserify -r jquery-ui-browserify > ../public/js_app/lib/jquery-ui.js
$ browserify -r d3-browserify > ../public/js_app/lib/d3.js
$ browserify -r react > ../public/js_app/lib/react.js
$ browserify -r underscore > ../public/js_app/lib/underscore.js
$ cd ..
$ gulp browserify
$ gulp uglify-client-lib
$ gulp uglify-client
$ gulp watch

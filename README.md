# Instructions and Tutorials

##Getting started with Vue on Rails**
- rails webpacker:install:vue
- yarn add <required-packages>
- go to application html to change the stylesheet tags and javascript tags to pack tags (maybe)
- Run ./bin/webpack-dev-server in another terminal tab so that it loads faster.


## Some Javascript hints
Use javascript code inside v-bind (or shortcut ":") :

:href="'#purchase-' + item.id"
and

:id="'purchase-' + item.id"
Or if using ES6+:

:id="`purchase-${item.id}`"

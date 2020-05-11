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


## Using ActionCable
rails g channel Board


## Errors
The problem:
RROR: heartbeat: MISCONF Redis is configured to save RDB snapshots, but it is currently not able to persist on disk. Commands that may modify the data set are disabled, because this instance is configured to report errors during writes if RDB snapshotting fails (stop-writes-on-bgsave-error option). Please check the Redis logs for details about the RDB error.

The solution:
brew services restart redis














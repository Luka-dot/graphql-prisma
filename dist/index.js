'use strict';

require('@babel/polyfill');

var _graphqlYoga = require('graphql-yoga');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _index = require('./resolvers/index');

var _prisma = require('./prisma');

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Spread operators plug in:  https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread

var pubsub = new _graphqlYoga.PubSub();

var server = new _graphqlYoga.GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: _index.resolvers, // split resolvers to different file so fragments can be set up with Prisma
    context: function context(request) {
        // context is set as a function. That allows acess to headers in mutation.js
        return {
            db: _db2.default, // passing DB, pubsub and prisma objects to every single resolver regardles of file structure (ctx argument on every resolver)
            pubsub: pubsub,
            prisma: _prisma2.default,
            request: request
        };
    },

    fragmentReplacements: _index.fragmentReplacements
});
// port is for Heroku port on production
server.start({ port: process.env.PORT || 4000 }, function () {
    console.log('Server is running!!!');
});
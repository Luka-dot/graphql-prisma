import '@babel/polyfill'
import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma'    

// Spread operators plug in:  https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,             // split resolvers to different file so fragments can be set up with Prisma
    context(request) {     // context is set as a function. That allows acess to headers in mutation.js
        return {      
            db,         // passing DB, pubsub and prisma objects to every single resolver regardles of file structure (ctx argument on every resolver)
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
})
// port is for Heroku port on production
server.start({ port: process.env.PORT || 4000 },() => {
    console.log('Server is running!!!')
})


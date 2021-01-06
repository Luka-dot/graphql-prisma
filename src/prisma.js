import { Prisma } from 'prisma-binding'

// configure new prisma endpoint. Takes one arg {}
// file .graphqlconfig created and configured (need npm prisma-binding and graphql-cli)
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/'
})

prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
   // console.log(JSON.stringify(data, undefined, 4))
})

prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
    console.log(JSON.stringify(data, undefined,4))
})


// to generate script generated file ...
// run these 2 commands and you will have schema generated

// npm install -g get-graphql-schema
// get-graphql-schema http://localhost:4466 > src/generated/prisma.graphql
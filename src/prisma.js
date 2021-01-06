import { Prisma } from 'prisma-binding'

// configure new prisma endpoint. Takes one arg {}
// file .graphqlconfig created and configured (need npm prisma-binding and graphql-cli)
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/'
})

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 4))
// })

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//     console.log(JSON.stringify(data, undefined,4))
// })

// prisma.mutation.createPost({
//     data: {
//         title: "2nd post by Node.js",
//         body: "second post body is here!!!!",
//         published: true,
//         author: {
//             connect: {
//                 id: "ckjljb8ad00g208087k1rrf71"
//             }
//         }
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//     return prisma.query.users(null, '{ id name posts { id title } }')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 4))
// })

prisma.mutation.updatePost({
    data: {
        published: true
    },
    where: {
        id:"ckjm0wy0900wo0808xt0yc3uj"
    }
}, '{ id published }').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
    return prisma.query.posts(null, '{ id title body published }')
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})


// to generate script generated file ...
// run these 2 commands and you will have schema generated

// npm install -g get-graphql-schema
// get-graphql-schema http://localhost:4466 > src/generated/prisma.graphql
import { Prisma } from 'prisma-binding'

// configure new prisma endpoint. Takes one arg {}
// file .graphqlconfig created and configured (need npm prisma-binding and graphql-cli)
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/',
    secret: 'supersecrettext'
})

export { prisma as default } 

// // prisma.exists.Comment({
// //     id: "ckjljly0400n30808w13wpuz1"
// // }).then((exists) => {
// //     console.log(exists)
// // })

// const createPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({
//         id: authorId
//     })

//     if (!userExists) {
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { name email posts { id title published } } }')
    
//     return post.author
// }

// // createPostForUser('ckjli8tkb000n08083i7a9mjf', {
// //     title: 'List of things',
// //     body: 'no books yet !',
// //     published: true
// // }).then((user) => {
// //     console.log(JSON.stringify(user, undefined, 2))
// // }).catch((error) => {
// //     console.log(error.message)
// // })

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postId
//     })

//     if (!postExists) {
//         throw new Error('Post not found.')
//     }

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{ author { id name posts { id title published } }}')
//     // const user = await prisma.query.user({
//     //     where: {
//     //         id: post.author.id
//     //     }
//     // }, '{ id email posts { id text body } }')
//     return post.author
// }



//**    Old code   ********/
// updatePostForUser('ckjlj1h0500dp0808zlpxrux9', {
//     title:"List of ANYTHING"
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log("ERROR ", error.message)
// })

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

// prisma.mutation.updatePost({
//     data: {
//         published: true
//     },
//     where: {
//         id:"ckjm0wy0900wo0808xt0yc3uj"
//     }
// }, '{ id published }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//     return prisma.query.posts(null, '{ id title body published }')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })


// to generate script generated file ...
// run these 2 commands and you will have schema generated

// npm install -g get-graphql-schema
// get-graphql-schema http://localhost:4466 > src/generated/prisma.graphql
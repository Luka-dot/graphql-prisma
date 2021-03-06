import getUserId from '../utils/getUserId'

const User = {
    // conditionally returning email as string or null.
    // this is done to prevent relation querry that can see other users emails
    email: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false)
       
            if (userId && userId === parent.id) {
                return parent.email
            } else {
                return null
            }
        }
    },
    posts: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { prisma, request }, info) {
            return prisma.query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            })
        }
    }
}

export { User as default }

// ******** code before switching to PRISMA and using 
// *****  PRISMA relational data features ***********
// This is working since  query.js users()  has info argument passed in.


// const User = {
//     posts(parent, arg, { db, prisma }, infor) {
//         return db.posts.filter((post) => {
//             return post.author === parent.id
//         })
//     },
//     comments(parent, arg, { db }, info) {
//         return db.comments.filter((comment) => {
//             return comment.author === parent.id
//         })
//     }
// }
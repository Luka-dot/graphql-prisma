import getUserId from '../utils/getUserId'

const User = {
    // conditionally returning email as string or null.
    // this is done to prevent relation querry that can see other users emails
    email(parent, args, { request }, info) {
        const userId = getUserId(request, false)
        console.log(userId, parent.id)
console.log('parent ', parent.email)
        if (userId && userId === parent.id) {
            return parent.email
        } else {
            return null
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
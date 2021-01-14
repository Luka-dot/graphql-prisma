const User = {
    
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
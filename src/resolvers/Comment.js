const Comment = {
    
}

export { Comment as default }


// ******** code before switching to PRISMA and using 
// *****  PRISMA relational data features ***********
// This is working since  query.js comments()  has info argument passed in.

// const Comment = {
//     author(parent, arg, { db }, info) {
//         return db.users.find((user) => {
//             return user.id === parent.author
//         })
//     },
//     post(parent, arg, { db }, info) {
//         return db.posts.find((post) => {
//             return post.id === parent.post
//         })
//     }
// }
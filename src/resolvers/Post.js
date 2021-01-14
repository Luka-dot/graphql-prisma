const Post = {
    
}

export { Post  as default }



// ******** code before switching to PRISMA and using 
// *****  PRISMA relational data features ***********
// This is working since  query.js posts()  has info argument passed in.


// const Post = {
//     author(parent, arg, { db }, info) {
//         return db.users.find((user) => {
//             return user.id === parent.author
//         })
//     },
//     comments(parent, arg, { db }, info) {
//         return db.comments.filter((comment) => {
//             return comment.post === parent.id
//         })
//     }
// }
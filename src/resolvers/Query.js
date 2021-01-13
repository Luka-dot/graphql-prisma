const Query = {
    users(parent, args, { db, prisma }, info) {
       return prisma.query.users(null, info)
       
        // if (!args.query) {
        //     return db.users
        // }

        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    posts(parent,args, { db, prisma }, info) {  // destructuring DB of ctx     (parent,args, ctx, info)
        return prisma.query.posts(null, info)
        
        // if (!args.query) {
        //     return db.posts
        // }

        // return db.posts.filter((post) => {
        //     return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    comments(parent, args, { db }, info) {
        if (!args.query) {
        return db.comments
        }

        
    },
    me() {
        return {
            id: '123345678',
            name: 'Mike',
            email: 'mike@gmail.com',
            age: 28
        }
    },

    post() {
        return {
            id: '1233098',
            title: 'First post',
            body: 'This is a post to my new grapQL API',
            published: true
        }
    }
}

export { Query as default }
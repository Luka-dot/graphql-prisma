import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, { db, prisma }, info) {
        // setting operation argument for prisma = object
        const opArg = {}

        if (args.query) {
            opArg.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArg, info)   
    },
    posts(parent,args, { db, prisma }, info) {  // destructuring DB of ctx     (parent,args, ctx, info)

        const opArg = {}

        if (args.query) {
            opArg.where = {
                OR: [{
                title_contains: args.query
                }, {
                body_contains: args.query
                }]
            }
        }

        return prisma.query.posts(opArg, info)
    },
    comments(parent, args, { db, prisma }, info) {
        const opArg = {}

        if (args.query) {
            id: args.query
        }

        return prisma.query.comments(opArg, info)
        
    },
    async me(parent, args, { request, prisma }, info) {
        const userId = getUserId(request)
        const verifiedUser = await prisma.exists.User({
            id: userId
        })

        if (!verifiedUser) {
            throw new Error('User not verified')
        }

        return prisma.query.user({
            where: {
                id: userId
            }
        })
        
    },

    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
    }, info)

    if (posts.length === 0) {
        throw new Error('Post not found')
    }

    return posts[0]
    }
}

export { Query as default }
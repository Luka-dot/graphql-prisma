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
    me() {
        return {
            id: '123345678',
            name: 'Mike',
            email: 'mike@gmail.com',
            age: 28
        }
    },

    post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false)

        return {
            id: '1233098',
            title: 'First post',
            body: 'This is a post to my new grapQL API',
            published: true
        }
    }
}

export { Query as default }
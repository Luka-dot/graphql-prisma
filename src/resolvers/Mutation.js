import { v4 as uuidv4 } from 'uuid';

const Mutation = {
    async createUser(parent,args, { prisma }, info) {
        const emailTaken = await prisma.exists.User({ email: args.data.email})
        if (emailTaken) {
            throw new Error('This email has been already taken.')
        }

        return prisma.mutation.createUser({ data: args.data }, info)  // info ensures that relation data will come back if query for

    },
    async deleteUser(parent, args, { prisma }, info) {
        const userExists = await prisma.exists.User({ id: args.id})

        if (!userExists) {
            throw new Error('User not found!')
        }

        return prisma.mutation.deleteUser({ 
            where: { 
                id: args.id 
                } 
            }, info)  

    },
    async updateUser(parent, args, { prisma }, info) {
        return prisma.mutation.updateUser({
            where:{
                id: args.id
            },
            data: args.data
        }, info)
    },
    async createPost(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.createPost({
            data:{
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author:{
                    connect:{
                        id: args.data.author
                    }
                }
            }
        }, info)
    },
    async deletePost(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.updatePost({
            data: args.data,
            where:{
                id: args.id
            }
        }, info)
    },
    async createComment(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.createComment({
            data:{
                text: {
                    text: args.data.text,
                    author:{
                        connect:{
                            id: args.data.author
                        }
                    },
                    post:{
                        connect:{
                            id: args.data.post
                        }
                    }
                }
            }
        }, info)
    },
    deleteComment(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.deleteComment({
            where:{
                id: args.id
            },
            data: args.data
        }, info)
    },
    updateComment(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.createComment({
            where: {
                id: args.id
            },
            data:{
                data: args.data
            }
        }, info)
    }
}

export { Mutation as default }
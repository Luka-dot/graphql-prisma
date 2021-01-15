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
            data:{
                title: args.data.title,
                body: args.data.body,
                published: args.data.published
            },
            where:{
                id: args.id
            }
        }, info)
    },
    createComment(parent, arg, { db, pubsub }, info) {
        const verifyAuthor = db.users.some((user) => { 
            return user.id === arg.data.author
        }) 

        const verifyPost = db.posts.some((post) => {
            return (post.published === true && post.id) === arg.data.post
        })

        if (!verifyAuthor) {
            throw new Error('Pleace check author id.')
        } else if (!verifyPost) {
            throw new Error('post is not published or does not exist.')
        }

        const comment = {
            id: uuidv4(),
            ...arg.data
        }
        // const comment = {
        //     id: uuidv4(),
        //     text: arg.text,
        //     author: arg.author,
        //     post: arg.post
        // }

        db.comments.push(comment)
        pubsub.publish(`comment ${arg.data.post}`, { 
            comment: {
                mutation: 'COMMENT CREATED',
                data: comment
            }
        })

        return comment
    },
    deleteComment(parent, arg, { db, pubsub }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === arg.id)

        if (!commentIndex === -1) {
            throw new Error('comment not found.')
        }

        const deletedComment = db.comments.splice(commentIndex, 1)

        pubsub.publish(`comment ${deletedComment[0].post}`, {
            comment: {
                mutation: 'COMMENT DELETED',
                data: deletedComment[0]
            }
        })

        return deletedComment[0]
    },
    updateComment(parent, arg, { db, pubsub }, info) {
        const { id, data } = arg
        const commentToUpdate = db.comments.find((comment) => comment.id === id )

        if (!commentToUpdate) {
            throw new Error('comment not found.')
        }

        if (typeof data.text === 'string') {
            commentToUpdate.text = data.text
        }

        pubsub.publish(`comment ${commentToUpdate.post}`, {
            comment: {
                mutation: 'UPDATED COMMENT',
                data: commentToUpdate
            }
        })

        return commentToUpdate
    }
}

export { Mutation as default }
import getUserId from '../utils/getUserId'

const Subscription = {
    comment: {
        subscribe(parent, { postId }, { prisma }, info) {
            return prisma.subscription.comment({
                where:{
                    node:{
                        post:{
                            id: postId
                        }
                    }
                }
            }, info)
        }
    },
    post: {
        subscribe(parent, arg, { prisma }, info) {
            return prisma.subscription.post({
                where:{
                    node:{
                        published: true
                    }
                }
            }, info)

         //   return pubsub.asyncIterator('post')
        }
    },
    myPost: {
        subscribe(parent, args, { prisma, request }, info) {
            const userId = getUserId(request)

            return prisma.subscription.post({
                where: {
                    node: {
                        author: userId
                    }
                }
            }, info)
        }
    }
}

export { Subscription as default }
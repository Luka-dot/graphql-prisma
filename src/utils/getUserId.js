import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    // tenary below is for subscriptions since HTTPS headers are send in connection and not in request.header
    const header = request.request ? request.request.headers.authorization : request.connection.context.authorization

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
        return decoded.userId
    }

    if (requireAuth) {
        throw new Error('Authentication required - getUserId.js')
    } 
    
    return null
}

export { getUserId as default }
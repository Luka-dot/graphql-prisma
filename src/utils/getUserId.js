import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
//    const header = request.request.headers.authorization
    const header = request.request.body.variables.Authorization

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisissecret')
        
        return decoded.userId
    }

    if (requireAuth) {
        throw new Error('Authentication required - getYserId.js')
    } 
    
    return null
}

export { getUserId as default }
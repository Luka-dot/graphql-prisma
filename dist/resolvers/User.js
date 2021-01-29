'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
    // conditionally returning email as string or null.
    // this is done to prevent relation querry that can see other users emails
    email: {
        fragment: 'fragment userId on User { id }',
        resolve: function resolve(parent, args, _ref, info) {
            var request = _ref.request;

            var userId = (0, _getUserId2.default)(request, false);

            if (userId && userId === parent.id) {
                return parent.email;
            } else {
                return null;
            }
        }
    },
    posts: {
        fragment: 'fragment userId on User { id }',
        resolve: function resolve(parent, args, _ref2, info) {
            var prisma = _ref2.prisma,
                request = _ref2.request;

            return prisma.query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            });
        }
    }
};

exports.default = User;

// ******** code before switching to PRISMA and using 
// *****  PRISMA relational data features ***********
// This is working since  query.js users()  has info argument passed in.


// const User = {
//     posts(parent, arg, { db, prisma }, infor) {
//         return db.posts.filter((post) => {
//             return post.author === parent.id
//         })
//     },
//     comments(parent, arg, { db }, info) {
//         return db.comments.filter((comment) => {
//             return comment.author === parent.id
//         })
//     }
// }
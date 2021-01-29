'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fragmentReplacements = exports.resolvers = undefined;

var _prismaBinding = require('prisma-binding');

var _Query = require('./Query');

var _Query2 = _interopRequireDefault(_Query);

var _Mutation = require('./Mutation');

var _Mutation2 = _interopRequireDefault(_Mutation);

var _subscription = require('./subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _Post = require('./Post');

var _Post2 = _interopRequireDefault(_Post);

var _Comment = require('./Comment');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = {
    Query: _Query2.default,
    Mutation: _Mutation2.default,
    Subscription: _subscription2.default,
    User: _User2.default,
    Post: _Post2.default,
    Comment: _Comment2.default
};

var fragmentReplacements = (0, _prismaBinding.extractFragmentReplacements)(resolvers);

exports.resolvers = resolvers;
exports.fragmentReplacements = fragmentReplacements; // exporting fragments so it can be used in prisma.js and src/index.js
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashPassword = function hashPassword(paswordString) {
    if (paswordString.length < 8) {
        throw new Error('Pasword must be at least 8 character long.');
    }

    return _bcryptjs2.default.hash(paswordString, 10);
};

exports.default = hashPassword;
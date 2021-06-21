const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('auth token', () => {
    it('it should return a jwt token', () => {
        const id = {_id : new mongoose.Types.ObjectId().toHexString()};

        const token = jwt.sign( id, 'jwtprivatekey');
        const decoded = jwt.verify(token, 'jwtprivatekey');
        expect(decoded).toMatchObject(id);

    }) 
})
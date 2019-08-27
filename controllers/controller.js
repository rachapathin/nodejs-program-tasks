import loginCredentails from '../data/logincredentials';
import {Product, User} from '../models';
const jwt = require('jsonwebtoken');

export const getProducts = (req, res) => {
    Product.findAll().then((products) => {
        if (!products.length) {
            res.status(400).send('No products available.');
        } else {
            res.json(products);
        }
    }).catch((error) => console.log('Error:', error));
}

export const getSingleProduct = (req, res) => {
    Product.findOne({ where: { id: req.params.id } }).then((item) => {
        if (!item) {
            res.status(400).send('No product available.');
        } else { 
            res.json(item);
        }
    }).catch((error) => console.log('Error:', error));
}

export const getAllReviewsForProduct = (req, res) => {
    Product.findOne({ where: { id: +req.params.id } }).then((item) => {
        if (!item) {
            res.send('No product available.');
        }
        if (!item.reviews) {
            res.send('No reviews found.');
        }
        res.send(JSON.stringify(item.reviews));
    }).catch((error) => console.log('Error:', error));
}

export const addNewProduct = (req, res) => {
    const { name, price, reviews } = req.body;
    Product.create({ name, price, reviews })
        .then((item) => res.json(item))
        .catch((error) => console.log('Error:', error));
}

export const getAllUsers = (req, res) => { 
    User.findAll().then((users) => {
        if (!users.length) {
            res.send('No users found');
        } else {
            res.json(users);
        }
    }).catch((error) => console.log('Error: ', error));
}

export const checkAuthentication = (req, res) => {
    const reqBody = req.body;
    if( reqBody.username === loginCredentails.data.username && reqBody.password === loginCredentails.data.password) {
        jwt.sign({ 'username': reqBody.username }, 'secretkey', (err, token) => {
            res.status("200");
            res.send({
                code: 200,
                message: "ok",
                data : {
                    user : {
                        email : reqBody.email,
                        username : reqBody.username
                    }
                },
                token : token
            });
        })
    } else {
        res.json({
            code: 404,
            message : "Not Found"
        });
    }
}

export const login = (req, res) => {
    res.status(200).end("Login Successful");
}

export const facebookLogin = (req, res) => {
    res.status(200).end('Successfully Login Into Facebook Application');
}

export const googleLogin = (req, res) => {
    res.status(200).end('Successfully Login Into Google Application');
}

export const twitterLogin = (req, res) => {
    res.status(200).end('Successfully Login Into Twitter Application');
}
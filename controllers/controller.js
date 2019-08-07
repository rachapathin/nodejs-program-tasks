const jwt = require('jsonwebtoken');
import loginCredentails from '../data/logincredentials';

export const getProducts = (req, res) => {
    res.send("ALL Products"); 
}

export const getSingleProduct = (req, res) => {
    res.send("SINGLE Product"); 
}

export const getAllReviewsForProduct = (req, res) => {
    res.send("ALL reviews for a single product"); 
}

export const addNewProduct = (req, res) => {
    res.send("Added New Product"); 
}

export const getAllUsers = (req, res) => {
    res.send("ALL Users"); 
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
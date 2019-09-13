import passport from 'passport';
import {
    getProducts,
    addNewProduct,
    getSingleProduct,
    getAllReviewsForProduct,
    getAllUsers,
    checkAuthentication,
    login,
    facebookLogin,
    googleLogin,
    twitterLogin
} from "../controllers/controller";

import { getAllCities, addNewCity, updateCity, deleteCity} from "../controllers/cities";

import { addProduct, getAllProducts, deleteSingleProduct} from "../controllers/products";

import { addUser, getUsers, deleteSingleUser} from "../controllers/users";

const routes = (app, verifyToken) => {
    app.route('/api/products').get(verifyToken,  getProducts).post(verifyToken, addNewProduct)

    app.route('/api/products/:id').get(verifyToken, getSingleProduct);

    app.route('/api/products/:id/reviews').get(verifyToken, getAllReviewsForProduct);    

    app.route('/api/users').get(verifyToken, getAllUsers);

    app.route('/auth').post((req, res, next) => {
        next();
    }, checkAuthentication);
    // Local strategy route
    app.route('/login').post(passport.authenticate('local'), login);
    // Facebook strategy route
    app.route('/facebook/login').get(passport.authenticate('facebook'));
    app.route('/facebook/login/callback').get(passport.authenticate('facebook'), facebookLogin);
    // Google Strategey route
    app.route('/google/login').get(passport.authenticate('google', { scope: ['profile'] }));
    app.route('/google/login/callback').get(passport.authenticate('google'), googleLogin);

    // Twitter Strategey route
    app.route('/twitter/login').get(passport.authenticate('twitter'));
    app.route('/twitter/login/callback').get(passport.authenticate('twitter'), twitterLogin);

    // Get cities and add new city route
    app.route('/api/cities').get(getAllCities).post(addNewCity);
    // Update city route
    app.route('/api/cities/:id').put(updateCity);
    // Delete city route
    app.route('/api/cities/:id').delete(deleteCity);

    //Get all users Route  and add user route
    app.route('/api/allusers').get(getUsers).post(addUser)
    // Delete users route
    app.route('/api/users/:id').delete(deleteSingleUser);

    //Get all products Route 
    app.route('/api/allproducts').get(getAllProducts).post(addProduct)

    // Delete products route
    app.route('/api/products/:id').delete(deleteSingleProduct);
    


}

export default routes;
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
}

export default routes;
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
    googleLogin
} from "../controllers/controller";

const routes = (app, verifyToken) => {
    app.route('/api/products').get(verifyToken,  getProducts).post(verifyToken, addNewProduct)

    app.route('/api/products/:id').get(verifyToken, getSingleProduct);

    app.route('/api/products/:id/reviews').get(verifyToken, getAllReviewsForProduct);    

    app.route('/api/users').get(verifyToken, getAllUsers);

    app.route('/auth').post((req, res, next) => {
        next();
    }, checkAuthentication);

    app.route('/login').post(passport.authenticate('local'), login);
    
    app.route('/facebook/login').get(passport.authenticate('facebook'));
    app.route('/facebook/login/callback').get(passport.authenticate('facebook'), facebookLogin);

    app.route('/google/login').get(passport.authenticate('google', { scope: ['profile'] }));
    app.route('/google/login/callback').get(passport.authenticate('google'), googleLogin);
}

export default routes;
import {
    getProducts,
    addNewProduct,
    getSingleProduct,
    getAllReviewsForProduct,
    getAllUsers
} from "../controllers/controller";

const routes = (app) => {
    app.route('/api/products')
    .get((req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    },  getProducts)

    // please use postman to verify post call
    .post((req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    },  addNewProduct)

    app.route('/api/products/:id')
    .get((req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    },  getSingleProduct);

    app.route('/api/products/:id/reviews')
    .get((req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    }, getAllReviewsForProduct);
    

    app.route('/api/users')
    .get((req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    }, getAllUsers);

}

export default routes;
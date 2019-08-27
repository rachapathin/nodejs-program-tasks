import Products from '../models/mongo/products';

  
export const addProduct = (req, res) => {
    const { name, price, reviews } = req.body;
    Products.create({ name, price, reviews })
      .then((product) => res.send(product))
      .catch((error) => console.log('Error:', error));
}


// Get all products
export const getAllProducts = (req, res) => {
    Products.find()
      .then((products) => {
        if (!products.length) {
          console.log('No products found');
          res.status(400).send('No products found');
        }
  
        res.send(products);
      })
      .catch((err) => console.log('Error:', err));
}

// Delete product 

export const deleteSingleProduct = (req, res) => {
    const { id: _id } = req.params;
    Products.remove({ _id }, (err, product) => {
      if (err){
          return res.send(err);
      }
      return res.send("Product deleted successfully!");
    });
};
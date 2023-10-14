let ProductModel = require('../models/product');

/*Create product */
module.exports.create = async function (req, res, next) {
    try {
        let newProduct = new ProductModel(req.body);

        let result = await ProductModel.create(newProduct);
        res.json(
            {
                success: true,
                message: "Product created sucessfully."
            }
        );
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/*Search ALL Products */
exports.list = async function (req, res, next) {
    try {
        let list = await ProductModel.find({}, '-password');
        res.json(list);
    } catch (error) {
        next(error);
    }
}

/*Search ALL PUBLISHED Products */
exports.published = async function (req, res, next) {
  try {
      let list1 = await ProductModel.find({published: true}, '-password');
      res.json(list1);
  } catch (error) {
      next(error);
  }
}

/*Search Product BY ID */
exports.productByID = async function (req, res, next) {
    try {
        let productId = req.params.id;
        req.user = await ProductModel.findOne({ _id: productId }, '-password');
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.read = function (req, res) {
    res.json(req.user);
};

/*Search Product BY NAME = KW */
exports.productByName = async function (req, res, next) {
  try {
      let characters = req.params.name;
      req.user = await ProductModel.findOne({name: { $regex: "(?-i)"+characters } });
      next();
  } catch (error) {
      console.log(error);
      next(error);
  }
};

exports.readName = function (req, res) {
  res.json(req.user);
};

/*Update Product BY ID */
exports.update = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let updatedProduct = ProductModel(req.body);
        updatedProduct._id = productId;

        let result = await ProductModel.updateOne({ _id: productId }, updatedProduct);
        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Product updated sucessfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('Product not updated. Are you sure it exists?')
        }
    } catch (error) {
        next(error)
    }
}

/*Delete Product BY ID */
module.exports.removeByID = async (req, res, next) => {
     try {
       let productId = req.params.id;
       let result = await ProductModel.deleteOne({ _id: productId });
       console.log("====> Result: ", result);
       if (result.deletedCount > 0) {
         res.json(
           {
             success: true,
             message: "Product deleted sucessfully."
           }
         )
       }
       else {
         // Express will catch this on its own.
         throw new Error('Product not deleted. Are you sure it exists?')
       }
     } catch (error) {
       console.log(error);
       next(error);
     }
    }
    
/*Delete ALL PRODUCTS */
module.exports.remove = async (req, res, next) => {
    try {
      let productId = req.params.id;
      let result = await ProductModel.deleteMany({});
      console.log("====> Result: ", result);
      if (result.deletedCount > 0) {
        res.json(
          {
            success: true,
            message: "All Products deleted sucessfully from the collection."
          }
        )
      }
      else {
        // Express will catch this on its own.
        throw new Error('There is not products in the collection to delete')
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
   }
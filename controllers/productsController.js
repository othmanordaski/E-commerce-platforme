const Product = require('../models/schemas/productSchema');

exports.getAllProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.json({
            data: products
        });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getSingleProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.json({
            data: product
        });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const id = req.user._id;
        const { filename } = req.file;
        const { title, description, price, category, stock, published } = req.body;
        const product = new Product({
            title,
            description,
            price,
            category,
            images: filename,
            owner: id,
            stock,
            published
        });
        const result = await product.save();
        return res.json({
            data: result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.updateProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const userid = req.user._id;
        const { filename } = req.file;
        const { title, description, price, category, stock, published } = req.body;
        const product = await Product.findById(id);
        if (userid == product.owner ){
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            title,
            description,
            price,
            category,
            images: filename,
            stock,
            published
        }, { new: true });
        res.json({
            data: updatedProduct
        });}else{
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.deleteProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const userid = req.user._id;
        const product = await Product.findById(id);
        if (userid == product.owner ){
        const deletedProduct = await Product.deleteOne({_id : id})
        res.json({
            data: deletedProduct
        });}else{
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getProductByCategory = async (req, res) => {
    try {
        const  {category}  = req.query;
        console.log(category);
        const products = await Product.find({category});
        res.json({
            data: products
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
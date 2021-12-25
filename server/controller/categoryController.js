const Category = require('../model/categoryModel')
const Product = require('../model/productModel')
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const creatCategory = async (req, res) => {
    try {
        const { name } = req.body
        const category = await Category.findOne({ name })
        if (category) return res.status(400).json({ message: "this category already exists" })
        const newCategory = new Category({ name })
        await newCategory.save()
        res.status(200).json({ message: "created a category" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const deleteCategory = async (req, res) => {
    try {
        const products = await Product.findOne({ category: req.params.id })
        if (products) return res.status(400).json({ message: "Please delete all products with a relationship." })
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Deleted a category" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await Category.findByIdAndUpdate({ _id: req.params.id }, { name })
        res.status(200).json({ message: "updated a category" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getCategories,
    creatCategory,
    deleteCategory,
    updateCategory
}
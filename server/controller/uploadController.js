const cloudinary = require('cloudinary')
const fs = require('fs')
cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.CLOUDE_API_KEY,
    api_secret: process.env.CLOUDE_API_SECRET,
    secure: true
})
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}
const uploadImage = (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('no files were uploaded.')
        }
        const file = req.files.file
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ message: "Size is too large" })
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ message: "file format is incorrect" })
        }
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "Ecomerse" }, async (err, result) => {
            if (err) throw err;
            removeTmp(file.tempFilePath)
            res.status(200).json({ public_id: result.public_id, url: result.secure_url })
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const deleteImage = (req, res) => {
    try {
        const { public_id } = req.body
        if (!public_id) return res.status(400).json({ message: "no images selected" })
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err
            res.status(200).json({ messgae: "deleted image" })
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    deleteImage,
    uploadImage
}
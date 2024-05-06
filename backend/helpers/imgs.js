const multer = require('multer')
const path = require('path')

const localImg = multer.diskStorage({

    destination: function(req, file, cb){
        let folder = ''
        if(req.baseUrl.includes('users')){
            folder = 'users'
        } else if (req.baseUrl.includes('pets')){
            folder = 'pets'
        }
     
        cb(null, `public/images/${folder}`)
    },
    filename: function( req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    },   
})

const imgUp = multer({
    storage: localImg,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return  cb(new Error('O formato imcopativel, Formato valido: png | jpg !'))
        }
        cb(undefined, true)
    }
})

module.exports = imgUp
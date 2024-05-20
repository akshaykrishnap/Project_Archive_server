// import multer
const multer= require('multer')

// storage space creation
const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,"./uploaded")   // location where the upload file is stored locally
    },
    filename:(req,file,callBack)=>{
        // Date.now( - return time in milliseconds)
        filename =`image-${Date.now()}-${file.originalname}`
        callBack(null,filename)
    }
})

// 3) fileFilter
const fileFilter = (req,file,callBack)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        callBack(null,true)
    }else{
        callBack(null,false)
        return callBack(new Error("Only png,jpeg,jpg are allowed"))
    }
}


// 4) create multer configuration
    const multerConfig = multer({
        storage,
        fileFilter
    })

    module.exports = multerConfig
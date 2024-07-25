const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileUpload -> hadler create to set a file in server side at specifice path 

exports.localFileUpload = async (req,res) => {
    try{
        //fetch file from request
        const file = req.files.file;
        console.log("FILE AAGYI JEE ->", file)

        //create path of server where file  need to stored on server  // __dirname(current working directory) like controller is current directory of FileUpload
        let path = __dirname +"/files/" + Date.now() + `.${file.name.split('.')[1]}`; //It is a server path where i want to store
        console.log("PATH-> ", path)

        //move file to this path    //add path to the move function
        file.mv(path , (err) =>{
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true, 
            message:'Local File Uploaded Successfully'
        });
    }
    catch(error){
        console.log("Not able to upload the file on server")
        console.log(error)
    }
}



function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};                   //parameter required
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);    //file.tempFilePath ye wo folder hai jo server ke upar temperary folder banta hai.
}

//image upload ka handler
exports.imageUpload = async (req, res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;  
        console.log(file);

        //Validation 
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase(); //current file type identify by extension
        console.log("File Type:", fileType)
        
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status.json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai 
        console.log('Uplaoding to Codehelp')
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save karni hai 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image successfully uploaded',
        })
    
    
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
            message:error.message,
        })
    }
}

//video upload ka handler

exports.videoUpload = async (req,res) => {
    try {
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        
        const file = req.files.videoFile;
        
        //Validation 
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        // TODO: add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save karni h
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json ({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        });

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

//imageSizeReducer

exports.imageSizeReducer = async (req,res) => {
    try {
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;

        //Validation 
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        // TODO: add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400)({
                success:false,
                message: 'File format not supported',
            })
        }

        //file format supported hai 
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp", 90);
        console.log(response);

        //db me entry save karni h
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded",
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}
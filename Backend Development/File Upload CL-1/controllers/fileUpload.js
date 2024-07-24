const File = require("../models/File");

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

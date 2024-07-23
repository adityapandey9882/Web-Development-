const File = require("../models/File");

//localfileUpload -> hadler create to set a file in server side at specifice path 

exports.localFileUpload = async (req,res) => {
    try{
        //fetch file
        const file = req.files.file;
        console.log("FILE AAGYI JEE ->", file)

        //In Which path of server you want to store  // __dirname(current directory) like controller is current directory
        let path = __dirname +"/files/" + Date.now() + `.${file.name.split('.')[1]}`; //It is a server path where i want to store
        console.log("PATH-> ", path)

        //move file to this path 
        file.mv(path , (err) =>{
        });

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

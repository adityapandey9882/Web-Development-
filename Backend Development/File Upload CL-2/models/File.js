const mongoose = require("mongoose");
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOCS",doc)

        //transporter
        //TODO: shift this configuration under /config folder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from: `CodeHelp - by Aditya`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h>Hello Jee</h> <p>File Uploaded<p/> View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
        })

        console.log("INFO:", info);

    }
    catch(error) {
        console.log(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;
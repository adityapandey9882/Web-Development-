# setup system 
  1. createFolder (File Upload)
  2. open Folder and run cmd npm init -y to  for package.json file 
  3. create a file index.js , .env
  4. install express - npm i express
  5. create folder - models, controllers, config, routes

# All installed package to create file Upload Backend Project 
  1. express.js: To create server and activate the server at any port No.
  2. dotenv: dotenv package is used to load environment variables from a .env file into the environment, useful for managing configuration 
          settings and sensitive information such as API keys, database credentials, PORT NO and other configuration data.
  3. nodemon: nodemon package is a tool used in Node.js development to automatically restart the server when changes are detected in the 
             source    files.
  4. mongoose: mongoose package is an Object Data Modeling (ODM) library for MongoDB and Node.js. Mongoose facilitates the connection and 
            interaction between an application and the database.
  5. express-fileupload or Multer: express-fileupload is a simple, lightweight middleware that provides easy handling of file uploads in an 
                  Express application , multer is a more feature-rich and flexible middleware for handling file uploads. It is designed to handle multipart/form-data, which is commonly used for file uploads. multer allows for more control over file storage, validation, and handling.
  6. cloudinary: Cloudinary is a cloud-based service that provides solutions for managing, storing, optimizing, and delivering images and 
              videos for web and mobile application.

# Pre/Post middleware- Pre and post middleware in Mongoose are used to define hooks that run before or after certain operations on documents in a MongoDB collection. write in models/File.js like sending email after certain operation.
    mongoose ->middleware 
    * Pre middleware - Pre middleware functions are executed one after another, when each middleware calls next.
      syntax -
            schema.pre('save', function() {
            return doStuff().
                then(() => doMoreStuff());
            });

            // Or, using async functions
            schema.pre('save', async function() {
            await doStuff();
            await doMoreStuff();
            });

    * Post middleware - Post middleware are executed after the hooked method and all of its pre middleware have completed.
      syntax -
            schema.post('init', function(doc) {
            console.log('%s has been initialized from the db', doc._id);
            });
            schema.post('validate', function(doc) {
            console.log('%s has been validated (but not saved yet)', doc._id);
            });
            schema.post('save', function(doc) {
            console.log('%s has been saved', doc._id);
            });
            schema.post('deleteOne', function(doc) {
            console.log('%s has been deleted', doc._id);
            });

    # MOST IMPORTANT POINT - Define Middleware(pre/post) Before Compiling Models, Calling pre() or post() after compiling a model does not work in Mongoose because the model is not designed to accept middleware functions directly. To use middleware, ensure you define it on the schema before compiling the model.

    # Before Pre/Post middleware we need a package to install NODEMAILER - send emails from node.js
     1. npm i nodemailder
     2. Take instance that mean const nodemailer = require("nodemailer");
     3. create reusable transporter object of Nodemailer
     4. send mail with defined transport object
const path = require("path");
const express = require('express');

const app = express();

const bodyParser = require("body-parser");// used to parse data in our requests

const mongoose = require("mongoose");

const multer = require("multer");

const Post = require('../Database/post');

app.use("/images", express.static(path.join("backend/images")));

mongoose.connect('mongodb://localhost:27017/MovieDB',{ useNewUrlParser: true },(err)=>{
	if(!err)
		console.log('MongoDB Connection Succeeded.');
	else
		console.log('Error in DB connection'+err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));// we can omit it (it is to support default feautures in url encoading)


const storage = multer.diskStorage({
	destination:(req,file,cb)=>{// request,incomming file, cb:callback
		cb(null,"backend/images");
	},

	filename:(req,file,cb)=>{
		const name = file.originalname.toLowerCase().split(' ').join('-');
		cb(null,name+'-'+Date.now())
	}

});

app.use((req,res,next)=>{
	console.log("middleware 1");
	next();// this makes to move to next function
});



// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   }
// });

app.use((req,res,next)=>{
	/*        ANGULAR TO NODE          */
	/*the below headers are for CORS :Cross origin resource sharing*/
	res.setHeader("Access-Control-Allow-Origin","*");//headers are like KEY : VALUE pairs key : Access-Control ,Value : *
	res.setHeader("Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,POST,PATCH,DELETE,OPTIONS,PUT"
		);
	next();
});

app.put("/api/posts/:id",multer({ storage: storage }).single("image"),(req,res,next)=>{
	let imagePath = req.body.imagePath;
	 if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
	const post = new Post({
		_id:req.body.id,// parsing objects of request(req) body
		title:req.body.title,
		content:req.body.content,
		imagePath: imagePath
	});

	Post.updateOne({_id:req.params.id},post).then(result=>{// params is uded to extract data from parameters
		console.log(result);
		res.status(200).json({message:"update successful"});

	});
})

app.delete("/api/posts/:id",(req,res,next)=>{
	// console.log(req.params.id);// params belong to node it gives all encoded parameters
	Post.deleteOne({_id:req.params.id}).then(result=>{
		console.log(result);
	});
	res.status(200).json({message:"Post Deleted!!"});

	});
		

app.post("/api/posts",multer({storage:storage}).single("image"),(req,res,next)=>{
		// const post = req.body;
		// console.log("***"+req.body.title);
		const url = req.protocol + "://" + req.get("host");
		const post = new Post({//mongoose object for adding
			title : req.body.title,// this title and content are from postservice.ts and postmodel.ts
			content : req.body.content,
			imagePath:url+"/images/"+req.file.filename
		});

		console.log("welcome");
		// post.save();// this is a method in mongoose
		post.save().then(createdPost=>{
			res.status(201).json({//status code 201 means : every thing is okay and a new resource is created
			message:"post added succesfully!!",
			// postId:createdPost._id // **Excellent and very important to handle imp error when new post created
			post: {
          	...createdPost,
          	id: createdPost._id
        }

		});
		});
		
});

app.get('/api/posts',(req,res,next)=>{
	console.log("getting posts...")
	Post.find().then(documents=>{
	// we will make asynchronous action i.e response is sent only when we fetch documents
	// console.log(documents);
	res.status(200).json({
	message:'post fetched succesfully',
	posts:documents
});

	});
//we can also add return to res.status. No need also as it is last statement it will automatically return

});

app.get('/api/posts/:id',(req,res,next)=>{
	console.log("post id is"+req.params.id);
	 Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

app.get('/api/posts/meaning/:id',(req,res,next)=>{
	console.log("word is" + req.params.id);
});

module.exports = app; // we are exporting this to out side ,the syntax of this export is differwent from angular export
// we exported it to server.js


// app.get('/api/posts',(req,res,next)=>{//we can also use app.use
// 	//res.send('Hello express');// it is to send reasponse in order to prevent delay
// const posts = [
// 	{
// 		ID:'1',
// 		TITLE:"prasanna kumar",
// 		CONTENT:"Web Technologies"
// 	},
// 	{
// 		ID:'2',
// 		TITLE:"dhoni",
// 		CONTENT:"Indian Skipper"
// 	}
// ];

// //we can also add return to res.status. No need also as it is last statement it will automatically return
// return res.status(200).json({
// 	message:'post fetched succesfully',
// 	posts:posts
// });

// });



var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
mongoose.connect('mongodb://test:test@ds157040.mlab.com:57040/blog6');



var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String
})

var Blog = mongoose.model('Blog', blogSchema);


// Blog.create({
// 	title: 'Sunday',
// 	image: 'http://alarishealth.com/wp-content/uploads/2016/04/carnival-banner.jpg',
// 	content: 'Great times!'
// })






app.get('/', function(req,res){
	res.redirect('/blogs');
})



//INDEX

app.get('/blogs', function(req,res){
	Blog.find({}, function(err,data){
		if(err) throw err;
		res.render('index', {blog: data});
	})
})


//NEW

app.get('/blogs/new', function(req,res){
	res.render('create');
})



//CREATE

app.post('/blogs', function(req,res){
		var title = req.body.title;
		var image = req.body.image;
		var content = req.body.content;
		var newBlog = {title:title, image:image, content:content};
		Blog.create(newBlog, function(err,data){
			if(err) throw err;
			res.redirect('/blogs');
		})
})



//SHOW
app.get('/blogs/:id', function(req,res){
		Blog.findById(req.params.id, function(err,data){
			if(err) throw err;
			res.render('show', {blog:data});
		});
})




//EDIT

app.get('/blogs/:id/edit', function(req,res){
	Blog.findById(req.params.id, function(err,data){
		if(err) throw err;
		res.render('edit', {blog:data});
	})
})




//UPDATE
app.put('/blogs/:id', function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,data){
		if(err) throw err;
		res.redirect('/blogs');
	})
});



//DESTROY
app.delete('/blogs/:id', function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err,data){
		if(err) throw err;
		res.redirect('/blogs');
	})


})




app.listen(3000, function(){
	console.log("The server is running!");
})
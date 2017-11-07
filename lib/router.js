Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {

	name: 'Home'
});
Router.route('/login', {
	name: 'Login',
	template: 'login'
});

Router.route('/register', {
	name: 'Register',
	template: 'register'
});

Router.route('/ViewRecipe/:_id', {
	name: 'Viewing',
	template: 'view_per_recipe',
	data: function () {
		var id = this.params._id;
		return Recipes.findOne({ _id: id });
	}
});
Router.route('/ViewOnly/:_id', {
	name: 'ViewOnly',
	template: 'view_only',
	data: function () {
		var id = this.params._id;
		return Recipes.findOne({ _id: id });
	}
});
Router.route('/addrecipe', {
	name: 'AddRecipe',
	template: 'addrecipe'
});

Router.route('/adminview', {
	name: 'Admin',
	template: 'adminview',

	data: function () {
		var id = this.params._id;
		return Category.findOne({ _id: id });

	}
});

Router.route('/addcategory', {
	name: 'AddCategory',
	template: 'addcategory'
});

Router.route('/profile', {
	name: "Profile",
	template: "user",
});

Router.route('/Category/:name', {
	name: 'ViewRecipe',
	template: 'viewrecipesbycategory',
	data: function () {
		var id = this.params.name;
		return Category.findOne({ name: id });
	}
});
Router.route('/AboutUs', {
	name: "AboutUs",
	template: "aboutus"
})
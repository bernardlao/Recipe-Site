Template.viewrecipesbycategory.helpers({
    // 'category_name': function () {
    //     return Category.find({}, { sort: { name: -1 } });
    // },
    // 'category_group': function () {
    //     return Category.findOne({ _id: this._id });
    // },
    'recipe_cat':function(){
        var cname = this.name;
        return Recipes.find({category_name:cname});
    },
    'classNeed':function(){
        var userID = $('#login_user').val();
        var id = this._id;
        if(userID != "wala pa"){
            var count = Likes.find({$and: [{ recipe_id: this._id }, { userid: userID }]}).count();
            if(count == 0){
                return "glyphicon glyphicon-heart-empty";
            }else{
                return "glyphicon glyphicon-heart";
            }
        }else{
            return "glyphicon glyphicon-heart-empty";
        }
    }
});
Template.viewrecipesbycategory.events({
    'click #hearteu': function (events) {
        event.preventDefault();
        var userID = $('#login_user').val();
        var id = this._id;
        if (userID != "wala pa") {
            var count = Likes.find({ $and: [{ recipe_id: this._id }, { userid: userID }] }).count();
            if (count == 0) {
                Recipes.update(
                    { _id: this._id },
                    { $inc: { likes: 1 } }
                );
                // $('#hearteu').removeClass('glyphicon glyphicon-heart-empty ')
                //     .addClass('glyphicon glyphicon-heart');
                Likes.insert({ recipe_id: id, userid: userID });
            } else {
                Recipes.update(
                    { _id: this._id },
                    { $inc: { likes: -1 } }
                );
                // $('#hearteu').removeClass('glyphicon glyphicon-heart ')
                //     .addClass('glyphicon glyphicon-heart-empty');
                Likes.find({ $and: [{ recipe_id: this._id }, { userid: userID }] }).forEach(function (e) {
                    Likes.remove({ _id: e._id });
                });
            }
        }else {alert("You have to login to like the recipes.");}
    }
});

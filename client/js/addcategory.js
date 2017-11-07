Template.addcategory.events({
      'submit form': function (e) {
            e.preventDefault();
            var input = $('[name="category"]');
            var categoryname = input.val();
            // var catcollection = Category.find({name:categoryname}).count();
             if ( Category.find({name:input.val()}).count() == 0) {
                  Category.insert({
                        name:input.val()
                  });
                  input.val('');
                  alert('Success')
            }else{
                  alert('Category name already exist')
            }
       },
       
      'click [id=btndelete]': function (e) {
            e.preventDefault();     
            var id = this._id;
            if (confirm("Are you sure you want to delete this category ? '" + this.name + "'?")) {
                  Category.remove({ _id:id });
            }
      },

      'keyup [name=category_name]': function (e) {
            e.preventDefault();
            if (e.which == 13 || e.which == 27) {
                  $(e.target).blur();
            }
            else {
                  var id = this._id;
                  var item = $(e.target).val();
                  Category.update({ _id: id }, { $set: { name: item } });
            }
      },

      'click [name=category_name]': function (e) {
            e.preventDefault();
            var id = this._id;
      },

});

Template.addcategory.helpers({
      'category_name': function () {
            return Category.find({});
      },

});



var Backbone = require('backbone');


var Ingredient = Backbone.Model.extend({
  defaults: {
    name: '',
    unit: '',
    qty: ''
  }
});


var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient
});

export {IngredientCollection as default, Ingredient}

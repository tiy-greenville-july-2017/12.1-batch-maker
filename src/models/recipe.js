import parse, {ParseModel, ParseCollection} from '../parse';
import IngredientCollection from './ingredient';

var Backbone = require('backbone');


var Recipe = ParseModel.extend({
  defaults: {
    title: '',
    description: '',
    servings: '',
    ingredients: new IngredientCollection([{}])
  },
  urlRoot: 'https://dietz-server.herokuapp.com/classes/Recipe',
  parse: function(data){
    data.ingredients = new IngredientCollection(data.ingredients);
    return data;
  },
  toJSON: function(options) {
    this.attributes.ingredients = this.attributes.ingredients.toJSON();
    return ParseModel.prototype.toJSON.apply(this, arguments);
  }
});


var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  url: 'https://dietz-server.herokuapp.com/classes/Recipe'
});

export {RecipeCollection as default, Recipe}

import React from 'react';

import BaseLayout from '../layouts/Base';
import User from '../models/user';
import RecipeCollection, { Recipe } from '../models/recipe';


class RecipeFormContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      recipe: new Recipe()
    }
  }

  componentWillMount(){
    let recipe = this.state.recipe;
    let recipeId = this.props.match.params.id;

    // If no recipeId this is an Add
    if(!recipeId){
      return ;
    }

    // Load the recipe to edit
    recipe.set('objectId', recipeId);
    recipe.fetch().then(() => {
      this.setState({recipe: recipe});
    });
  }

  saveRecipe = () => {
    this.state.recipe.save().then(() => {
      this.props.history.push('/recipe/');
    });
  }

  render(){
    return (
      <BaseLayout>
        <RecipeForm recipe={this.state.recipe} saveRecipe={this.saveRecipe}/>
      </BaseLayout>
    )
  }
}

class IngredientFormset extends React.Component{
  _qtyChange = (e) => {
    this.props.ingredient.set('qty', e.target.value);
    this.props.updateRecipe();
  }

  _unitChange = (e) => {
    this.props.ingredient.set('unit', e.target.value);
    this.props.updateRecipe();
  }

  _nameChange = (e) => {
    this.props.ingredient.set('name', e.target.value);
    this.props.updateRecipe();
  }

  handleDlete = (e) => {
    this.props.ingredient.destroy();
    this.props.updateRecipe();
  }

  render(){
    let ingredient = this.props.ingredient;
    let styles = {'formsetGroup': {
      margin: '0 15px'
    }};

    return (
      <div className="form-inline">
        <div className="form-group" style={styles.formsetGroup}>
          <input onChange={this._qtyChange} name="qty" className="form-control" value={ingredient.get('qty')} placeholder="QTY"/>
        </div>

        <div className="form-group" style={styles.formsetGroup}>
          <input onChange={this._unitChange} name="unit" className="form-control" value={ingredient.get('unit')} placeholder="Unit"/>
        </div>

        <div className="form-group" style={styles.formsetGroup}>
          <input onChange={this._nameChange} name="name" className="form-control" value={ingredient.get('name')} placeholder="Name"/>
        </div>

        <button onClick={this.handleDlete} className="btn btn-xs btn-danger">
          Remove
        </button>
      </div>
    )
  }
}


class RecipeForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      recipe: props.recipe
    }
  }

  handleTitleChange = (e) => {
    let recipe = this.state.recipe;
    recipe.set('title', e.target.value);
    this.setState({recipe: recipe});
  }

  handleServingChange = (e) => {
    let recipe = this.state.recipe;
    recipe.set('servings', Number(e.target.value));
    this.setState({recipe: recipe});
  }

  handleDescriptionChange = (e) => {
    let recipe = this.state.recipe;
    recipe.set('description', e.target.value);
    this.setState({recipe: recipe});
  }

  updateRecipe = () => {
    this.setState({recipe: this.state.recipe});
  }

  _onSubmit = (e) => {
    e.preventDefault();

    this.props.saveRecipe();
  }

  _addIngredient = (e) => {
    e.preventDefault();

    let recipe = this.state.recipe;
    let ingredients = recipe.get('ingredients');
    ingredients.add({});
    this.setState({recipe: this.state.recipe});
  }

  render(){
    let recipe = this.state.recipe;

    let ingredientFormSet = recipe.get('ingredients').map((ingredient) => {
      return (
        <IngredientFormset
          updateRecipe={this.updateRecipe}
          ingredient={ingredient}
          key={ingredient.cid}
        />
      );
    })

    return (
      <form className="form-horizontal" onSubmit={this._onSubmit}>
        <h1 style={{padding: '20px 0'}}>{recipe.isNew() ? 'Add' : 'Edit'} Recipe</h1>

        <div className="well">
          <div className="form-group">
            <label htmlFor="title" className="col-sm-2 control-label">Recipe Title</label>
            <div className="col-sm-10">
              <input onChange={this.handleTitleChange} id="title" value={recipe.get('title')}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <input onChange={this.handleDescriptionChange} id="title" value={recipe.get('description')}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="servings" className="col-sm-2 control-label">Servings</label>
            <div className="col-sm-10">
              <input onChange={this.handleServingChange} id="servings" value={recipe.get('servings')}/>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title clearfix">
              <span style={{fontWeight: 'bold', display: 'block', paddingTop: '10px'}} className="pull-left">Ingredients</span>
              <button className="btn btn-primary pull-right" onClick={this._addIngredient}>Add Ingredient</button>
            </h2>
          </div>
          <div className="panel-body">
            {ingredientFormSet}
          </div>
        </div>

        <input className="btn btn-success" type="submit" value={(recipe.isNew() ? 'Add' : 'Edit') + ' Recipe'} />
      </form>
    );
  }
}


export default RecipeFormContainer;

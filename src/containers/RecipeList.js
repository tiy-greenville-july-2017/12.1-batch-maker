import React from 'react';

import BaseLayout from '../layouts/Base';
// import Card, {CardBody} from '../components/Card';
import User from '../models/user';
import RecipeCollection, { Recipe } from '../models/recipe';


class RecipeListContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      recipeCollection: new RecipeCollection()
    }
  }

  componentDidMount(){
    let recipeCollection = this.state.recipeCollection;
    recipeCollection.fetch().then(() => {
      this.setState({recipeCollection: recipeCollection});
    });
  }

  deleteRecipe = (recipe) => {
    recipe.destroy();
    this.setState({recipeCollection: this.state.recipeCollection});
  }

  navRecipeAdd = () => {
    this.props.history.push('/recipe/add/');
  }

  navRecipeEdit = (objectId) => {
    this.props.history.push('/recipe/' + objectId + '/edit/');
  }

  render(){
    return (
      <BaseLayout>
        <RecipeList
          deleteRecipe={this.deleteRecipe}
          navRecipeAdd={this.navRecipeAdd}
          navRecipeEdit={this.navRecipeEdit}
          recipeCollection={this.state.recipeCollection}
        />
      </BaseLayout>
    )
  }
}

function RecipeList(props){
  let user = User.current();

  let listItems = props.recipeCollection.map((recipe) => {
    // let ownerId = message.get('owner').objectId;
    // let messageClass = (ownerId == user.id ? 'my-message' : 'other-message');

    return (
      <li key={recipe.cid} className="list-group-item clearfix">
        <strong>{recipe.get('title')}</strong>

        <div className="pull-right">
          <button onClick={(e) => {e.preventDefault(); props.navRecipeEdit(recipe.id)}} className="btn btn-xs btn-primary">Edit</button>
          <button onClick={(e) => {e.preventDefault(); props.deleteRecipe(recipe)}} className="btn btn-xs btn-danger">Delete</button>
        </div>
      </li>
    );
  });

  return (
    <div className="">
      <h1>
        My Recipes
        <button className="btn btn-success pull-right" onClick={props.navRecipeAdd}>
          Add Recipe
        </button>
      </h1>

      <ul className="list-group">
        {listItems}
      </ul>
    </div>
  );
}


export default RecipeListContainer;

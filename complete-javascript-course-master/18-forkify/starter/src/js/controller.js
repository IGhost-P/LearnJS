import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  // parcel 문법이다
  module.hot.accept();
}
const controlRecipe = async function () {
  try {
    // getHash
    const id = window.location.hash.slice(1);

    // guard clause
    if (!id) return;

    // loding svg
    recipeView.renderSpinner();

    // 0) Updata recipe
    resultView.update(model.getSearchResultPage());

    // 1) Loding Recipe (from model.js)
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(new Error());
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPage());

    /// 4) Render inital pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// 새로운 컨트롤러를 만들어주자 (클릭할때마다 생김), 값을 받아서 새로 페이지를 랜더링 할것
const controlPaination = function (goToPage) {
  // 1) New Render results
  resultView.render(model.getSearchResultPage(goToPage)); // getSearchResultPage에 의해 상태 값(page)이 변경된다 => 랜더링 되는게 바뀜

  /// 2) New Render inital pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 북마크가 없다면 추가
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // 북마크가 있다면 삭제
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPaination);
};
init();

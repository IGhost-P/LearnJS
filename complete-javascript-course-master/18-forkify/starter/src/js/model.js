import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    // 나중일 위해 쿼리는 저장해두자,
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    // loding recipe'

    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmarked => bookmarked.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 🔥 🔥 🔥 🔥`);
    throw err; // 헬퍼 function과 마찬가지로 err를 던져줘야한다 이렇게 하면 loadRecipe를 부르는 controller에 보내지고 controller은 view의 함수를 이용해 err를 보여준다
  }
};

// 무엇을 검색할지 query로 던저줄것이다
export const loadSearchResults = async function (query) {
  try {
    // 쿼리 저장
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    // 검색 결과 저장
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // 새로운 레시피를 검색할떄 page를 1로 바꿔줘야한다
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 🔥 🔥 🔥 🔥`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark (새속성을 추가해서 보여주기)
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  // 해당 부분만 .splice로 자른다
  state.bookmarks.splice(index, 1);

  // // Mark current recipe as NOT bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

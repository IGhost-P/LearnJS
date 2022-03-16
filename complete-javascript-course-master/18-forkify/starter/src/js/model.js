import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers';
console.log(API_URL);
export const state = {
  recipe: {},
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

    // console.log(recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 🔥 🔥 🔥 🔥`);
    throw err; // 헬퍼 function과 마찬가지로 err를 던져줘야한다 이렇게 하면 loadRecipe를 부르는 controller에 보내지고 controller은 view의 함수를 이용해 err를 보여준다
  }
};

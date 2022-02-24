// // 기본 exrpot라면 {} degfault라면 안써도된다
// // import { addToCart, totalPrice, totalQuantity } from './shoppingCart.js';
// import add, { cart } from './shoppingCart.js';
// add('pizza', 2);
// add('bread', 5);
// add('apples', 4);

// console.log(cart);
// Top-Level Await (ES2022)

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost();
// console.log(lastPost);

// // Not very clean
// lastPost.then(last => console.log(last));
// console.log('not very clean');

// const lastPost2 = await getLastPost();
// console.log(lastPost2);
// console.log('clean');

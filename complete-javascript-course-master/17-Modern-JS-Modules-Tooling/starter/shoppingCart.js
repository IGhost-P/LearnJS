console.log(`i am shopping Cart module`);
// 비공개 변수가 된다(메인 모듈에서) // 기존 script였다면 전역변수가 되어서 다른 script에서도 사용할수 있었다
const shoppingCost = 10;
export const cart = [];

// 공개적으로 보내고 싶다면 exprot를 사용
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity}, ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// Blocking code
console.log('Start fetching users');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finish fetching users');

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity}, ${product} added to cart`);
}
export { totalPrice, totalQuantity };

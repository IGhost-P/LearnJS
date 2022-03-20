const add = () => {
  return "add 함수입니다";
};
const add2 = () => {
  return "add2 함수 입니다";
};

const recall = () => {
  add2();
  return add();
};
console.log(recall());

// 'use strict';
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   // my answer
//   registerNewAnswer() {
//     const userAnswer = prompt(
//       `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//     );
//     userAnswer.length == 1
//       ? (this.answers[userAnswer] += 1)
//       : alert(`wrong Answer`);

//     this.displayResults();
//   },
//   displayResults() {
//     const input = prompt(`string or array?`);
//     input == `string`
//       ? console.log(this.answers)
//       : alert(`Poll results are ${this.answers}`);
//   },
// };

// // poll.registerNewAnswer();
// const $ = selecter => document.querySelector(selecter);

// const AnswePollBtn = $('.poll').addEventListener(
//   'click',
//   poll.registerNewAnswer.bind(poll)
// );

// let text = 20;

// const foo = function () {
//   text = 10;

//   return function () {
//     console.log((text += 1));
//   };
// };

// const yes = foo(); // yes = undifined, yes = 함수 할당 => foo()

// 이 이후로는 foo()
// console.log(yes()); // 11
// console.log(yes()); // 12
// console.log(yes());
// console.log(yes());
// console.log(yes());
// => 클로저 =>

const bar = function (a) {
  console.log(a + 1);
};

const foo = function (fn) {
  a = 10;
  fn(a); // bar(a)
};

foo(bar);

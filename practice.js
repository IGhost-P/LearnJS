const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }
  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi. bro! I'm ${this.name}`);
  };
  // 생성자 함수를 반환
  return Person;
})(); // 즉시 실행 함수
// 인스턴스 생성
const me = new Person("jmaie");
// 인스턴스 메서드
// me.sayHi = function () {
//   console.log(`Hi. brobrobro ! I'm ${this.name}`);
// };
// 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다 = 프로퍼티 셰도잉
// 따라서 인스턴스 메서드가 호출된다.
me.sayHi(); // "Hi. brobrobro! I'm jmaie"

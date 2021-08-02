// // part2 43
// // const YSW = {
// //     firstName: 'Yang',
// //     lastName: 'snagWoo',
// //     age: 2021 - 1996,
// //     job: 'Student',
// //     firends: ['Minho', 'junghuen']
// // };

// // console.log(YSW);

// // console.log(YSW.lastName);
// // console.log(YSW['lastName']);

// // const nameKey = 'Name';
// // console.log(YSW['first' + nameKey]);
// // // 이렇게 하면 + 작동으로인해 string  으로 받아서 fristName이름이 되어 객체가 호출된다.(계산후 나온 객체 이름도) -> Bracket
// // // 단, 
// // // YSW.'Frist'+nameKey는 이미 . 으로 객체 호출인 상태이니 작동 되지 않는다. (이미 완성된  진짜 객체 이름만) -> Dot

// // const interestIn = prompt('What do you want to know about YSW? Choose bewteen firstName, lastName, age, job and firend');
// // // console.log(YSW[interestIn]); // 계산된 객체를 이용함

// // if (YSW[interestIn]) {
// //     console.log(YSW[interestIn]);

// // }
// // else {
// //     console.log('Wrong! Choose bewteen firstName, lastName, age, job and firend');
// // }

// // YSW.location = 'Korea'; // 객체를 추가하는 방법
// // YSW['email'] = 'dndb3599@gmail.com';
// // console.log(YSW);

// // //challeng
// // console.log(`YSW have ${YSW.firends.length}firends, and his best friend is calle ${YSW.firends[0]} `);

// // part2 44
// // 익스프레션은 가능한데 디클레이션은 안됨, 아마 이미 객체 확장자가 확정되었는데 디클레이션은 확장자를 설정하지 않아서 그런듯? 인데 되네?
// const YSW = {
//     firstName: 'Yang',
//     lastName: 'snagWoo',
//     //age: 2021 - 1996,
//     birthYear: 1996,
//     job: 'Student',
//     firends: ['Minho', 'junghuen'],
//     hasdriveLincense: true,
//     // calcAge: function (birthYear){
//     //     return 2021 - birthYear;}
//     calcAge: function () { // this 대신 YSW를 넣어도 되지만 이름이 바뀌면 이것도 바꿔여하기 때문에 오류 발생하기 쉬움, 귀찮다.
//         this.age = 2021 - this.birthYear;
//         return this.age;
//     },
//     judgeLincense: function () {
//         return this.hasdriveLincense ? 'a' : 'No';
//     }
// };

// YSW.calcAge(); // 함수 싱실행은 해줘야함

// console.log(YSW.age);

// // const calcAge = function (birthYear) // 이건 가능
// // {
// //     return 2021 - birthYear;
// // }
// // function calcAge(birthYear) // 이건 안됨 ,되는데요??
// // {
// //     return 2021 - birthYear;
// // }

// // Challenge 

// console.log(`YSW is ${YSW.calcAge()}year old ${YSW.job}, and he has ${YSW.judgeLincense()} driver's Lincense  `); // 함수호출할땐 꼭 파라미터가 없더라도 () 쓰자
// // 강의에서 말하고자 하는건, 배열안에 푸쉬, 팝 등 데이터를 넣을수있으니 우리가 배운 객체 인것이다. 다만 조금 구체적으로 다룬게 이번 강의 인것!
// //자바에서는 이런 객체나, 데이터의 집합을 메소드라 부르고, in, out이 있는건 함수라함

//part2 46
// for (let rep = 1; rep <= 10; rep++) {
//     console.log(`i had lift weights ${rep}!🏋️‍♀️ `);} // rep은 변하니깐 let으로 지정

//part2 47

const YSW = [
    'Yang',
    'sangwoo',
    2021 - 1996,
    'Student',
    ['Minho', 'junghuen'],
    true
]; // 이건 메소드가 아니라 배열이여서 [] 인듯?

const types = [];

for (let i = 0; i < YSW.length; i++) {
    console.log(YSW[i], typeof YSW[i]);

    types[i] = typeof YSW[i] // 이거는 함수를 넣은게 아니라, 이미 리턴된값을 캐치한 YSW를 넣은것
}

console.log(types);

// const years = [1996, 2001, 1995, 1997];
// const age = [];

// for (let i = 0; i < years.length; i++) {
//     age.push(2020 - years[i]); // push도 함수이다.
// }

// console.log(age);

// for (let i = 0; i < YSW.length; i++) {
//     //if (typeof YSW[i] !== 'string') continue // for 문이 끝나진 않고 조건일때만 실행, 아니면 넘어감 Sikp 개념
//     if (typeof YSW[i] === 'number') break // 조건이 맞으면 for문을 탈출함

//     console.log(YSW[i], typeof YSW[i]);
// }



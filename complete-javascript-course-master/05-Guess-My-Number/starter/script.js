'use strict';

// console.log(document.querySelector('.message').textContent);
// //html이나 css로 작성된 파일 형식을 dom 형식이라 하는데 이것을 js 로 가져와서 컨트롤 하고 싶은것, 그래서 쓰인게 querySelector이고(이러한 함수는 여러개) .messages는 작성된 html을 보면 알수 있듯이 클래스의 객체 이다. 그래서 string으로 가져왔고. 그리고 객체의 요소중 textContent를 가져온것이다, 쉽게 말해 message는 조나스 textContent는 조나스의 입 이런것

// //이번강의는 Dom이 무엇이고, 그것을 다루기 위해서 어떻게 해야할까? 이다.
// document.querySelector('.message').textContent = '🎉 corret Number!'

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

// const x = function () {
//     console.log(23);
// }
// document.querySelector('.check').addEventListener('click', function () {
//     const guess = Numer(document.querySelector('.guess').value); // value라서 string으로 받는데 number로 바꾸고 싶으면 이렇게 해야함.
//     console.log(guess);

//     if (!guess) {
//         document.querySelector('.message').textCpontent = 'no number!'; // 
//     } // 입력을 안할경우를 만듬 (시나리오 1)
// })
// document.querySelector('.check').addEventListener('click', function(){
//     console.log(document.querySelector('.guess').value) // 이렇게하면 핸들러함수를 통해 호출된 클릭을 실행하게 되면, 두번째 파라미터에 넣은 값이 행동된다., 그리고 자바스크립트 엔진의 특징으로, 함수가 한번 실행돠고 나서, 핸들러 함수가 실행된다, 즉 선언 하자마자 곧 실행됨.
//이벤트리스너는 html 에서 생긴 이벤트를 (어떻게=프로그래머 설정대로) 실행해줌
// })
// 게임 로직만들기,
// 맞춰야하는 넘버는 한번만 선언되어야하니깐 핸들러 함수 이전, 즉 스타트 할때 만들어야함.

//const number = Math.random() // Js에서 제공하는 함수. 0~1사이의 실수를 준다. 여기에 math.tranc를(소수부분은 제외 하고, 정수부분만 내보냄) 이용해 정수로 만든고 원하는 값을 *다 그러면 <n 까지 나오니깐 +1을 해 n 까지 나오게한다.
// 낮을때, 높을때 를 나눈 코드는 비슷하 중복 코드여서, 메세지를 바꾸거나 할때 두번 바꿔야하는 오류가있다. = dry하지 않은 코드
//여기서 필요한 기술이 리팩토리

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // 바뀔거니깐
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (!guess) {
        document.querySelector('.message').textContent = 'no number!';
    }
    else if (guess === secretNumber) {
        document.querySelector('.number').textContent = secretNumber;

        document.querySelector('.message').textContent = '🎉 corret Number!'

        document.querySelector('body').style.backgroundColor = '#60b347';

        document.querySelector('.number').style.width = '30rem'

        if (highscore < score) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        // 사용자가 이겼을때
    }
    else if (guess !== secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = guess > secretNumber ? 'Too high!' : 'Too low!';
            score--;
            document.querySelector('.score').textContent = score;
        }
        else {
            document.querySelector('.message').textContent = 'you lost!';
            document.querySelector('.score').textContent = 0;
        }
        // 점수가 너무 높을때
    }
});

document.querySelector('.again').addEventListener('click', function () {

    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    //guess(); 그냥 aging을 누르면 세팅만 바뀔뿐 click핸들러가 사라지는게 아님
});


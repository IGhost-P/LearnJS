'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal'); // html,css 파일안의 요소를 넣음, show-model같은 경우 세번다 출력하고 싶으니 querySelectorall 을 사용해 초기화 할수 있다. 초기화 한후 console로 확인

console.log(btnOpenModal); // 이것은 btnOpenModal의 구성요소를 알려주고

for (let i = 0; i < btnOpenModal.length; i++)
    console.log(btnOpenModal[i].textContent); // 이건 구성 요소하나하나를 보여줌.


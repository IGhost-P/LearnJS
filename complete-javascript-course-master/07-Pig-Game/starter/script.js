'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
//const score0 = document.querySelector('#score--0');
//const score1 = document.getElementById('score--1'); 
// 둘은 똑같이 동작한다. 하지만 밑에 있는게 좀더 빠르게 작동한다.
// 하지만 쓰일일도 별로 없기 때문에 쿼리 설렉터를 더 많이 사용한다.
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')


//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
//classList는 . 안함
const score = [0, 0]; // 이건 키를 생성하는게 아니라, 값을 생성했기때문에 나중에 activeplayer(1,0)를 키로 선언 하면 0:0 , 1:0 으로 객체가 생성된다. 
let currentScore = 0;
let activePlayer = 0;
let playing = true; // 게임을 하는중인지 끝났는지 하기 위해서
//첫 시작이 0이여야하니깐 전역변수로 둠
//두 플레이어 한테 스코어를 저장하기 위해서 [0,0] 으로 저장 0은 player 1 , 1은 player 2 이다.
//activePlayer은 나중에 유연하게 코딩하기위해 가져옴, activePlayer가 0 일떈 player 1, 1일땐 2이다.
const switchPalyer = function () {

    document.getElementById(`current--${activePlayer}`).textContent = 0; //바뀌기전 주사위가 1이 됐으니 0으로 다시 초기화
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;//바뀌기전 플레이어 1 이였냐 2이였나를 알려줌
    //HTML 처음 설정에 playactive를 플레이어1에게 넘겨줘야 화면이 바뀐다.
    player0El.classList.toggle('player--active');; // 플레이어 1 가있는가? -> 있으면 삭제 -> 플레이어 1 비활성화
    player1El.classList.toggle('player--active');; // 플레이어 2 에 있는가? -> 없으면 추가 -> 플레이어 2 활성화
    // 해당 클래스가 안에 있으면 remove, 없으면 add 해준다.
}

// Rolling dice fuctionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generationg a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //console.log(dice);
        // 2. Dispaly dice
        diceEl.classList.remove('hidden');;
        diceEl.src = `dice-${dice}.png`; // html 에서 쓰는 src에 넣는데 템프럴 리터럴을 이용해 변경되게 넣음.
        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            //current0El.textContent = currentScore; // CHANGE Later 지금은 플레이어 1 만 위에 코드로 바꼈다.

        } else {
            // if ture, switch to next player
            switchPalyer()

        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active palyer's score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            score[activePlayer] // hold키를 누를면 지금 실행중인 플레이어 점수에 현재 점수를 넣고, 스코어점수에 점수에 화면에 아까 저장한 점수를 넣는다.

        // 2. Check if player's score is >=100
        if (score[activePlayer] >= 20) {
            // Finish the game
            playing = false; // 이기면 더이상 게임 상태가 아니다.
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner') // player 클래스에 winner 클래스를 추가하고
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active') // 이미 추가되어있을 acrive클래스는 제거한다.
        } else {
            // Switch to the next platyer // 윗에 함수랑 중복되니 위 함수를 객체로 만들어, 드라이 코드를 만들지 말자.
            switchPalyer();
        }
    }
})

// new start를 눌렀을때 초기화
btnNew.addEventListener('click', function () {

    playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    score = [0, 0];
    // document.querySelector(`score--${activePlayer}`).textContent = 0;
    // currentScore = 0;
    // activePlayer = 0;

})
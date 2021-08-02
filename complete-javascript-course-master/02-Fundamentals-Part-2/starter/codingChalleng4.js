const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (bills) {
    // if (bills >= 50 && bills <= 300) {
    //     tip = bills * (15 / 100);
    //     return tip;
    // }
    // else {
    //     tip = bills * (20 / 100);
    //     return tip;}
    return bills >= 50 && bills <= 300 ? bills * 0.15 : bills * 0.2;
    //리턴값이 상수가 변수여서 const로 받을때 에러가 난듯?
}



for (let i = 0; i < bills.length; i++) {
    //const tip = calcTip(bills[i]); // 
    tips[i] = calcTip(bills[i]); // 이렇게도 가능하다.
    totals[i] = tips[i] + bills[i];
    console.log(`The bills was ${bills[i]}, the tips was ${tips[i]}, and the total value ${totals[i]}`)
}

const arr2 = [1, 2, 3];
// 나중에 변할거니깐


const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = arr[i] + sum;
    }
    return (sum / arr.length); // 길이는 칸, 칸이름은 -1 헷갈리지 말자.
}

const totals2 = calcAverage(arr2); // sum 값이 전역벼수가 되면 변경후 다시 for문으로 들어가기 때문에 조심하자.
console.log(totals2);
console.log(calcAverage(bills));
console.log(calcAverage(tips));
console.log(calcAverage(totals));

let tips;

const bills = new Array(125, 555, 44);

const calcTip = function (bills) {
    if (bills >= 50 && bills <= 300) {
        tips = bills * (15 / 100);
        return tips;
    }
    else {
        tips = bills * (20 / 100);
        return tips;
    }
}
const totlas = [bills[0] + calcTip(bills[0]), bills[1] + calcTip(bills[1]), bills[2] + calcTip(bills[2])];
console.log(totlas[0], totlas[1], totlas[2]);
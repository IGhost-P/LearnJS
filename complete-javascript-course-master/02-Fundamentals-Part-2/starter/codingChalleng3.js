const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    clacBMI: function () {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    }
};
const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    clacBMI: function () {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    }
};
if (mark.clacBMI() > john.clacBMI()) {
    console.log(`${mark.fullName} is BMI(${mark.clacBMI()}) is higher than ${john.fullName}is BMI(${john.clacBMI()}`)
}
else {
    console.log(`${john.fullName}'s BMI(${john.clacBMI()}) is higher than ${mark.fullName}'s BMI(${mark.clacBMI()}`)
}
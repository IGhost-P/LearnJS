const getCorrectDate = () => {
  const date = new Date();
  console.log(date);
  date.setDate(date.getDate());
  date.setHours(17);
  date.setMinutes(9);
  console.log(date);
  return date;
};
ㅁㄴㅇㄴㅁㅇ
console.log("네?", getCorrectDate());

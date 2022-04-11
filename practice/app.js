const express = require("express");
const app = express();

app.set("views", "./views"); // 화면에 보여지는 부분을 처리함 (화면 뷰를 관리할 파일이 저장될 곳을 지정)
app.set("view engine", "ejs"); // html코드를 어떤 엔진으로 해석할껀지? , ejs는 html과 거의 똑같은 엔진이다.

app.get("/", (req, res) => {
  res.render("home/index"); // views는 지정했기땨문
});

app.get("/login", (req, res) => {
  res.render("home/login");
});

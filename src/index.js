import express from "express";
// CommonJS에서는 __dirname 사용 가능
import path from "path";
import bp from "body-parser";

const __dirname = path.resolve();

const app = express();
const port = 3000;

const hasJonsung = (str) => (str.charCodeAt(str.length - 1) - 44032) % 28 !== 0;

app.use("/images", express.static("images"));

app.use(bp.json());
// application/x-www-form-urlencoded 처리
app.use(bp.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/song", (req, res) => {
  const title = req.query.title;
  res.send(title + (hasJonsung(title) ? "을 " : "를 ") + "좋아하시네요!");
});

app.post("/singer", (req, res) => {
  const singer = req.body.singer;
  res.send(
    "가수 " + singer + (hasJonsung(singer) ? "을 " : "를 ") + "좋아하시네요!"
  );
});

app.post("/login", (req, res) => {
  const enc = req.body.passwordEnc;
  res.send("암호화된 패스워드: " + enc);
});

app.listen(port, () => {
  console.log(`서버 실행 (${port})`);
});

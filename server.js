const express = require('express');//express모듈 임포트
const app = express();//express모듈 실행

app.use((req, res, next) => {//크롬기반 브라우저에서 cors정책위반 에러가 발생하지 않도록 작성해야함
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    next();
  });
app.get('/a', async (req, res) => {//a 요청을 받으면
    const result = await main({id: req.query.id});//이렇게 출력
    res.send(result);
});
app.get('/b', async (req, res) => {
  const result = await sub({id: req.query.id});
  res.send(result);
});


const db = require('./db');

async function main(params) {
  try {
    const result = await db.query('SELECT * FROM grade WHERE grade_no = :id', params);
    return result;
  } catch (err) {
    console.log(err);
  }
}
async function sub(params) {
  try {
    const result = await db.query('SELECT grade_no FROM grade WHERE grade_no = :id', params);
    return result;
  } catch (err) {
    console.log(err);
  }
}


app.listen(3000, () => console.log('Example app listening on port 3000!'));//서버에 3000번포트 할당
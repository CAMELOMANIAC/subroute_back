const express = require('express');//express모듈 임포트
const app = express();//express모듈 실행

app.use((req, res, next) => {//크롬기반 브라우저에서 cors정책위반 에러가 발생하지 않도록 작성해야함
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001/');
    next();
  });
app.get('/a', (req, res) => {//'/'를 요청받으면
    res.send('Hello World');//'Hello World'를 응답해준다
});

const oracledb = require('oracledb');
const dbConfig = require('./examples/dbconfig.js');

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM grade WHERE grade_no = :id`,
      [1]
    );

    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();

app.listen(3000, () => console.log('Example app listening on port 3000!'));//서버에 3000번포트 할당
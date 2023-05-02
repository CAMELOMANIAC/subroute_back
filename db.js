const oracledb = require('oracledb');//oracledb 모듈 임포트
const dbConfig = {
  user: 'movie',
  password: '1234',
  connectString: 'localhost:1521/xe'
}

async function query(query, params) {
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      const result = await connection.execute(query, params,
         { outFormat: oracledb.OUT_FORMAT_OBJECT });//이 부분 추가해줘야 json형태{키:값}으로 응답해줌
      return result.rows;
    } catch (err) {
      throw err;
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
  
  module.exports = { query };
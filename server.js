const express = require('express');//express모듈 임포트
const app = express();//express모듈 실행

app.get('/', (req, res) => {//'/'를 요청받으면
    res.send('Hello World');//'Hello World'를 응답해준다
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));//서버에 3000번포트 할당
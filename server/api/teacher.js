import express from 'express';
import bodyParser from 'body-parser';

import util from '../controllers/util.js';

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get(`/all`, async (req, res) => {
  const list = await util.query(`SELECT * FROM teacher ORDER BY class;`);
  res.send(list);
});

router.post('/', async (req, res) => {
  try {
    const result = await util.query(`INSERT INTO teacher(id, name, class) VALUES('${req.body.id}', '${req.body.name}', '${req.body.class}');`);
    res.send({ status: true, result: result });
  }
  catch(e) {
    if(e.code == 'ER_DUP_ENTRY') res.status(400).send({ status: false, code: e.code, msg: `이미 존재하는 교사 코드입니다.` });
    else res.status(400).send({ status: false, code: e.code, msg: `알 수 없는 오류입니다.<br>${e.code}` });
  }
});

  
export default router
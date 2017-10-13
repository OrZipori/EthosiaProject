const express = require('express');
const router = express.Router();
const model = require('../model/model');

/* GET api listing. */
router.post('/register', (req, res) => {
   model.addRow(req.body, res);
});

router.get('/fetch/:id', (req, res) => {
  model.fetchData(req.params.id, res);
});

module.exports = router;

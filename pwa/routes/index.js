const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const app = express();

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
  fs.readFile(path.join(__dirname, '/public/pwa'), (error, data) => {
    if (error) {
      res('error!!!');
    } else {
      res(data);
    }
  });
});

app.use(express.static(path.join(__dirname, '/public')));

module.exports = router;

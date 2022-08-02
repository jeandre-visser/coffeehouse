const express = require('express');
const router  = express.Router();


// Views the admin page with all the orders from users
module.exports = function(db) {
  router.get('/admin', (req, res) => {
    db.query(`SELECT * FROM admins;`)
      .then(data => {
        const admins = data.rows;
        res.json({admins});
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      });
  });

  router.get('/admin/:id', (req, res) => {
    db.query(`SELECT * FROM admins WHERE admins.id = $1`, [req.params.id])
    .then(data => {
      const admin = data.rows;
      res.json({admin})
    })
    .catch(err => {
      res.status(404).json({error: err.message})
    });
  });

  router.post()

}

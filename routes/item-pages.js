const express = require('express');
<<<<<<< HEAD
<<<<<<< HEAD
const { getItemsByCategory } = require('../database');
const router  = express.Router();



module.exports = (db) => {
  router.get("/:category", (req, res) => {
    db.query(`SELECT * FROM items WHERE category = $1`, [req.params.category])
=======
=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
const router  = express.Router();

module.exports = (db) => {
  router.get("/:category", (req, res) => {
    db.query(`SELECT * FROM items WHERE category = $1;`, [req.params.category])
<<<<<<< HEAD
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
      .then(data => {
        const items = data.rows;
        res.json({ items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
  return router;
};

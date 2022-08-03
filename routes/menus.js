const express = require('express');
const router  = express.Router();

module.exports = (db) => {
<<<<<<< HEAD
  // Menu page for either hot drinks, cold drinks, or baked goods
  router.get('/items/:category', (req, res) => {
    db.query(
      (`SELECT * FROM items WHERE category = $1`, req.params.category)
    )
    .then(result => {
      const items = result.rows;
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    })
  }
)}
=======
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM items;`)
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
  return router;
};
>>>>>>> master

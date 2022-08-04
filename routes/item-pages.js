const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:category", (req, res) => {
    db.query(`SELECT * FROM items WHERE category = $1;`, [req.params.category])
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

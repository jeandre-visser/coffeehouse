const express = require('express');
const router  = express.Router();

module.exports = function(db) {
  // Menu page for either hot drinks, cold drinks, or baked goods
  router.get('/', (req, res) => {
    db.query(
      `SELECT * FROM items;`
    )
    .then(result => {
      return result.rows;
    })
    .then(result => {
      result.render('menu-index.ejs', {itemArr: result, ...requestAnimationFrame.defaultVars});
    })
    .catch(err => err.message)
  })

  // When an item is clicked, it displays more options for the item
  router.get('/:id', (req, res) => {
    const index = req.params.id - 1;
    db.query(
      `SELECT * FROM items;`
    )
    .then(result => {
      return result.rows;
    })
    .then(result => {
      res.render('item-menu.ejs', {itemArr: result[index], ...req.defaultVars});
    })
    .catch(err => err.message)
  })
}

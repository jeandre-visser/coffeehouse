const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
      SELECT orders.id, orders.user_id, order_timestamp, ordered_items.item_id, ordered_items.quantity
      FROM orders
      JOIN ordered_items ON orders.id = ordered_items.order_id;`)
      .then(data => {
        const orders = data.rows;
        res.json({orders});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    // console.log('req.body:',req.body)
    // if(req) {
    //   db.query(`INSERT items $1 RETURNING id`)
    //   .then(()db.query(`INSERT orders $1 `)
    //     })
    // }
    res.sendStatus(201);
  })
  return router;
};

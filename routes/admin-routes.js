const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.body)
    db.query(`
    SELECT users.name, users.phone, orders.id as order_id, order_timestamp,
    order_ready, items.name as item_name, ordered_items.quantity, sum(ordered_items.quantity * items.price) as price
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN ordered_items ON ordered_items.order_id = orders.id
    JOIN items ON ordered_items.item_id = items.id
    GROUP BY users.name, users.phone, orders.id, items.name, ordered_items.quantity
    ORDER BY order_timestamp DESC;`
    )
      .then(data => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    console.log('req.body', req.body)
    const name = req.body.name;
    const phoneNum = req.body.phone;

    console.log(name);
    console.log(phoneNum);

    db.query(`
      INSERT INTO users (name, phone)
      VALUES ($1, $2)
      RETURNING id;`, [name, phoneNum])
    .then((result) => {
      const userId = result.rows[0].id
      db.query(`
      INSERT INTO orders (user_id, admin_id)
      VALUES ($1, 1)
      RETURNING id;`, [userId])
    })
    .then((result) => {
      console.log('result',result)
      db.query(`
      INSERT INTO ordered_items (order_id, item_id, quantity)
      VALUES ($1, $2, $3)`, [result.rows[0].id, item, quantity])
    })
    .catch(err => {
      res
        .json({ error: err.message });
    });

    res.sendStatus(201);
  })
  return router;
};

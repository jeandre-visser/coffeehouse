require("dotenv").config();
const express = require('express');
const router = express.Router();
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.body)
    db.query(`
    SELECT users.name, users.phone, orders.id as order_id, order_timestamp::timestamp(0),
    order_ready, items.name as item_name, ordered_items.quantity, sum(ordered_items.quantity * items.price) as price
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN ordered_items ON ordered_items.order_id = orders.id
    JOIN items ON ordered_items.item_id = items.id
    GROUP BY users.name, users.phone, orders.id, items.name, ordered_items.quantity
    ORDER BY order_timestamp DESC
    LIMIT 10;`
    )
      .then(data => {

        const orders = data.rows;
        console.log(orders)
        const templateVars = {
          orders
        }
        res.render("admin", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      console.log(res)
  });

  router.post('/', (req, res) => {
    console.log('req.body', req.body)
    const orderId = req.body.orderId;
    const orderPhone = req.body.orderPhone

    // Update order_ready to true
    db.query(`
      UPDATE orders
      SET order_ready = TRUE
      WHERE id = $1;
      `, [orderId]
      )

    // twilio
    client.messages.create({
      body: `Your food is ready for pick-up!`,
      from: '+18252503816',
      to: `+${orderPhone}`
    }).then((message) => console.log(message.sid));

    res.sendStatus(201);
  })
  return router;
};

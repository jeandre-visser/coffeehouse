const express = require('express');
const router = express.Router();
const { textMessage } = require('../helper_functions/textMessage')

const databaseFunctions = require('../database');

module.exports = (db) => {

  router.post("/order", (req, res) => {

    const name = req.body.customer_name;
    const phone = req.body.customer_phone;
    const admin_id = 1

    db.query(`
      INSERT INTO users (name, phone)
      VALUES ($1, $2)
      RETURNING id;`, [name, phone])
      .then(result => {
        console.log('result', result.rows[0].id)
        return db.query(`
          INSERT INTO orders (user_id, admin_id)
          VALUES ($1, $2)
          RETURNING id;
          `, [result.rows[0].id, admin_id])
      })
      .then(result => {
        console.log('result', result.rows[0].id)
        return db.query(`
        UPDATE orders
        SET order_pending = TRUE
        WHERE id = $1
        RETURNING id;
          `, [result.rows[0].id])
      })
      .then((data) => {
        const order_items = req.body.order_items;
        order_items.forEach(item => {
          db.query(`
            INSERT INTO ordered_items (item_id, order_id, quantity)
            VALUES ($1, $2, $3);
            `, [item.id, data.rows[0].id, item.quantity])
        })
        const response = {
          order: data.rows[0].id,
          name: req.body.customer_name,
          phone: req.body.customer_phone,
          coffeeItems: order_items,
          timeOfOrder: new Date(),
        }

        // Twilio function
        const accountSid = 'AC382cb58fd2b3eaf7f9f1929fb1467330';
        const authToken = '8a1f63b1434a3b3fd32ef4adc3f25f20';
        const client = require('twilio')(accountSid, authToken);
        client.messages.create({
          body: `Thank you, ${response.name}. Your order at Coffee House has been placed and you'll receive another text message once your order is ready!`,
          from: '+18252503816',
          to: `+${phone}`
        }).then((message) => console.log(message.sid));

        res.send(response);

      }).catch(err => {
        console.log("err", err);
        res
          .status(500)
          .json({ error: err.message });
      });e

  })

  router.get("/order/:id", (req, res) => {
    const { id } = req.params;
    const { name, phone, coffeeItems, timeOfOrder } = req.query;
    const templateVars = {
      id,
      name,
      phone,
      coffeeItems: JSON.parse(coffeeItems),
      timeOfOrder

    }
    res.render("summary", templateVars);

  })
  return router;
};

require("dotenv").config();
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);

const express = require('express');
const router = express.Router();
// const { textMessage } = require('../helper_functions/textMessage')
// const databaseFunctions = require('../database');

module.exports = (db) => {

  router.post("/order", (req, res) => {

    const name = req.body.customer_name;
    const phone = req.body.customer_phone;
    const admin_id = 1

    // Insert user into db
    db.query(`
      INSERT INTO users (name, phone)
      VALUES ($1, $2)
      RETURNING id;`, [name, phone])
      .then(result => {
        // Insert order into db
        return db.query(`
          INSERT INTO orders (user_id, admin_id)
          VALUES ($1, $2)
          RETURNING id;
          `, [result.rows[0].id, admin_id])
      })
      // Update order_pending to true
      .then(result => {
        return db.query(`
        UPDATE orders
        SET order_pending = TRUE
        WHERE id = $1
        RETURNING id;
          `, [result.rows[0].id])
      })
      // Insert items into db
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

        client.messages.create({
          body: `Thank you, ${response.name}. Your order has been placed and you'll receive a confirmation text soon.`,
          from: '+18252503816',
          to: `+${phone}`
        }).then((message) => console.log(message.sid));

        res.send(response);

      }).catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

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

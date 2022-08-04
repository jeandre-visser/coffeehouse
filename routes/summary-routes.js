const express = require('express');
const router = express.Router();
const { textMessage } = require('../helper_functions/textMessage')

const databaseFunctions = require('../database');

module.exports = (db) => {

  // Adding summary page
  // router.get("/order/:id", (req, res) => {
  //   databaseFunctions.getAllOrders().then(data => {
  //     // console.log("data", data);
  //     const name = data[0].name;
  //     const phone = data[0].phone;
  //     const timeOfOrder = data[0].order_timestamp;
  //     const coffeeItems = data[0].coffee_items;

  //     console.log("name", name);
  //     console.log("phone", phone);
  //     console.log("time", timeOfOrder);
  //     // console.log(`Order: ${quantity} cups of ${items} ordered at ${timeOfOrder}.`)

  //     const templateVars = {
  //       name: name,
  //       phone: phone,
  //       timeOfOrder,
  //       coffeeItems,
  //     };

  //     res.render("summary", templateVars);
  //   });

  // });

  router.post("/order", (req, res) => {
    /*
    Psuedo
    1. add order
    call addToOrderedItems
    returns ID which will take of 2
    // const id = from create order
    2. get the order id from the create order
    3. render on the summary page
    */
    //1.
    const name = req.body.customer_name;
    const phone = req.body.customer_phone;

    const user_id = 1
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
          body: `Thank you, ${response.name}. Your order has been placed and you'll receive a confirmation text soon.`,
          from: '+18252503816',
          to: `+${phone}`
        }).then((message) => console.log(message.sid));

        res.send(response);

      }).catch(err => {
        console.log("err", err);
        res
          .status(500)
          .json({ error: err.message });
      });

    //  databaseFunctions.addToOrderedItems().then(data => {
    //   console.log("data2", data);
    //  })

    //2.
    // const id = from create order


    // 3. Render on the page

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

/*
For the Summary page:
After they click "Place Order" redirect to this page
---
Thank You user.name or user_id
=> grab from createUser
=> grab from createOrder
---
Grab their total order: Grab from getAllOrders
  => order.id
  => SUM (price * quantity) from get
  => Total Time: totalPrepTime
---
Return Home / Order Again
=> Currently have a function returnHome()
Is there a better method that using returnHome()?
---
*/

<<<<<<< HEAD
const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.body)
    db.query(`
      SELECT orders.id, orders.user_id, order_timestamp, ordered_items.item_id, ordered_items.quantity
      FROM orders
      JOIN ordered_items ON orders.id = ordered_items.order_id;`)
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
=======
// const express = require('express');
// const router  = express.Router();


// module.exports = (db, database) => {
//   router.get("/", (req, res) => {
//     db.query()
//       .then(data => {
//         const orders = data.rows;
//         res.json({orders});
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   router.post('/admin', (req, res) => {
//     if(req.session.cart) {
//       database.createUser(req.body.name, req.body.phone)
//       // admin_id is hard coded as 1
//         .then(user => database.createOrder(user.id, 1, new Date(), true, false))
//         .then(order => database.addToOrderedItems(order.id, req.session.cart))
//         .then(order => database.getOrderWithId(order.order_id))
//         .then(order => {
//           req.session.cart = null;
//           textMessage(`Hello ${order.admin_name}, a new order has been placed!.`, `+1${order.admin_phone}`, `+1${order.user_phone}`)
//           res.redirect(`/summary/${order.id}`)
//         })
//     }
//   })
//   return router;
// };
>>>>>>> master

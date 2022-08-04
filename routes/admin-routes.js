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

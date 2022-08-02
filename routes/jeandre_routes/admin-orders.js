const express = require('express');
const router  = express.Router();
const { textMessage } = require('../../helper_functions/textMessage');
const moment = require('moment');

module.exports = function(database) {
  // Retrieve all the orders with its details and render the views/admin/index with the orders data
  router.get('/', (req, res) => {
    database.getAllOrders(6)
    .then(orders => {
      orders.forEach((order, i) => {
        orders[i].order_timestamp = moment(order.order_timestamp).format('ddd, MMMM Do YYYY, h:mm:ss a');
      })
      res.render('admins/index', {orders, ...req.defaultVars});
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    });
  });



  return router;
}

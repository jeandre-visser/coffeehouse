const { text } = require('express');
const express = require('express');
const { DatabaseError } = require('pg');
const router = express.Router();
const { textMessage } = require('../helper_functions/textMessage');

module.exports = (db, database) => {
  router.get('/', (req, res) => {
    console.log('There is an item in the cart', req.session.cart);
    if (req.session.cart) {
      const cart = req.session.cart;
      let queryParams = [];
      let queryString = `SELECT * FROM items`;
      for (let item of cart) {
        queryParams.push(item.items_id);
        queryString += `${(queryParams.length > 1 ? ' OR' : 'WHERE')} id = $${queryParams.length}}`;
      }
      queryString += ';'
      console.log(queryString);
      console.log(queryParams);
      db.query(queryString, queryParams)
      .then(result => {
        console.log('result.rows', result.rows)
        const itemArr = result.rows.map((arr, i) => {
          return {
            ...result.rows[i],
            quantity: cart[i].quantity,
            total_price: cart[i].quantity * Number(result.rows[i].price.replace('$', ''))
          }
        });
        let priceSum = 0;
        for (let item of itemArr) {
          priceSum += item.total_price
        }
        console.log('itemArr', itemArr);
        res.render('cart/cart', {itemArr, priceSum, ...req.defaultVars});
      })
      .catch(err => {
        console.log('User null', err.message)
      });
    } else {
      res.render('cart/cart', {itemArr: [], priceSum: null, ...req.defaultVars});
    }
  });

  router.post('/create', (req, res) => {
    if(req.session.cart) {
      database.createUser(req.body.name, req.body.phone)
      // admin_id is hard coded as 1
        .then(user => database.createOrder(user.id, 1, new Date(), true, false))
        .then(order => database.addToOrderedItems(order.id, req.session.cart))
        .then(order => database.getOrderWithId(order.order_id))
        .then(order => {
          req.session.cart = null;
          textMessage(`Hello ${order.admin_name}, a new order has been placed!.`, `+1{order.admin_phone}`, `+1{order.user_phone}`)
          res.redirect(`/summary/${order.id}`)
        })
    }
  })
  return router;
}





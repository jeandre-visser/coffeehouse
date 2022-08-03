
// const { textMessage } = require('../helper_functions/textMessage');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
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

  router.post('/', function(req, res){
    console.log(req)

  })

  return router;
};

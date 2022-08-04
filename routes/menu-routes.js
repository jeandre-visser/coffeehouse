const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/addcart", (req, res) => {
    res.render("index");
  });

<<<<<<< HEAD
=======



>>>>>>> master
  return router
}

/*
From the menu items page user selects and items go to the cart
once they click "add to order"

Cart:
=> stores order items or list items selected
=> calculates the prices
  => const defaultPrice = price
  => const totalPrice = defaultPrice * quantity + cupSize
  => "getOrderWithID"
=> can remove specific item
  => maybe something similar to "$('.dynamic').empty();"
     from Tweeter ajax call from Line 68 - Line 77
     or just like the delete button from TinyApp
=> enter phonenumber associated with account to placeorder
  => maybe include validation error
     "Must include phone# before placing order"
---
=> Clicking place order button
  => redirect to "/summary"
  => send SMS to user and client (use textMessage Function)
    => Restaurant SMS: "User has placed an order"
    => User SMS: "Coffehouse has recieved order Estimated delivery time ..."

*/

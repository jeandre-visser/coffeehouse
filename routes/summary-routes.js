const express = require('express');
const router  = express.Router();

const databaseFunctions = require('../database');


// const textMessage = require('../helper_functions/textMessage');
// console.log("textMessage", textMessage);

module.exports = (db) => {

  // Adding summary page
  router.get("/:id", (req, res) => {
    console.log("check1");
    databaseFunctions.getAllOrders().then(data => {
      console.log("data", data)
      console.log("data1", data[0].phone);

    })

    res.render("summary");
  });








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

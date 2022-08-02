const express = require('express');
const router  = express.Router();

const databaseFunctions = require('../database');

module.exports = (db) => {

  // Adding summary page
  router.get("/:id", (req, res) => {
    databaseFunctions.getAllOrders().then(data => {
      const name = data[0].name;
      const phone = data[0].phone;
      const timeOfOrder = data[0].order_timestamp;
      const coffeeItems = data[0].coffee_items;
      const items = coffeeItems[0].item_name;
      const quantity = coffeeItems[0].quantity;

      console.log("name", name);
      console.log("phone", phone);
      console.log("time", timeOfOrder);
      console.log(`Order: ${quantity} cups of ${items} ordered at ${timeOfOrder}.`)

    });

    // Need to grab name outside of the function
    // And use it for TemplateVars to show in
    /*
    const templateVars = {
      name: data[0].name,
      phone: data[0].phone
    };

    etc ...
    */

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

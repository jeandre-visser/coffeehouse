const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Adding summary page
  router.get("/summary", (req, res) => {
    res.render("summary");
  });

  return router;
};

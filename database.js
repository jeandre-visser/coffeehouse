const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const pool = new Pool(dbParams);

// Get all orders in database
/**
 * @param {Number} limit The number of results to return.
 * @return {Promise<{}>} A promise to the order.
 */

const getAllOrders = function(limit = 6) {
  const queryString = `
    SELECT orders.id,
      order_timestamp,
      users.name,
      users.phone,
      order_pending,
      order_ready,
      json.agg(json_build_object('item_name', items.name, 'quantity', ordered_items.quantity)) as coffee_items
    FROM orders
    JOIN users ON users.id = user_id
    JOIN ordered_items ON order_id = orders.id
    JOIN items ON items.id = item_id
    GROUP BY orders.id, users.name, users.phone
    ORDER BY order_timestamp DESC
    LIMIT $1;
  `;
  return pool
    .query(queryString, [limit])
    .then(result => result.rows)
    .catch(err => err.message)
};

exports.getAllOrders = getAllOrders;


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

/**
 * Get one order from db with it's id
 * @param {string} id The id of the order.
 * @return {Promise<{}>} A promise to the order.
 */

const getOrderWithId = function(id) {
  const queryString = `
    SELECT orders.*,
      users.name as user_name,
      users.phone as user_phone_number,
      admins.name as admin_name,
      admin.phone as admin_phone_number,
      json_agg(json_build_object('item_name', items.name, 'quantity', ordered_items.quantity, 'price', (price * quantity), 'photo_url', photo_url)) as coffee_items,
      SUM(price * quantity) as total
    FROM orders
    JOIN admins ON admins.id = admin_id
    JOIN users ON users.id = user_id
    JOIN ordered_items ON order_id = orders.id
    JOIN items ON items.id = item_id
    WHERE orders.id = $1
    GROUP BY orders.id, users.name, users.phone, admins.name, admins.phone;
  `;

  return pool
    .query(queryString, [id])
    .then(result => result.rows[0])
    .catch(err => err.message)
};
exports.getOrderWithId = getOrderWithId;

// Create user
const createUser = function(name, phone) {
  const queryString = `
    INSERT INTO users (name, phone)
    VALUES ($1, $2)
    RETURNING id;
  `;

  return pool
  .query(queryString, [name, phone])
  .then(result => result.rows[0])
  .catch(err => err.message)
};
exports.createUser = createUser;

// Create order
const createOrder = function(userId, adminId) {
  const queryString = `
    INSERT INTO orders (user_id, admin_id)
    VALUES ($1, $1)
    RETURNING id;
  `;

  return pool
  .query(queryString, [userId, adminId])
  .then(result => result.rows[0])
  .catch(err => err.message)
};
exports.createOrder = createOrder;

/**
 * Set order status to pending
 * @param {string} id The id of the order.
 * @return {Promise<{}>} A promise to the order.
 */

const pendingOrder = function(id) {
  const queryString = `
  UPDATE orders
  SET order_pending = TRUE
  WHERE orders.id = $1;
  `;

  return pool
  .query(queryString, [id])
  .then(result => result.rows)
  .catch(err => err.message)
};
exports.pendingOrder = pendingOrder;


/**
 * Set order status to ready
 * @param {string} id The id of the order.
 * @return {Promise<{}>} A promise to the order.
 */

const orderReady = function(id) {
  const queryString = `
    UPDATE orders
    SET order_ready = TRUE
    WHERE id = $1;
  `;

  return pool
  .query(queryString, [id])
  .then(result => result.rows)
  .catch(err => err.message)
}
exports.orderReady = orderReady;

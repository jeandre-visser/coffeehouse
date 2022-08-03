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
      order_confirmed,
      order_ready,
      json.agg(json_build_object('item_name', items.name, 'quantity', quantity)) as coffee_items
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


/**
 * Add new user to database
 * @param {{name: string, phone: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// Create user
const createUser = function(user) {
  const queryString = `
    INSERT INTO users (name, phone)
    VALUES ($1, $2)
    RETURNING id;
  `;

  return pool
  .query(queryString, [user.name, user.phone])
  .then(result => result.rows[0])
  .catch(err => err.message)
};
exports.createUser = createUser;

/**
 * Add new order to database
 * @param {{}} order An object containing all of the order details.
 * @return {Promise<{}>} A promise to the order.
 */
const createOrder = function(user_id, admin_id) {
  const queryString = `
    INSERT INTO orders (user_id, admin_id)
    VALUES ($1, $2)
    RETURNING id;
  `;
  return pool
  .query(queryString, [user_id, admin_id])
  .then(result => result.rows[0])
  .catch(err => err.message)
};
exports.createOrder = createOrder;

/**
 * Set order status to confirmed
 * @param {string} id The id of the order.
 * @return {Promise<{}>} A promise to the order.
 */

const confirmedOrder = function(id) {
  const queryString = `
  UPDATE orders
  SET order_confirmed = TRUE
  WHERE orders.id = $1
  RETURNING *;
  `;

  return pool
  .query(queryString, [id])
  .then(result => result.rows)
  .catch(err => err.message)
};
exports.confirmedOrder = confirmedOrder;


/**
 * Set order status to ready
 * @param {string} id The id of the order.
 * @return {Promise<{}>} A promise to the order.
 */

const orderReady = function(id) {
  const queryString = `
    UPDATE orders
    SET order_ready = TRUE
    WHERE id = $1
    RETURNING *;
  `;

  return pool
  .query(queryString, [id])
  .then(result => result.rows)
  .catch(err => err.message)
}
exports.orderReady = orderReady;

/**
 * Get all confirmed orders from database for one user by phone
 * @param {string} phone The phone number of the order.
 * @return {Promise<{}>} A promise to the order.
 */

const getConfirmedOrder = function(phone) {
  const queryString = `
  SELECT orders.id as order_id, users.phone
  FROM orders
  JOIN users ON orders.user_id = users.id
  JOIN ordered_items ON ordered_items.order_id = orders.id
  JOIN cup_sizes ON cup_sizes.id = ordered_items.size_id
  JOIN items ON items.id = ordered_items.item_id
  WHERE orders.order_confirmed = TRUE AND orders.order_ready = FALSE AND users.phone = $1
  GROUP BY users.phone, orders.id
  ORDER BY orders.id DESC;
  `;

  return pool
  .query(queryString, [phone])
  .then(result => result.rows[0])
  .catch(err => err.message)
};
exports.getConfirmedOrder = getConfirmedOrder;

// REMOVED PREP TIME FROM TABLE
/**
 * Get the total prep time of the orders in progress by phone
 * @param {string} phone The phone number of the user
 * @return {Promise<{}>} A promise to the orders.
 */

// const totalPrepTime = function(phone) {
//   const queryString = `
//   SELECT SUM(total.order_prep_time)
//   FROM (SELECT orders.id as order_id, ordered_items.quantity, items.name, items.prep_time, items.prep_time * ordered_items.quantity as order_prep_time
//   FROM orders
//   JOIN users ON orders.user_id = users.id
//   JOIN ordered_items ON ordered_items.order_id = orders.id
//   JOIN items ON items.id = ordered_items.item_id
//   WHERE orders.order_confirmed = TRUE AND orders.order_ready = FALSE
//   GROUP BY orders.id, ordered_items.quantity, items.prep_time, items.name) as total;
//   `;

//   return pool
//   .query(queryString, [phone])
//   .then(result => result.rows[0])
//   .catch(err => err.message)
// };
// exports.totalPrepTime = totalPrepTime;



/**
 * Add items to cart
 * @param {{}} orderId An object containing the items in the cart with the order id
 * @return {Promise<{}>} A promise to the orders.
 */
const addToOrderedItems = function(orderId, cart) {
  const queryString = `
  INSERT INTO ordered_items (order_id, item_id, quantity)
  VALUES ($1, $2, $3)
  RETURNING order_id;
  `;

  let orderedItems = [];
  cart.forEach((item) => {
    orderedItems.push(
      pool.query(queryString, [item.item_id, orderId, item.quantity])
    )
  })
  return Promise.all(orderedItems)
    .then(result => result[0].rows[0])
    .catch(err => err.message)
};
exports.addToOrderedItems = addToOrderedItems;

// Get items by category
const getItemsByCategory = category => {
  return pool
    .query (`SELECT * FROM items WHERE category = $1`, req.params.category)
    .then(res => {
      return res.rows;
    })
}

exports.getItemsByCategory = getItemsByCategory;

console.log(getItemsByCategory('hot')
  .then(items => {
    console.log(items)
    return items
  })
  .finally(() => pool.end())
);

exports.getItemsByCategory = getItemsByCategory


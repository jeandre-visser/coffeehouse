-- Get phone number for orders that are ready to be picked up
SELECT orders.id as order_id, users.phone
FROM orders
JOIN users ON orders.user_id = users.id
WHERE orders.order_pending = TRUE and orders.order_ready = TRUE
GROUP BY orders.id, users.phone;

SELECT orders.id as order_id, users.phone
FROM orders
JOIN users ON orders.user_id = users.id
JOIN ordered_items ON ordered_items.order_id = orders.id
JOIN items ON items.id = ordered_items.item_id
WHERE orders.order_pending = TRUE AND orders.order_ready = FALSE
GROUP BY users.phone, orders.id;

-- Get the prep time for each item in each order that are pending.
SELECT orders.id as order_id, ordered_items.quantity, items.name, items.prep_time, items.prep_time * ordered_items.quantity as order_prep_time
FROM orders
JOIN users ON orders.user_id = users.id
JOIN ordered_items ON ordered_items.order_id = orders.id
JOIN items ON items.id = ordered_items.item_id
WHERE orders.order_pending = TRUE AND orders.order_ready = FALSE
GROUP BY orders.id, ordered_items.quantity, items.prep_time, items.name;

-- Also get the total prep time for all the orders in the database that are pending
SELECT SUM(total.order_prep_time)
  FROM (SELECT orders.id as order_id, ordered_items.quantity, items.name, items.prep_time, items.prep_time * ordered_items.quantity as order_prep_time
  FROM orders
  JOIN users ON orders.user_id = users.id
  JOIN ordered_items ON ordered_items.order_id = orders.id
  JOIN items ON items.id = ordered_items.item_id
  WHERE orders.order_pending = TRUE AND orders.order_ready = FALSE
  GROUP BY orders.id, ordered_items.quantity, items.prep_time, items.name;
) as total;

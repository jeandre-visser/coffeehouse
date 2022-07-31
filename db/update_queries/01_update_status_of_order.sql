--update order_pending from true to false so order_ready is true
UPDATE orders
SET order_pending = FALSE, order_ready = TRUE
WHERE orders.id = 1
RETURNING *;

--Update order_pending from false to true
UPDATE orders
SET order_pending = TRUE
WHERE orders.id = 1
RETURNING *;

--Update order_ready from true to false
UPDATE orders
SET order_ready = FALSE
WHERE orders.id = 1
RETURNING *;

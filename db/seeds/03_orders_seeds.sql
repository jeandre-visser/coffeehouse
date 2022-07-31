INSERT INTO orders (user_id, admin_id, order_timestamp, order_pending, order_ready)
VALUES (1, 1, NOW()::timestamp, TRUE, FALSE);

// Creates an order in table
const createOrder = (orderData) => {
  return `
  <section id="orders-index">
  <div class="orders-table-container">
    <!-- Table of orders -->
    <table class="orders-table">

      <!-- Table header -->
      <thead class="table-header">
        <tr class="table-row">
          <th>Customer</th>
          <th>Phone Number</th>
          <th>Order</th>
          <th>Order Date</th>
          <th>Confirmed</th>
          <th>Order Ready</th>
        </tr>
      </thead>

      <!--Table contents-->
      <tbody class="table-contents">
        <tr class="table-row">
          <td>${orderData.users.name}</td>
          <td>${orderData.users.phone}</td>
          <td>${orderData.items.name} x ${orderData.ordered_items.quantity}</td>
          <td>${orderData.orders.order_timestamp}</td>
          <td>${orderData.orders.order_confirmed}</td>
          <td>${orderData.orders.order_ready}</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
`;

}

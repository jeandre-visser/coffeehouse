// Creates an item div
const addOrder = (order) => {
  return `
    <div class='order' data-id='${order.id}'>
      <div class='summary'>
        <h1>${item.name}</h1>
        <div>${item.description}</div>
        <div>$${item.price}</div>
      </div>
      <div class='order-button'>
        <div>
          <label for="quantity">Quantity:&nbsp&nbsp</label>
          <input type="number" class='quantity${item.id}' name="quantity" min="1" max="99" >
        </div>
      </div>
    `
}

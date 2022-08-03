// Creates an item div
const createItem = (item) => {
  return `
    <div class='item' data-id='${item.id}'>
      <div class='item-picture'>
        <img src="${item.photo_url}">
      </div>
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
        <button class="add-to-order" type="submit" value="${item.id}">Add to Order: $${item.price}</button>
      </div>
    `
}

// Appends item
const addItem = item => {
  $('.menu').append(item);
}

// Clears items
const clearItems = () => {
  $('.menu').empty();
}

// Clears then adds all menu items
const addItems = (items) => {
  clearItems();

  // Appends all items in array
  for (const itemId in items) {
    const item = items[itemId];
    const newItem = createItem(item);
    addItem(newItem);
  }

  // Add to order button event
  $('.add-to-order').click(function(){
    const itemId = $(this).val();
    const quantity = $(`.quantity${itemId}`).val();
    const template = `<li class='.li${itemId}'>${itemId} x ${quantity}</li>`
    $('.cart-list').append(template);

  });
}


// const loadItems = () => {
//   $.ajax({
//     method: 'GET',
//     url: '/items',
//     success: (responseJSON) => {
//       addItems(responseJSON);
//     }
//   });
// }

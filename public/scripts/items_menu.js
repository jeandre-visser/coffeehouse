// Creates an item div
const createItem = (item, itemIndex) => {
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
          <input type="number" class='quantity${item.id}' data-itemid='${item.id}' name="quantity" min="1" max="99" >
        </div>
        <button class="add-to-order" data-id='${item.id}' data-name="${item.name}" data-price="${item.price}">Add to Order: $${item.price}</button>
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
  for (const itemIndex in items) {
    const item = items[itemIndex];
    const newItem = createItem(item, itemIndex);
    addItem(newItem);
  }

  // Add to order button event
  $('.add-to-order').click(function () {
    const itemId = $(this).attr("data-id");
    const quantity = $(`.quantity${itemId}`).val();
    const name = $(this).attr("data-name");
    const itemPrice = $(this).attr("data-price");
    const template = `<li class='.li' data-id="${itemId}" data-name="${name}" data-quantity="${quantity}">${name} x ${quantity}</li>`

    $('.cart-list').append(template);
    let price = Number($('.total-price').text());
    price += itemPrice * quantity;
    $('.total-price').text(`${price}`)

  });
}

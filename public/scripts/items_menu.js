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

<<<<<<< HEAD
<<<<<<< HEAD


=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
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

<<<<<<< HEAD
<<<<<<< HEAD
// Test Data
// let testDB = [{
//   name: 'Coffee',
//   type: 'drink',
//   description: 'A hot cup of bean water',
//   price: 100,
//   photo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
// },
// {
//   name: 'Espresso',
//   type: 'drink',
//   description: 'A hot cup of strong bean water',
//   price: 200,
//   photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeIUUNTss4cG9_z36HD1p8zydMeqyaWXmqdA&usqp=CAU"
// },
// {
//   name: 'Donut',
//   type: 'baked',
//   description: 'Fried sugar dough disc',
//   price: 300,
//   photo_url: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80"
// },
// {
//   name: 'Croissant',
//   type: 'baked',
//   description: 'Baked butter dough moon',
//   price: 500,
//   photo_url: "https://www.corman.pro/uploads/cache/400x400/uploads/recip/recipe/2283/dsc4113.png"
// }]
=======
=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b

// const loadItems = () => {
//   $.ajax({
//     method: 'GET',
//     url: '/items',
//     success: (responseJSON) => {
//       addItems(responseJSON);
//     }
//   });
// }
<<<<<<< HEAD
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b

// Creates an item div
const createItem = (item, itemId) => {
  // if (item.type === 'baked') {
  //   return `
  //     <div class='baked-item' data-id='${itemId}>
  //       <img src="${item.photo_url}">
  //       <span>${item.name}</span>
  //     </div>
  //     `
  // }

  return `
    <div class='drink-item' data-id='${itemId}'>
      <img src="${item.photo_url}">
      <span>${item.name}</span>
    </div>
    `
}

// Get items by category
// const getItemsByCategory = category => {
//   return pool
//     .query (`SELECT * FROM items WHERE category = $1`, [category])
//     .then(res => {
//       return res.rows;
//     })
// }

// Appends item
const addItem = item => {
  $('.menu').append(item);
}

// Clears items
const clearItems = () => {
  $('.menu').empty();
}

// Clears then adds all menu items
const addItems = (items, category) => {
  clearItems();

  // Appends all items in array
  for (const itemId in items) {
    const item = items[itemId];
    const newItem = createItem(item, itemId);
    addItem(newItem);
  }

  // Brings up options-menu
  $('.drink-item').on('click', (event) => {
    let id = $(event.delegateTarget).data().id;
    clearItems();
    const options = optionsMenu(items, id)
    addItem(options);
    return;
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

// Test Data
let testDB = [{
  name: 'Coffee',
  type: 'drink',
  description: 'A hot cup of bean water',
  price: 100,
  photo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
},
{
  name: 'Espresso',
  type: 'drink',
  description: 'A hot cup of strong bean water',
  price: 200,
  photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeIUUNTss4cG9_z36HD1p8zydMeqyaWXmqdA&usqp=CAU"
},
{
  name: 'Donut',
  type: 'baked',
  description: 'Fried sugar dough disc',
  price: 300,
  photo_url: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80"
},
{
  name: 'Croissant',
  type: 'baked',
  description: 'Baked butter dough moon',
  price: 500,
  photo_url: "https://www.corman.pro/uploads/cache/400x400/uploads/recip/recipe/2283/dsc4113.png"
}]

// Creates an item div
const createItem = (item) => {
  if (item.type === 'baked') {
    return `
      <div class='baked-item'>
        <img src="${item.photo_url}">
        <span>${item.name}</span>
      </div>
      `
  }

  return `
    <div class='drink-item'>
      <img src="${item.photo_url}">
      <span>${item.name}</span>
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
  for (const itemId in items) {
    const item = items[itemId];
    const newItem = createItem(item);
    addItem(newItem);
  }
}

// Test Data
let testDB = [{
  name: 'coffee',
  type: 'drink',
  photo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
},
{
  name: 'espresso',
  type: 'drink',
  photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeIUUNTss4cG9_z36HD1p8zydMeqyaWXmqdA&usqp=CAU"
},
{
  name: 'donut',
  type: 'baked',
  photo_url: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80"
},
{
  name: 'donut',
  type: 'baked',
  photo_url: "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80"
}]


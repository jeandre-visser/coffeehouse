$(() => {

  const $itemsMenu = $(`main`);
  window.$itemsMenu = $itemsMenu;

  window.itemsMenu = {};

  const addItem = item => {
    $itemsMenu.append(item);
  }
  const clearItems = () => {
    $itemsMenu.empty();
  }

  window.itemsMenu.clearItems = clearItems;

  const addItems = (properties, isReservation = false) => {
    clearListings();
    for (const itemId in items) {
      const item = items[itemId];
      const newItem = item.createItem(item, type);
      addItem(newItem);
    }
  }
  window.itemsMenu.addItem = addItems;

});

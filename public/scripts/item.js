$(() => {
  window.item = {};

  function createItem(item, type) {
    if (type === baked) {
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

  window.item.createItem = createItem;

});

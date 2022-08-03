const optionsMenu = (items, itemId) => {
  return ` <section class="options-menu">
  <div class="item-summary">
    <img src='${items[itemId].photo_url}'>
    <div class='summary'>
      <h1>${items[itemId].name}</h1>
      <div>${items[itemId].description}</div>
      <div>$${items[itemId].price}</div>
    </div>
  </div>
  <form class="order" method="post" action="/cart">
    <div>
      <label for="quantity">Quantity</label>
      <input type="number" name="quantity" min="1" max="99">
    </div>
    <div>
      <button type="submit">Add to Order: ${items[itemId].price}</button>
    </div>
  </form>
</section>
`
}

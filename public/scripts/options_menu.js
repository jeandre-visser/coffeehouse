const optionsMenu = (itemId) => {
  return ` <section class="options-menu">
  <div class="item-summary">
    <img src = {itemId.photo_url}>
    <div>${itemId}</div>
    <div>{itemId.descrition}</div>
  </div>

  <div class="order">
    <label for="quantity">Quantity</label>
    <input type="number" name="quantity">
    <button>Add to Order</button>
  </div>
</section>
`
}

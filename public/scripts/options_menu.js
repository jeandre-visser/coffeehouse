const optionsMenu = (itemId) => {
  return ` <section class="options-menu">
  <div class="item-summary">
    <img src = {itemId.photo_url}>
    <div>${itemId}</div>
    <div>{itemId.descrition}</div>
  </div>
  <div class="customization">
    <div class="size">
      <h3>SIZE</h3>
      <button>SMALL</button>
      <button>MEDIUM</button>
      <button>LARGE</button>
    </div>
    <div class="addons">
      <div>
        <h3>MILK</h3>
        <button>EASY </button>
        <button>REGULAR</button>
        <button>EXTRA</button>
      </div>
      <div>
        <h3>SUGAR</h3>
        <button>EASY </button>
        <button>REGULAR</button>
        <button>EXTRA</button>
      </div>
    </div>
  </div>
  <div class="order">
    <label for="quantity">Quantity</label>
    <input type="number" name="quantity">
    <button>Add to Order</button>
  </div>
</section>
`
}

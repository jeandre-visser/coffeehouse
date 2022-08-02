const optionsMenu = (itemId) => {
  return ` <section class="options-menu">
  <div class="item-summary">
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG'>
    <div class='summary'>
      <h1>Coffee</h1>
      <div>A hot cup of bean water</div>
      <div>$100</div>
    </div>
  </div>
  <form class="order">
    <div>
      <label for="quantity">Quantity</label>
      <input type="number" name="quantity" min="1" max="99">
    </div>
    <div>
      <button type="submit">Add to Order: $100</button>
    </div>
  </form>
</section>
`
}

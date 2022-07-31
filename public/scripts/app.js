// Toggle cart
$(() => {
  $('#cart-icon').on('click', () => {
    if ($('#cart-menu').css('display') == 'none') {
      $('#cart-menu').slideToggle(0);
      return;
    }
    $('#cart-menu').slideToggle(0);
    return;
  });
});

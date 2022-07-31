// Toggle cart
$(() => {
  $('#cart-icon').on('click', () => {
    $('#cart-menu').slideToggle(0);
    return;
  });

  $('#menu div').on('click', () => {
    $('#menu').slideToggle(0);
    return;
  });

  $('#home').on('click', () => {
    if ($('#menu').css('display') == 'none') {
      $('#menu').slideToggle(0);
      return;
    }
  })
});

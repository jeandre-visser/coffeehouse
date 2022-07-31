$(() => {
  // Toggle cart
  $('#cart-icon').on('click', () => {
    $('#cart-menu').slideToggle(0);
    return;
  });

  // Toggle hot menu
  $('.hot').on('click', () => {
    if ($('.menu').css('display') == 'none') {
      $('#menus').slideToggle(0);
      $('header').slideToggle(0);
      $('.hot-menu').css('display', 'flex')
      return;
    }
    $('#menus').slideToggle(0);
    $('header').slideToggle(0);
    $('.hot-menu').css('display', 'none')
    return;
  });

  // // Toggle home menu
  // $('#home').on('click', () => {
  //   if ($('#menu').css('display') == 'none') {
  //     $('#menu').slideToggle(0);
  //     $('header').slideToggle(0);
  //     return;
  //   }
  // })
});

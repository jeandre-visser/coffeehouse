$(() => {
  // Toggle cart
  $('#cart-icon').on('click', () => {
    $('#cart-menu').slideToggle(0);
    return;
  });

  // Toggle hot menu
  $('.hot').on('click', () => {
    if ($('.menu').css('display') == 'none') {
      addItems(testDB);
      $('.options-menu').css('display', 'none')
      $('#menus').css('display', 'none');
      $('header').css('display', 'none');
      $('.menu').css('display', 'flex')
      return;
    }
  });

  // // Toggle drink options
  $('.menu').on('click', () => {
      console.log('hello')
      clearItems();
      $('.options-menu').css('display', 'flex')
      return;
  });

  // Toggle home menu
  $('#home').on('click', () => {
    if ($('#menus').css('display') == 'none') {
      $('.menu').css('display', 'none')
      $('.options-menu').css('display', 'none')
      $('#menus').slideToggle(0);
      $('header').slideToggle(0);
      return;
    }
  })
});

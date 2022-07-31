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

  // Toggle cold menu
  $('.cold').on('click', () => {
    if ($('.menu').css('display') == 'none') {
      $('#menus').slideToggle(0);
      $('header').slideToggle(0);
      $('.cold-menu').css('display', 'flex')
      return;
    }

    $('#menus').slideToggle(0);
    $('header').slideToggle(0);
    $('.cold-menu').css('display', 'none')
    return;
  });

  // Toggle baked-goods menu
  $('.baked').on('click', () => {
    if ($('.menu').css('display') == 'none') {
      $('#menus').slideToggle(0);
      $('header').slideToggle(0);
      $('.baked-menu').css('display', 'flex')
      return;
    }

    $('#menus').slideToggle(0);
    $('header').slideToggle(0);
    $('.baked-menu').css('display', 'none')
    return;
  });

  // Toggle home menu
  $('#home').on('click', () => {
    if ($('#menus').css('display') == 'none') {
      $('.menu').css('display', 'none')
      $('#menus').slideToggle(0);
      $('header').slideToggle(0);
      return;
    }
  })
});

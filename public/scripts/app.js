$(() => {
  // Toggle home menu
  $('#home').on('click', () => {
    if ($('#menus').css('display') == 'none') {
      $('.menu').css('display', 'none')
      $('.options-menu').css('display', 'none')
      $('#menus').slideToggle(0);
      return;
    }
  })

  // Toggle hot menu
  $('.hot').on('click', () => {
    addItems(testDB);
    $('.options-menu').css('display', 'none');
    $('#menus').css('display', 'none');
    $('.menu').css('display', 'flex')
    return;
  });

  // Toggle cold menu
  $('.cold').on('click', () => {
    addItems(testDB);
    $('#menus').css('display', 'none');
    $('.menu').css('display', 'flex')
    return;
  });

  // Toggle baked menu
  $('.baked').on('click', () => {
    addItems(testDB);
    $('.options-menu').css('display', 'none');
    $('#menus').css('display', 'none');
    $('.menu').css('display', 'flex')
    return;
  });

  // Toggle cart
  $('#cart-icon').on('click', () => {
    $('#cart-menu').slideToggle(0);
    return;
  });

  $('.order').on('submit', function(event){
    event.preventDefault();

  //   $.ajax({
  //     method: 'POST',
  //     url: '/order',
  // })
  })
})


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

  $('.hot').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/category/hot',
      success: (responseJSON) => {
        console.log(responseJSON)
        addItems(responseJSON.items);
      }
    })
    // addItems(getItemsByCategory('hot'));
    $('.options-menu').css('display', 'none');
    $('#menus').css('display', 'none');
    $('.menu').css('display', 'flex');
    return;
  });

  // // Toggle cold menu
  $('.cold').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/category/cold',
      success: (responseJSON) => {
        console.log(responseJSON.items)
        addItems(responseJSON.items);
      }
    })
    $('#menus').css('display', 'none');
    $('.menu').css('display', 'flex')
    return;
  });

  // Toggle baked menu
  $('.baked').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/category/baked',
      success: (responseJSON) => {
        console.log(responseJSON.items)
        addItems(responseJSON.items);
      }
    })
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

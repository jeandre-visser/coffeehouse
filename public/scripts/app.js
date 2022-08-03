
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

  // paage for hot items
  $('.hot').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/category/hot',
      success: (responseJSON) => {
        console.log(responseJSON.items)
        addItems(responseJSON.items);
      }
    })
    // addItems(getItemsByCategory('hot'));
    $('.options-menu').css('display', 'none');
    $('#menus').css('display', 'none');
    $('.menu').css('display', 'flex');
    return;
  });

  // page for cold items
  $('.cold').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/category/cold',
      success: (responseJSON) => {
        console.log(responseJSON.items)
        addItems(responseJSON.items);
      }
    })
    // addItems(getItemsByCategory('hot'));
    $('.options-menu').css('display', 'none');
    $('#menus').css('display', 'none');
    $('.menu').css('display', 'flex');
    return;
  });

  // page for baked items
  $('.baked').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/category/bake',
      success: (responseJSON) => {
        console.log(responseJSON.items)
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
  // $('.cold').on('click', () => {
  //   addItems(getItemsByCategory('cold'));
  //   $('#menus').css('display', 'none');
  //   $('.menu').css('display', 'flex')
  //   return;
  // });

  // // Toggle baked menu
  // $('.baked').on('click', () => {
  //   addItems(getItemsByCategory('baked'));
  //   $('.options-menu').css('display', 'none');
  //   $('#menus').css('display', 'none');
  //   $('.menu').css('display', 'flex')
  //   return;
  // });

  // Toggle cart
  $('#cart-icon').on('click', () => {
    $('#cart-menu').slideToggle(0);
    return;
  });

  $('.order').on('submit', function(event){
    event.preventDefault();
    console.log('hello')

  //   $.ajax({
  //     method: 'POST',
  //     url: '/cart',
  // })
  })
})

$(() => {
  // Toggle home menu
  $('#home').on('click', () => {
    if ($('#menus').css('display') == 'none') {
      $('.menu').css('display', 'none')
      $('#menus').slideToggle(0);
      return;
    }
  })

  // paage for hot items
  $('.hot').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/category/hot',
<<<<<<< HEAD
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
=======
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
      success: (responseJSON) => {
        addItems(responseJSON.items);
      }
    })
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
        addItems(responseJSON.items);
      }
    })
    $('#menus').css('display', 'none');
    $('.menu').css('display', 'flex')
    return;
  });

  // Toggle cart
  $('#cart-icon').on('click', () => {
    $('#cart-menu').slideToggle(0);
    return;
  });

<<<<<<< HEAD
  $('.order').on('submit', function(event){
    event.preventDefault();
    console.log('hello')

  //   $.ajax({
  //     method: 'POST',
  //     url: '/cart',
  // })
  })
=======

  // $("#add-to-order").click(function() {
    // // Updates Cart Input Value
    // const foodId = $(this).val();
    // const $cartField = $("#cart");
    // const cartValue = $cartField.val();

    // $cartField.val(addFoodToCart(foodId,cartValue));

    // // Updates current total
    // const priceAsString = $(this).closest("div").find(".price").text();
    // const $priceField = $(".price-counter");
    // const currentTotal = $priceField.text();

    // const foodPrice = priceStringToNumber(priceAsString);

    // $priceField.text(updatePrice(foodPrice, currentTotal));
  // });

//     // const values = $(this).serialize();
//     // console.log(values)


//     // $.ajax({
//     //   method: 'POST',
//     //   url: '/cart/',
//     //   data: values,
//     //   success: () => {
//     //     console.log('hello')
//     //   }
//     // })
//   })
>>>>>>> 0b49830841d34ae5ae95dd757e53ac5c4480333b
})

$(() => {
  // Toggle home menu
  $('#home').on('click', () => {
    if ($('#menus').css('display') == 'none') {
      $('.menu').css('display', 'none')
      $('#menus').slideToggle(0);
      return;
    }
  })

  $('.hot').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/category/hot',
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
})

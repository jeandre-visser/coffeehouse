
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
      url: '/category/bake',
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

  // Return Home Page
  $('.return-button').on('click', () => {
    window.location.href = "http://localhost:8080";
  });

  //1. Make API Call
  $('.create-order').on('click', function() {
    const order_items = []
    $(this).parent().find(".cart-list").children().each(function(){
      const id = $(this).attr('data-id')
      const name = $(this).attr('data-name');
      const quantity = $(this).attr('data-quantity');
      const newItem = { id, quantity, name };
      order_items.push(newItem);
    });

    const customer_name = $("#customername").val();
    const customer_phone = $("#customerphone").val();
    const formData = {
      order_items,
      customer_name,
      customer_phone
    }

    $.ajax({
      method: 'POST',
      url: '/summary/order',
      data: formData,
      success: (data) => {
        alert('Order placed properly')
        const { order, name, phone, coffeeItems, timeOfOrder} = data;
        window.location.href = `/summary/order/${order}?name=${name}&phone=${phone}&timeOfOrder=${timeOfOrder}&coffeeItems=${JSON.stringify(coffeeItems)}`

      }
    })

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

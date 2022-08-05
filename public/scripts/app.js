
$(() => {

  // Scroll up button
  $('#scroll-up').click(() => {
    scrollTo(0, 0);
  });

  // Toggle home menu
  $('#home').on('click', () => {
    if ($('#menus').css('display') == 'none') {
      $('.menu').css('display', 'none')
      $('#menus').slideToggle(0);
      return;
    }
  })

  // Toggle hot cold
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

  // Return Home Page
  $('.return-button').on('click', () => {
    window.location.href = "http://localhost:8080";
  });

  // Clear cart
  $('#clear-cart').on('click', () => {
    $('.cart-empty').empty()
    $('.cart-empty').text('Your cart is empty.')
    $('.cart-list').empty();
    ($('.total-price').text(0));
    $('#item-counter').text('');

  })

  //Make API Call
  $('.create-order').on('click', function() {

    // Check for empty cart
    if ($('.cart-list li').length == 0) {
      alert('Please add some items to your cart.')
      return;
    }

    //check for name input
    const nameLength = $('#customername').val().length
    if(nameLength === 0) {
      alert('Please enter your name.')
      return;
    }

    // Check for 10 digit phone number
    const phoneLength = $('#customerphone').val().length
    if(phoneLength !== 11){
      alert('Please enter a 11 digit phone number')
      return;
    }

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
    const price = Number($('.total-price').text());

    const formData = {
      order_items,
      customer_name,
      customer_phone,
      price
    }

    $.ajax({
      method: 'POST',
      url: '/summary/order',
      data: formData,
      success: (data) => {
        const { order, name, phone, coffeeItems, timeOfOrder} = data;
        window.location.href = `/summary/order/${order}?name=${name}&phone=${phone}&timeOfOrder=${timeOfOrder}&price=${price}&coffeeItems=${JSON.stringify(coffeeItems)}`
      }
    })

    return;
  });

  // Admin confirm order
  $('.confirm-order').click(function(){
    const orderId = $(this).attr('data-orderid')
    const orderPhone = $(this).attr('data-orderphone')
    const data = {
      orderId,
      orderPhone
    }

    $.ajax({
      method: 'POST',
      url: '/admin',
      data: data,
      success: () => {
        location.reload();
        // return false;
      }
    })
    .catch((err) => {
      alert(err)
    })
  })
})

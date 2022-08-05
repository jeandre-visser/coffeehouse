
$(() => {
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

        const { order, name, phone, coffeeItems, timeOfOrder} = data;
        window.location.href = `/summary/order/${order}?name=${name}&phone=${phone}&timeOfOrder=${timeOfOrder}&coffeeItems=${JSON.stringify(coffeeItems)}`

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
    })
    .catch((err) => {
      alert(err)
    })
  })
})

  // // Place order
  // $('#cart-menu').submit(function(event){
  //   event.preventDefault();

  //   order = {
  //     name: $('.user-name').val(),
  //     phone: $('.user-phone').val(),
  //     items: [],
  //   }

  //   $('li').each((idx, el) => {
  //     order.items.push({
  //       quantity: el.dataset.quantity,
  //       id: el.dataset.itemid
  //     })
  //   })

  //   $.ajax({
  //     method: "POST",
  //     url: "/admin",
  //     data: order

  //   }).then(()=> {
  //     console.log('ajax hit')
  //     alert('success');
  //   })
  //   .catch((err) => {
  //     alert(err)
  //   })
  // })
// })

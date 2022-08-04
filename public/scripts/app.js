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

  // Place order
  $('#cart-menu').submit(function(event){

    orderObj = {
      name: $('.user-name').val(),
      phone: $('.user-phone').val(),
      items: [],
    }

    $('li').each((idx, el) => {
      orderObj.items.push({
        quantity: el.dataset.quantity,
        id: el.dataset.itemid
      })
    })

    $.ajax({
      method: "POST",
      url: "/admins",
      data: orderObj
    }).then(()=> {
      alert('success');
    })
    .catch((err) => {
      alert(err)
    })
  })
})

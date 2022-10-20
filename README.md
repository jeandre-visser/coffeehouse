# Coffee House - Order hot/cold specialty coffees and baked goods
=========
## Summary
Coffee House is a mock coffee shop ordering web app submitted as the midterm project in the Lighthouse Labs Web Development Bootcamp in collaboration with Jeff Stinson and Siraj-Wahaj Ibrahim. The web app is built with JavaScript, EJS, Express, AJAX, jQuery, PostgreSQL, and the Twilio API for SMS notification functionality.

## Project Walkthrough
Home page
!["Screenshot of the home view"](https://github.com/jeandre-visser/coffeehouse/blob/master/images/Home.png)
> 1. When presented with the home page, select one of the three categories:
>  - Iced coffee
>  - Hot coffee
>  - Baked Goods

>Products view
!["Screenshot of the products view"](https://github.com/jeandre-visser/coffeehouse/blob/master/images/Products.png)
>2. When presented with the menu for the selected category, add any item and as many as you would like! You can also: 
>  - Toggle cart in nav bar to see total price of items
>  - Press clear cart button if you no longer want the added items
>  - If you have scrolled down the menu, you can click on the up arrow in the nav bar which will bring you back to the top of the webpage
>  - Click on other menu categories in the bar at any time
>  - Click on the coffeehouse logo in the nav bar to be brought back to the home page

>Order Summary page
!["Screenshot of the order view"](https://github.com/jeandre-visser/coffeehouse/blob/master/images/Order-Summary.png)
> 3. After choosing your items, input your name and phone number and place the order. Via Twilio, you will immediately receive an SMS notifying you that your order has been placed. You will be brought to the order summary page displaying the order details. You can then press the return to home button to place another order if you wish.

>Admin page
!["Screenshot of the admin view"](https://github.com/jeandre-visser/coffeehouse/blob/master/images/Admin.png)
> 4. Make your way to the /admin (http://locahost:8080/admin) page to view all the orders that have been placed by previous customers. Once the admin confirms the order, the customer receives another SMS to notify them that their order is ready for pickup.

## Getting Started

1. Install all required dependencies: `npm i`
2. Setup database with migration files
3. Add seed files to database

## Twilio
1. Set up a connection with local host 8080 and copy the URL of your tunnel
2. Sign up for an account with Twilio
3. Get a Twilio phone number
4. Set the request URL to your tunneled address
5. Create a module that's linked to server.js and set the variables with your ngrok info. Set twilioID , twilioToken, twilioNumber, and test_number
6. Run the development web server using npm start
7. Visit http://localhost:8080/


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Nodemon 1.9.2 or above
- Twilio 3.80.0 or above
- Body Parser 1.15.2 or above
- Express 4.17.1 or above

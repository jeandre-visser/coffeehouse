// Credentials for Twilio api use
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


/** Use the Twilio client to send a text
 *  * @param: {string} 'body' Text message that is sent to recipient
 *  * @param: {string} 'from' text message sender's cell number (same format above)
 * @param: {string} 'to' text message recipient's cell number (no spaces or dashes, add country code at beginning e.g. +1)
 * @param: {function} 'cb' Callback function, by default returns response from Twilio
 */

const textMessage = function(body, from, to, cb = (response) => { return response; }) {

  client.messages.create({body, from, to})
  .then(message => {
    console.log(`Successfully sent message to ${to}`);
    cb(message);
  })
  .catch(error => {
    console.log(`Failed to send message to ${to}`, error)
    cb(error);
  });
};

module.exports = { textMessage };

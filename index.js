// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

var crypto = require('crypto');


// Generate oAuth2 client credentials (ID and secret).

function generateClientCredentials (callback) {

  // Generate cryptographically strong pseudo-random data.
  crypto.randomBytes(30, function (error, buffer) {

    if (error) {
      callback(error, null);
      return;
    }

    // Use 20-digit hex IDs and 40-digit secrets, like GitHub oAuth2 clients.
    var hex = buffer.toString('hex');
    var client = {
      id: hex.slice(0, 20),
      secret: hex.slice(20, 60)
    };

    callback(null, client);
    return;

  });

}

exports.generateClientCredentials = generateClientCredentials;

// Copyright © 2016 Jan Keromnes. All rights reserved.
// The following code is covered by the MIT license.

var crypto = require('crypto');

// Use the same hexadecimal digit sizes as GitHub's OAuth2 implementation.
var SIZES = {
  ID: 20,
  SECRET: 40,
  CODE: 20,
  TOKEN: 40
};

// Temporary authorizations for OAuth2 access tokens.
var GRANTS = {};
var GRANT_TIMEOUT_MS = 2 * 60 * 1000;

// Generate OAuth2 client credentials (ID and secret).
function generateClientCredentials (callback) {
  randomHexString(SIZES.ID + SIZES.SECRET, function (error, client) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      id: client.slice(0, SIZES.ID),
      secret: client.slice(SIZES.ID, SIZES.ID + SIZES.SECRET)
    });
  });
}
exports.generateClientCredentials = generateClientCredentials;

// Generate an OAuth2 authorization code for an access token.
function generateAuthorizationCode (scope, state, id, secret, callback) {
  if (typeof id !== 'string' || id.length < SIZES.ID) {
    callback(new Error('Invalid OAuth2 Client ID'));
    return;
  }
  if (typeof secret !== 'string' || secret.length < SIZES.SECRET) {
    callback(new Error('Invalid OAuth2 Client Secret'));
    return;
  }
  randomHexString(SIZES.CODE, function (error, code) {
    if (error) {
      callback(error);
      return;
    }

    // Temporarily authorize the generation of an OAuth2 access token.
    var grant = {
      scope: scope,
      timer: null
    };
    var grantHash = hash(code + state + id + secret);
    GRANTS[grantHash] = grant;
    grant.timer = setTimeout(function () {
      delete GRANTS[grantHash];
    }, GRANT_TIMEOUT_MS);

    callback(null, {
      code: code
    });
  });
}
exports.generateAuthorizationCode = generateAuthorizationCode;

// Generate an OAuth2 access token from an authorization code.
function generateAccessToken (code, state, id, secret, callback) {
  var grantHash = hash(code + state + id + secret);
  if (!(grantHash in GRANTS)) {
    callback(new Error('Invalid OAuth2 Authorization Code'));
    return;
  }
  var scope = GRANTS[grantHash].scope;
  clearTimeout(GRANTS[grantHash].timer);
  delete GRANTS[grantHash];

  randomHexString(SIZES.TOKEN, function (error, token) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, {
      scope: scope,
      token: token,
      tokenHash: hash(token)
    });
  });
}
exports.generateAccessToken = generateAccessToken;

// Generate cryptographically strong pseudo-random data in hexadecimal format.
function randomHexString (length, callback) {
  crypto.randomBytes(Math.ceil(Number(length) / 2), function (error, buffer) {
    if (error) {
      callback(error);
      return;
    }
    var string = buffer.toString('hex').slice(0, Number(length));
    callback(null, string);
  });
}
exports.randomHexString = randomHexString;

// Generate a one-way hash of the given data in hexadecimal format.
function hash (data) {
  return crypto.createHash('sha256').update(String(data)).digest('hex');
}
exports.hash = hash;

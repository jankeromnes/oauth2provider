# oauth2provider

Simple, lightweight OAuth2 provider library for Node.js.

## Our Promise

- Simple: Code is easy to read, understand, test and audit.
- Lightweight: No dependencies, code is kept as short as possible.
- Vanilla: No framework/middleware stuff here. We're straight to the point.
- Self-service: You get to store/verify/revoke credentials as you like.

## Getting Started

Installation:

    npm install oauth2provider

Usage:

    var oauth2provider = require('oauth2provider');

Generating OAuth2 client credentials (ID and secret):

    var clientId = null;
    var clientSecret = null;
    oauth2provider.generateClientCredentials(function (error, data) {
      clientId = data.id; // This can be public.
      clientSecret = data.secret; // Keep this between you and the client.
    });

Generating an OAuth2 authorization code:

    var scope = 'a scope'; // An optional scope in the format of your choice.
    var state = 'a state'; // An unguessable random string. Use '' for no CSRF protection.
    oauth2provider.generateAuthorizationCode(scope, state, clientId, clientSecret, function (error, data) {
      data.code; // Send this to the client. Never save this!
    });

Generating an OAuth2 access token:

    var scopes = {};
    oauth2provider.generateAccessToken(code, state, clientId, clientSecret, function (error, data) {
      data.scope; // The scope you provided during authorization.
      data.token; // Send this to the client. Never save this!
      data.tokenHash; // Save this hash for future authentication, e.g.:
      scopes[data.tokenHash] = data.scope;
    }

Authenticating an OAuth2 access:

    var tokenHash = oauth2provider.hash(token);
    if (tokenHash in scopes) {
      var scope = scopes[tokenHash];
      // Successfully authenticated!
    } else {
      // Invalid token, abort!
      return;
    }

## TODO

- [x] Generate OAuth2 client ID + secret
- [x] Generate OAuth2 authorization code
- [x] Generate OAuth2 access token from an OAuth2 authorization code
- [ ] Document implementation details using [this form](https://aaronparecki.com/2015/01/15/8/so-you-implemented-an-oauth2-api)
- [ ] Add tests

## LICENSE

[MIT](https://github.com/jankeromnes/oauth2provider/blob/master/LICENSE)

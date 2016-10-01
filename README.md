# oauth2provider

Simple, lightweight OAuth2 provider library for Node.js.

## Our Promise

- Simple: Code is easy to read, understand, test and audit.
- Lightweight: Minimal dependencies, code is kept as short as possible.
- Vanilla: No framework/middleware stuff here. We're straight to the point.
- Self-service: You get to store/verify/revoke credentials as you like.

## Getting Started

Installation:

    npm install oauth2provider

Usage:

    var oauth2provider = require('oauth2provider');
    oauth2provider.generateClientCredentials((error, credentials) => {
      // credentials.id, credentials.secret
    });

## TODO

- [x] Generate OAuth2 client ID + secret
- [ ] Generate OAuth2 authorization code
- [ ] Generate OAuth2 token from an OAuth2 authorization code

## LICENSE

[MIT](https://github.com/jankeromnes/oauth2provider/blob/master/LICENSE)

'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should GET /', () => {
    return app.httpRequest()
      .get('/?id=59dafe35fe88c2003c957aac')
      .expect(200);
  });
});

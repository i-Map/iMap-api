'use strict';

const jwt = require('jsonwebtoken');
const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/travelogue.test.js', () => {
  // 上传游记测试
  it('POST /v1/travelogue', async () => {
    const ctx = app.mockContext();

    const token = 'Bearer ' + jwt.sign({
      data: {
        objectId: '5a6cc9dba22b9d003d01d0e3',
      },
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, ctx.app.config.jwt.secret);

    return app.httpRequest()
      .post('/v1/travelogue')
      .type('json')
      .set('Authorization', token)
      .send({
        title: 'test',
        content: 'test',
      })
      .expect(201);
  });
});

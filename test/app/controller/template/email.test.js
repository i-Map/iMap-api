'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/template/email.test.js', () => {
  // 测试邮箱验证模板
  it('POST | /template/email/verify', async () => {
    return app.httpRequest()
      .get('/template/email/verify')
      .expect(200);
  });

  // 测试重置密码模板
  it('POST | /template/email/reset', async () => {
    return app.httpRequest()
      .get('/template/email/reset')
      .expect(200);
  });
});

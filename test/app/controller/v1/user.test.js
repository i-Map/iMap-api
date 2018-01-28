'use strict';

const jwt = require('jsonwebtoken');
const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  // 测试登录
  it('POST | /v1/login', async () => {
    return app.httpRequest()
      .post('/v1/login')
      .type('json')
      .send({
        email: 'test@gmail.com',
        password: 'test',
      })
      .expect(200);
  });

  // 测试重置密码
  it('POST | /v1/reset', async () => {
    return app.httpRequest()
      .post('/v1/reset')
      .type('json')
      .send({
        email: 'test@gmail.com',
      });
  });

  // 测试第三方登录 - GitHub
  it('GET | /v1/oauth/github', async () => {
    return app.httpRequest()
      .get('/v1/oauth/github')
      .type('json')
      .expect(500);
  });

  // 测试第三方登录 - GitHub
  it('GET | /v1/oauth/github?code=123', async () => {
    return app.httpRequest()
      .get('/v1/oauth/github')
      .type('json')
      .expect(500);
  });

  // 测试注册
  it('POST | /v1/register', async () => {
    return app.httpRequest()
      .post('/v1/register')
      .type('json')
      .send({
        nickname: 'test',
        email: `test_${ Date.now() }@gmail.com`,
        password: 'test',
      })
      .expect(201);
  });

  // 测试更新
  it('PATCH | /v1/user', async () => {
    const ctx = app.mockContext();

    const token = 'Bearer ' + jwt.sign({
      data: {
        objectId: '5a6cc9dba22b9d003d01d0e3',
      },
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, ctx.app.config.jwt.secret);

    return app.httpRequest()
      .patch('/v1/user')
      .type('json')
      .set('Authorization', token)
      .send({
        nicknameModel: {
          nickname: 'test',
        },
        avatarModel: {
          name: 'test.png',
          base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAUCAIAAABqGAhiAAADBUlEQVR42pxVS0gyXxwddRqhnHQsSEJCmaJ2lVRUzKYHuAx6QBIt3GW0axctDWblskUQtah2E0TRIgTbNbmwTYXV6L9RekAPHC5EgtP9o34Mt+vjm/nOSs/v3Hu8v5ckAIDQBwjh6+vr29tba2trW1ubxWIhDIKsH/75+UkkEul0WpblbDabz+f/HCNJl8vldrtZlh0dHSVJUo+Zqc7LZFne39+XZbn+FS6XKxAI9PT0/KPZ9/f30dFRLBaDEOpM0cDAwNzcnMPhMGaWTCZ3dnZyuZzRklit1mAw2N/fX0tgxr4/Pz9vbm7WcqJpmmXZ5ubmqtF8Pr+9vf34+KjrZQAAnuff398xkcfj8fv9Ho/H6XRqykwmc3p6KkkSJnY4HGtra3a7vZ5ZoVCIRCKpVAoNUxQ1NTU1Pj5uNpurDoMoioIgYLXwer2rq6sNDQ01zXZ3dy8uLtBYe3v7yspKS0tL/VJ9fX1FIpFsNouSw8PDwWCwes0SiQTmZLPZ9DgRBNHY2Li8vEzTNEqKonhzc1Pd7Ozs7Neok+TS0pIepzKcTmcoFMJGOxaLaU8XRfH29rYY/q8EVBcIBLq6ulAml8sJgnB3d0cQRHd398zMDDZSLMvOz8/v7e1pzPX19fHxsSRJDw8PBEFsbGwUXxaNRtFjbreb4zjMKRwOx+NxpYR4PB4OhyvHg+M4NBkQwpOTk2Qyqaqqz+djGMb8+fl5dXWFnpmcnMRuqew3AIAgCOi9qVTq8PBQW54YJiYmitU5Pz9XVVVj7Xb74OAgJi1nrxYpSdLW1paiKLUq6i2h2CBDQ0MjIyPaTIyNjelc4Ro6OztDoVBHR0ctgZYqC8/zfX19HMdZrdaPj4/FxUWKojB1JpN5enrCyN7eXp/PV/7MMAzHcTabLZ1OFwoFVMYwzMLCQnkn/FpXEEKTyVT508oNgippml5fX6/c8YqiCIJweXmpMdPT036//+//Z4ZaH8X9/f3BwcHLywtFUTzPNzU1GTMzClVVo9EoAGB2dlYj/w8AAP//27hzSH9QL3oAAAAASUVORK5CYII=',
        },
        emailModel: {
          email: 'test@gmail.com',
        },
      })
      .expect(201);
  });
});

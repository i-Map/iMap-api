'use strict';

const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class UserController extends Controller {
  // 登录
  async login() {
    const ctx = this.ctx;
    const model = ctx.request.body;

    const rule = {
      username: {
        type: 'string',
        min: 4,
        max: 25,
      },
      password: {
        type: 'password',
        min: 4,
        max: 25,
      },
    };
    ctx.validate(rule);

    const result = await ctx.service.v1.user.login(model);

    ctx.body = {
      data: {
        oauth: false,
        user: result,
        accessToken: 'Bearer ' + jwt.sign({
          data: {
            objectId: result.id,
          },
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        }, 'ncyimou'),
      },
    };
    ctx.status = 200;
  }

  // 第三方登录 - GitHub
  async githubOauth() {
    const ctx = this.ctx;
    const code = ctx.query.code;
    const githubConfig = ctx.app.config.githubConfig;
    let authData = {
      uid: '',
      access_token: '',
    };

    if (!code) {
      ctx.body = {
        error: 'github code 不能为空',
      };
      ctx.status = 500;
    } else {
      const sessionData = await ctx.curl(githubConfig.IMAP_GITHUB_ACCESS_TOKEN_URL, {
        method: 'POST',
        data: {
          client_id: githubConfig.IMAP_GITHUB_CLIENT_ID,
          client_secret: githubConfig.IMAP_GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: githubConfig.IMAP_GITHUB_REDIRET_URL,
        },
        contentType: 'json',
        dataType: 'json',
      });

      const result = await ctx.curl(githubConfig.IMAP_GITHUB_USER, {
        method: 'GET',
        data: {
          access_token: sessionData.data.access_token,
        },
        contentType: 'json',
        dataType: 'json',
      });

      authData = { uid: String(result.data.id), access_token: String(sessionData.data.access_token) };

      const loginedUser = await ctx.service.v1.user.oauth(authData, 'github');

      ctx.body = {
        data: {
          oauth: true,
          user: loginedUser,
          github: result.data,
          accessToken: 'Bearer ' + jwt.sign({
            data: {
              objectId: loginedUser.id,
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
          }, 'ncyimou'),
        },
      };
      ctx.status = 200;
    }
  }
}

module.exports = UserController;

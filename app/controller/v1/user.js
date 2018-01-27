'use strict';

const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class UserController extends Controller {
  // 登录
  async login() {
    const ctx = this.ctx;
    const model = ctx.request.body;

    const rule = {
      email: {
        type: 'email',
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
      msg: ctx.__('Login successful'),
      data: {
        oauth: false,
        user: result,
        accessToken: 'Bearer ' + jwt.sign({
          data: {
            objectId: result.id,
          },
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
        }, ctx.app.config.jwt.secret),
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
        error: ctx.__('GitHub code can not be empty'),
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

      const loginedUser = await ctx.service.v1.user.oauth(authData, {
        nickname: result.data.name || result.data.login,
        email: result.data.email || '',
        avatar_url: result.data.avatar_url,
      }, 'github');

      ctx.body = {
        msg: ctx.__('Login successful'),
        data: {
          oauth: true,
          user: loginedUser,
          github: result.data,
          accessToken: 'Bearer ' + jwt.sign({
            data: {
              objectId: loginedUser.id,
            },
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
          }, ctx.app.config.jwt.secret),
        },
      };
      ctx.status = 200;
    }
  }

  // 注册
  async register() {
    const ctx = this.ctx;
    const model = ctx.request.body;

    const rule = {
      nickname: {
        type: 'string',
        min: 1,
        max: 15,
      },
      email: {
        type: 'email',
      },
      password: {
        type: 'password',
        min: 4,
        max: 25,
      },
    };
    ctx.validate(rule);

    await ctx.service.v1.user.register(model);

    ctx.body = {
      msg: ctx.__('Signup successful'),
    };
    ctx.status = 201;
  }

  // 更新
  async update() {
    const ctx = this.ctx;
    const model = ctx.request.body;

    const rule = {
      avatarModel: {
        type: 'object',
        name: {
          type: 'string',
        },
        base64: {
          type: 'string',
        },
        required: false,
      },
      nicknameModel: {
        type: 'object',
        nickname: {
          type: 'string',
          min: 1,
          max: 10,
        },
        required: false,
      },
      emailModel: {
        type: 'object',
        email: {
          type: 'email',
        },
        required: false,
      },
    };
    ctx.validate(rule);

    const result = await ctx.service.v1.user.update(model);

    ctx.body = {
      msg: ctx.__('Update successful'),
      data: result,
    };
    ctx.status = 201;
  }

  // 重置密码
  async reset() {
    const ctx = this.ctx;
    const model = ctx.request.body;

    const rule = {
      email: {
        type: 'email',
      },
    };
    ctx.validate(rule);

    await ctx.service.v1.user.reset(model);

    ctx.body = {
      msg: ctx.__('Mail sent successfully'),
    };
    ctx.status = 200;
  }
}

module.exports = UserController;

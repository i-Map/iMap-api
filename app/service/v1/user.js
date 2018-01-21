'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 登录
   * @param {Object} model - 响应主体模型
   * @return {Object} loginedUser - 登录用户信息
   */
  async login(model) {
    const AV = this.ctx.AV;

    const loginedUser = await AV.User.logIn(model.email, model.password);

    return loginedUser;
  }

  /**
   * 第三方登录 - GitHub
   * @param {Object} authData - 第三方注册数据
   * @param {String} provider - 第三方登录提供者名称
   * @return {Object} loginedUser - 登录用户信息
   */
  async oauth(authData, provider) {
    const AV = this.ctx.AV;

    const loginedUser = await AV.User.signUpOrlogInWithAuthData(authData, provider);

    return loginedUser;
  }

  /**
   * 重置密码
   * @param {Object} model - 响应主体模型
   * @return {Object} result - 提示信息
   */
  async reset(model) {
    const AV = this.ctx.AV;

    await AV.User.requestPasswordReset(model.email);

    return 0;
  }
}

module.exports = UserService;

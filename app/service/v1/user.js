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
   * @param {Object} model - 用户 GitHub 数据
   * @param {String} provider - 第三方登录提供者名称
   * @return {Object} loginedUser - 登录用户信息
   */
  async oauth(authData, model, provider) {
    const AV = this.ctx.AV;

    const beforeLoginResult = await AV.User.signUpOrlogInWithAuthData(authData, provider);
    const user = AV.Object.createWithoutData('_User', beforeLoginResult.id);

    user.set('nickname', model.nickname);
    user.set('avatar_url', model.avatar_url);
    await user.save();

    const loginedUser = user.fetch();

    return loginedUser;
  }

  /**
   * 注册
   * @param {Object} model - 响应主体模型
   * @return {Number} - 无返回
   */
  async register(model) {
    const AV = this.ctx.AV;
    const user = new AV.User();

    user.setUsername(model.username);
    user.setPassword(model.password);
    user.setEmail(model.email);
    user.set('nickname', model.nickname);
    await user.signUp();

    return 0;
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

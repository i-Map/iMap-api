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

    user.setUsername(model.email);
    user.setPassword(model.password);
    user.setEmail(model.email);
    user.set('nickname', model.nickname);
    await user.signUp();

    return 0;
  }

  /**
   * 更新
   * @param {Object} model - 响应主体模型
   * @return {Object} updatedUser - 更新后用户信息
   */
  async update(model) {
    const AV = this.ctx.AV;
    const ctx = this.ctx;
    const objectId = ctx.state.user.data.objectId;
    const user = AV.Object.createWithoutData('_User', objectId);
    const userData = await user.fetch();
    const avatarId = userData.get('avatar_id');

    if (model.avatarModel) {
      const data = { base64: model.avatarModel.base64 };

      const avatar = new AV.File(model.avatarModel.name, data);
      const fileResult = await avatar.save();

      const result = {
        avatar_id: fileResult.id,
        avatar_url: avatar.thumbnailURL(250, 250),
      };


      if (avatarId) {
        const destroyFile = AV.Object.createWithoutData('_File', avatarId);
        await destroyFile.destroy();
      }

      user.set('avatar_id', result.avatar_id);
      user.set('avatar_url', result.avatar_url);
    }

    if (model.emailModel) {
      user.set('email', model.emailModel.email);
    }

    if (model.nicknameModel) {
      user.set('nickname', model.nicknameModel.nickname);
    }

    await user.save();
    const updatedUser = user.fetch();

    return updatedUser;
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

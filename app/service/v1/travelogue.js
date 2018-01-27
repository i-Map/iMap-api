'use strict';

const Service = require('egg').Service;

class TravelogueService extends Service {
  /**
   * 上传游记
   * @param {Object} model - 响应主体模型
   * @return {Number} - 无返回
   */
  async upload(model) {
    const AV = this.ctx.AV;
    const ctx = this.ctx;
    const objectId = ctx.state.user.data.objectId;
    const user = AV.Object.createWithoutData('_User', objectId);

    const travelogue = new AV.Object('Travelogue');

    travelogue.set('title', model.title);
    travelogue.set('content', model.content);
    travelogue.set('dependent', user);

    await travelogue.save();

    return 0;
  }
}

module.exports = TravelogueService;

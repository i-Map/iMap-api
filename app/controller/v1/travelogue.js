'use strict';

const Controller = require('egg').Controller;

class TravelogueController extends Controller {
  // 上传游记
  async upload() {
    const ctx = this.ctx;
    const model = ctx.request.body;

    const rule = {
      title: {
        type: 'string',
        min: 1,
        max: 30,
      },
      content: {
        type: 'string',
        min: 1,
      },
    };
    ctx.validate(rule);

    await ctx.service.v1.travelogue.upload(model);

    ctx.body = {
      msg: ctx.__('Upload successful'),
    };
    ctx.status = 201;
  }
}

module.exports = TravelogueController;

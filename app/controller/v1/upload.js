'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  // 上传图片
  async image() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const result = await ctx.service.v1.upload.image(stream);

    ctx.body = {
      msg: ctx.__('Upload successful'),
      data: result,
    };

    ctx.status = 201;
  }
}

module.exports = UploadController;

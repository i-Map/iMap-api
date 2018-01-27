'use strict';

const Service = require('egg').Service;
const toArray = require('stream-to-array');

class UploadService extends Service {
  /**
   * 上传图片
   * @param {Object} stream - 文件流
   * @return {Object} result - 图片信息
   */
  async image(stream) {
    const AV = this.ctx.AV;
    const parts = await toArray(stream);
    let buf = '';
    buf = Buffer.concat(parts);
    const file = new AV.File(stream.filename, buf);
    const fileResult = await file.save();

    const result = {
      id: fileResult.id,
      url: fileResult.attributes.url,
    };

    return result;
  }
}

module.exports = UploadService;

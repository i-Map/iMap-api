'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const AV = this.ctx.AV;
    const user = AV.Object.createWithoutData('_User', id);
    const result = await user.fetch();
    ctx.body = {
      data: result,
    };
    ctx.status = 200;
  }
}

module.exports = HomeController;

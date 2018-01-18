'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = 'hi, iMap';
    ctx.status = 200;
  }
}

module.exports = HomeController;

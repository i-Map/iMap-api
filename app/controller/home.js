'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    ctx.body = 'hi iMap';
    ctx.status = 200;
  }
}

module.exports = HomeController;

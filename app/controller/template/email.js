'use strict';

const Controller = require('egg').Controller;

class TemplateEmailController extends Controller {
  /**
   * 邮件验证模板
   */
  async verify() {
    const ctx = this.ctx;

    ctx.body = await ctx.renderView('template/email/verify.template.tpl');

    ctx.status = 200;
  }
}

module.exports = TemplateEmailController;

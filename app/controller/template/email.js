'use strict';

const Controller = require('egg').Controller;

class TemplateEmailController extends Controller {
  /**
   * 邮箱验证模板
   */
  async verify() {
    const ctx = this.ctx;

    ctx.body = await ctx.renderView('template/email/verify.template.tpl');

    ctx.status = 200;
  }

  /**
   * 重置密码模板
   */
  async reset() {
    const ctx = this.ctx;

    ctx.body = await ctx.renderView('template/email/reset.template.tpl');

    ctx.status = 200;
  }
}

module.exports = TemplateEmailController;

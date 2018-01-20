'use strict';

/**
 * RESTful API
 * @param {Egg.Application} app - egg 应用
 */
module.exports = app => {
  const { controller } = app;

  // 邮件模板
  app.router.get('/template/email/verify', controller.template.email.verify);
  app.router.get('/template/email/reset', controller.template.email.verify);

  app.router.post('/v1/login', controller.v1.user.login);
  app.router.post('/v1/reset', controller.v1.user.reset);
  app.router.get('/v1/oauth/github', controller.v1.user.githubOauth);
};

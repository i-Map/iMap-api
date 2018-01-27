'use strict';

/**
 * RESTful API
 * @param {Egg.Application} app - egg 应用
 */
module.exports = app => {
  const { controller } = app;

  // template
  app.router.get('/template/email/verify', controller.template.email.verify);
  app.router.get('/template/email/reset', controller.template.email.reset);

  // user
  app.router.post('/v1/login', controller.v1.user.login);
  app.router.post('/v1/register', controller.v1.user.register);
  app.router.post('/v1/reset', controller.v1.user.reset);
  app.router.patch('/v1/user', controller.v1.user.update);
  app.router.get('/v1/oauth/github', controller.v1.user.githubOauth);

  // upload
  app.router.post('/v1/upload/image', controller.v1.upload.image);

  // travelogue
  app.router.post('/v1/travelogue', controller.v1.travelogue.upload);
};

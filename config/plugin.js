'use strict';

// 日志视图 插件
exports.logview = {
  package: 'egg-logview',
  enable: true,
};

// leancloud 插件
exports.leancloud = {
  package: 'egg-leancloud',
  enable: true,
};

// 数据验证 插件
exports.validate = {
  package: 'egg-validate',
  enable: true,
};

// passport 插件
exports.passport = {
  enable: false,
  package: 'egg-passport',
};

// passport-github 插件
exports.passportGithub = {
  enable: false,
  package: 'egg-passport-github',
};

// 视图模板 插件
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

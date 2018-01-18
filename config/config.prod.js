'use strict';

/**
 * 生产环境配置项
 * @param {Egg.Application} app - egg应用
 * @param  {Object} appInfo - 应用信息
 * @return {Object} config - 配置项
 */
module.exports = (app, appInfo) => {
  const config = exports = {};

  // app key
  config.keys = appInfo.name + app.config.env.IMAP_API_KEY;

  // leancloud key
  exports.leancloud = {
    appId: app.config.env.IMAP_API_LEANCLOUD_APPID,
    appKey: app.config.env.IMAP_API_LEANCLOUD_APPKEY,
    masterKey: app.config.env.IMAP_API_LEANCLOUD_MASTERKEY,
  };

  return config;
};

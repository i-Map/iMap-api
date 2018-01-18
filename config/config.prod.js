'use strict';

/**
 * 生产环境配置项
 * @param  {Object} appInfo - 应用信息
 * @return {Object} config - 配置项
 */
module.exports = appInfo => {
  const config = exports = {};

  // app key
  config.keys = appInfo.name + process.env.IMAP_API_KEY;

  // leancloud key
  exports.leancloud = {
    appId: process.env.IMAP_API_LEANCLOUD_APPID,
    appKey: process.env.IMAP_API_LEANCLOUD_APPKEY,
    masterKey: process.env.IMAP_API_LEANCLOUD_MASTERKEY,
  };

  return config;
};

'use strict';

/**
 * 生产环境配置项
 * @param  {Object} appInfo - 应用信息
 * @return {Object} config - 配置项
 */
module.exports = appInfo => {
  const config = exports = {};

  // app 秘钥
  config.keys = appInfo.name + process.env.IMAP_API_KEY;

  // leancloud 秘钥
  exports.leancloud = {
    appId: process.env.IMAP_API_LEANCLOUD_APPID,
    appKey: process.env.IMAP_API_LEANCLOUD_APPKEY,
    masterKey: process.env.IMAP_API_LEANCLOUD_MASTERKEY,
  };

  // jwt 秘钥
  config.jwt = {
    secret: process.env.IMAP_API_SECRET,
  };

  // GitHub 应用信息
  config.githubConfig = {
    IMAP_GITHUB_CLIENT_ID: process.env.IMAP_GITHUB_CLIENT_ID,
    IMAP_GITHUB_CLIENT_SECRET: process.env.IMAP_GITHUB_CLIENT_SECRET,
    IMAP_GITHUB_ACCESS_TOKEN_URL: process.env.IMAP_GITHUB_ACCESS_TOKEN_URL,
    IMAP_GITHUB_REDIRECT_URL: process.env.IMAP_GITHUB_REDIRECT_URL,
    IMAP_GITHUB_USER: process.env.IMAP_GITHUB_USER,
  };

  return config;
};

'use strict';

/**
 * 默认配置项
 * @return {Object} config - 配置项
 */
module.exports = () => {
  const config = exports = {};

  // 安全
  config.security = {
    methodnoallow: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };

  // 数据解析
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100mb',
    jsonLimit: '10mb',
    strict: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
  };

  // 文件上传
  exports.multipart = {
    fileSize: '3mb',
    whitelist: [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.wbmp',
      '.webp',
    ],
  };

  // 返回格式处理中间件
  config.responseHandler = {
    enable: true,
    ignore: [
      /\/template/,
    ],
  };

  // 模板渲染
  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  // 鉴权中间件
  config.jwt = {
    enable: true,
    key: 'user',
    ignore: [
      '/v1/login',
      '/v1/register',
      '/v1/reset',
      /\/oauth/,
      /\/template/,
    ],
  };

  // 国际化
  exports.i18n = {
    defaultLocale: 'zh-CN',
    queryField: 'lang',
    cookieField: 'lang',
    cookieMaxAge: '1y',
  };


  // 中间件加载顺序
  config.middleware = [
    'cors',
    'errorHandler',
    'responseHandler',
    'jwt',
  ];

  return config;
};


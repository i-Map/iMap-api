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

  return config;
};


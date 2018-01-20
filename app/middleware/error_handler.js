'use strict';

module.exports = () => {
  /**
   * 错误处理中间件
   * @param {Object} ctx 上下文
   * @param {Function} next 继续下文
   * @return {void}
   */
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.app.emit('error', error);
      if (isNaN(error.code)) {
        ctx.body = {
          code: 1,
          msg: error.message,
          error: error.errors,
        };
        ctx.status = 500;
      } else if (error.code || error.rawMessage) {
        ctx.body = {
          code: Number(error.code),
          msg: error.rawMessage || error.message,
        };
        ctx.status = 500;
      } else if (error.message) {
        ctx.body = {
          code: 2,
          msg: error.message,
        };
        ctx.status = 401;
      } else {
        ctx.body = {
          code: 3,
          msg: 'Server Error',
        };
        ctx.status = 500;
      }
    }
  };
};

'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    app.AV.Cloud.useMasterKey();
  });
};

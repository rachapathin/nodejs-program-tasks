let SwaggerExpress = require('swagger-express-mw');
let app = require('express')();

module.exports = app; // for testing

let config = {appRoot: __dirname, // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/users']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/rachapathin/nodejs-program-tasks/1.0.0/users');
  }
});

const loginController = require('../controllers/loginController');

async function loginRoutes(fastify, options) {
  fastify.post('/login-history', loginController.createLoginEntry);
  fastify.get('/login-history', loginController.getLoginHistory);
  fastify.get('/login-history/count', loginController.getLoginCount);
}

module.exports = loginRoutes;
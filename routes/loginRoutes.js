const loginController = require('../controllers/loginController');

async function loginRoutes(fastify, options) {
  fastify.post('/login-history', loginController.createLoginEntry);
  fastify.get('/login-history', loginController.getLoginHistory);
}

module.exports = loginRoutes;
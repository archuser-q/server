const LoginHistory = require('../models/LoginHistory');

exports.createLoginEntry = async (request, reply) => {
  const { username, status } = request.body;
  const history = new LoginHistory({
    username,
    ip: request.ip,
    status,
    timestamp: new Date()
  });
  await history.save();
  return { message: "Login history saved" };
};

exports.getLoginHistory = async (request, reply) => {
  const { username } = request.query;
  let query = {};
  if (username) {
    query.username = username.trim();
  }
  const list = await LoginHistory.find(query).sort({ timestamp: -1 });
  return list;
};
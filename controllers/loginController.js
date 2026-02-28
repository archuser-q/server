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

exports.getLoginCount = async (request, reply) => {
  try {
    const { username } = request.query;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const pipeline = [
      {
        $match: {
          timestamp: { $gte: sevenDaysAgo },
          ...(username ? { username: username.trim() } : {})
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } },
      {
        $project: {
          _id: 0,
          timestamp: "$_id",
          count:1
        }
      }
    ];
    const stats = await LoginHistory.aggregate(pipeline);
    return {
      success: true,
      data: stats
    };
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const fastifyCors = require('@fastify/cors');
const loginRoutes = require('./routes/loginRoutes');
require('dotenv').config();

fastify.register(fastifyCors, { origin: process.env.CORS_ORIGIN });

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => fastify.log.info("MongoDB connected"))
  .catch(err => fastify.log.error("MongoDB connection error:", err));

fastify.register(loginRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT, host: process.env.HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
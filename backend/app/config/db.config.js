const defaultUrl = "mongodb://localhost:27017/dd_db";

module.exports = {
  // In containers / production, override with MONGODB_URI (e.g. mongodb://mongo:27017/dd_db)
  url: process.env.MONGODB_URI || defaultUrl
};


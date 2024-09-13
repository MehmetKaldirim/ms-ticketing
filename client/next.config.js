module.exports = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Increase poll interval or disable polling
      aggregateTimeout: 300,
    };
    return config;
  },
};

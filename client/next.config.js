module.exports = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 50000, // Check for changes every second
      aggregateTimeout: 30000, // Delay before rebuilding
      ignored: /node_modules/, // Ignore node_modules to prevent unnecessary reloads
    };
    return config;
  },
};

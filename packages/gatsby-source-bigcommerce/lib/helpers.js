const packageName = require('../package.json').name;

const consoleMessage = (message, type) => console[type || 'warn'](`${packageName}:`, message);

module.exports = { consoleMessage };

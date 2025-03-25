const fs = require("fs");
const path = require("path");

require("dotenv").config();

const configPath = path.resolve(__dirname, "config.json");
const rawConfig = fs.readFileSync(configPath, "utf8");

const configWithEnv = rawConfig.replace(
  /process\.env\.(\w+)/g,
  (match, envVar) => process.env[envVar] || ""
);

const config = JSON.parse(configWithEnv);

module.exports = config;

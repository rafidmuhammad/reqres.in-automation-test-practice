const dotenv = require("dotenv");
const axios = require("axios").default;
const { matchersWithOptions } = require("jest-json-schema");

module.exports = { dotenv, axios, matchersWithOptions };

// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const defaultBlockList = config.resolver.blockList || [];

config.resolver.blockList = [...defaultBlockList, /.*\.test\.tsx?$/, /.*\.spec\.tsx?$/];

module.exports = config;
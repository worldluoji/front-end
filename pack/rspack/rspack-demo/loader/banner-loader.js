const BANNER = `/**
 * Copyright (c) 2023-present Luke Luo, Inc.
 * https://github.com/worldluoji/front-end
 */`;

module.exports = function (content) {
  return `${BANNER}\n${content}`;
};
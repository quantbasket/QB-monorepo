// Package scripts workaround for read-only package.json
module.exports = {
  scripts: {
    "build:dev": "node build-dev.js",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
};
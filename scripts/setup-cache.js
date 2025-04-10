const fs = require('fs');
const path = require('path');

// Create .next directory if it doesn't exist
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  fs.mkdirSync(nextDir);
}

// Create cache directory if it doesn't exist
const cacheDir = path.join(nextDir, 'cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

console.log('Cache directory setup complete'); 
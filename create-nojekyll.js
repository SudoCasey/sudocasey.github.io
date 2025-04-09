const fs = require('fs');
const path = require('path');

// Create the out directory if it doesn't exist
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// Create the .nojekyll file
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
console.log('Created .nojekyll file in out directory'); 
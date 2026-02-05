const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GAME_REPO_URL = 'https://github.com/SudoCasey/Cookie_Clicker_Clone.git';
const GAME_DIR = path.join(process.cwd(), 'cookie-clicker-game');
const TARGET_DIR = path.join(process.cwd(), 'src', 'app', 'cookie-clicker', 'game');

console.log('Setting up Cookie Clicker game...');

try {
  // Clone or pull the game repository
  if (fs.existsSync(GAME_DIR)) {
    console.log('Game directory exists, pulling latest changes...');
    try {
      execSync('git pull', { cwd: GAME_DIR, stdio: 'inherit' });
    } catch (error) {
      console.log('Git pull failed, trying fresh clone...');
      fs.rmSync(GAME_DIR, { recursive: true, force: true });
      execSync(`git clone ${GAME_REPO_URL} ${GAME_DIR}`, { stdio: 'inherit' });
    }
  } else {
    console.log('Cloning game repository...');
    execSync(`git clone ${GAME_REPO_URL} ${GAME_DIR}`, { stdio: 'inherit' });
  }

  // Create target directory if it doesn't exist
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  // Copy game source files to the app directory
  const gameSrcDir = path.join(GAME_DIR, 'src');
  if (fs.existsSync(gameSrcDir)) {
    console.log('Copying game files...');
    
    // Copy the entire src directory structure
    function copyRecursiveSync(src, dest) {
      const exists = fs.existsSync(src);
      const stats = exists && fs.statSync(src);
      const isDirectory = exists && stats.isDirectory();
      
      if (isDirectory) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
          copyRecursiveSync(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    }

    // Clean target directory first
    if (fs.existsSync(TARGET_DIR)) {
      fs.rmSync(TARGET_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TARGET_DIR, { recursive: true });

    // Copy game source files
    copyRecursiveSync(gameSrcDir, TARGET_DIR);

    // Copy public assets (like cookie.png)
    const gamePublicDir = path.join(GAME_DIR, 'public');
    const targetPublicDir = path.join(process.cwd(), 'public', 'cookie-clicker');
    const publicRoot = path.join(process.cwd(), 'public');
    
    if (fs.existsSync(gamePublicDir)) {
      if (fs.existsSync(targetPublicDir)) {
        fs.rmSync(targetPublicDir, { recursive: true, force: true });
      }
      fs.mkdirSync(targetPublicDir, { recursive: true });
      copyRecursiveSync(gamePublicDir, targetPublicDir);
      
      // Also copy cookie.png to public root for /cookie.png path
      const cookieImage = path.join(gamePublicDir, 'cookie.png');
      if (fs.existsSync(cookieImage)) {
        fs.copyFileSync(cookieImage, path.join(publicRoot, 'cookie.png'));
      }
    }

    // Copy styles directory to src/styles so @/styles alias works
    const gameStylesDir = path.join(GAME_DIR, 'src', 'styles');
    const targetStylesDir = path.join(TARGET_DIR, 'styles');
    const srcStylesDir = path.join(process.cwd(), 'src', 'styles');
    
    if (fs.existsSync(gameStylesDir)) {
      // Copy to game directory (for relative imports)
      if (fs.existsSync(targetStylesDir)) {
        fs.rmSync(targetStylesDir, { recursive: true, force: true });
      }
      copyRecursiveSync(gameStylesDir, targetStylesDir);
      
      // Copy to src/styles so @/styles alias works (overwrite existing if needed)
      if (!fs.existsSync(srcStylesDir)) {
        fs.mkdirSync(srcStylesDir, { recursive: true });
      }
      
      // Copy each style file to src/styles
      const styleFiles = fs.readdirSync(gameStylesDir);
      styleFiles.forEach(file => {
        const srcFile = path.join(gameStylesDir, file);
        const destFile = path.join(srcStylesDir, file);
        if (fs.statSync(srcFile).isFile()) {
          fs.copyFileSync(srcFile, destFile);
        }
      });
    }

    console.log('Cookie Clicker game setup complete!');
  } else {
    console.error('Game source directory not found!');
    process.exit(1);
  }
} catch (error) {
  console.error('Error setting up Cookie Clicker game:', error.message);
  process.exit(1);
}

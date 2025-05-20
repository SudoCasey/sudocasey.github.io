const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Function to optimize an image in multiple sizes
async function optimizeImage(inputPath) {
  const outputDir = path.dirname(inputPath);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  
  // Skip if it's a favicon or apple-touch-icon
  if (baseName.includes('favicon') || baseName.includes('apple-touch-icon')) {
    return;
  }

  const sizes = [
    { width: 250, suffix: '-250' },
    { width: 500, suffix: '-500' },
    { width: 1000, suffix: '-1000' }
  ];

  try {
    for (const size of sizes) {
      const outputPath = path.join(
        outputDir,
        `${baseName}${size.suffix}.webp`
      );
      
      // Skip if output file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping ${outputPath} - already exists`);
        continue;
      }

      await sharp(inputPath)
        .resize(size.width, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Generated ${outputPath}`);
    }
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

// Main optimization process
async function optimizeAllImages() {
  const imagesDir = path.join(process.cwd(), 'public/images');
  const allFiles = getAllFiles(imagesDir);
  
  // Filter for WebP files
  const webpFiles = allFiles.filter(file => 
    file.endsWith('.webp') && 
    !file.includes('-250.webp') && 
    !file.includes('-500.webp') && 
    !file.includes('-1000.webp')
  );

  // Optimize each image
  for (const webpFile of webpFiles) {
    await optimizeImage(webpFile);
  }
}

// Run the optimization
optimizeAllImages().then(() => {
  console.log('All image optimizations completed!');
}).catch(error => {
  console.error('Error during optimization process:', error);
}); 
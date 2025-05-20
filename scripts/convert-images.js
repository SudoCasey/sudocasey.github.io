const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

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

// Function to convert an image to WebP
async function convertToWebP(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
  // Skip if output file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${inputPath} - WebP already exists`);
    return;
  }

  try {
    await sharp(inputPath)
      .webp({ 
        lossless: true,
        effort: 6
      })
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to WebP`);
  } catch (err) {
    console.error(`Error converting ${inputPath}:`, err);
  }
}

// Main conversion process
async function convertAllImages() {
  const imagesDir = path.join(__dirname, '../public/images');
  const allFiles = getAllFiles(imagesDir);
  
  // Filter for PNG and JPG files
  const imageFiles = allFiles.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file) && 
    !file.includes('favicon') && 
    !file.includes('apple-touch-icon')
  );

  // Convert each image
  for (const imageFile of imageFiles) {
    await convertToWebP(imageFile);
  }
}

// Run the conversion
convertAllImages().then(() => {
  console.log('All image conversions completed!');
}).catch(err => {
  console.error('Error during conversion process:', err);
}); 
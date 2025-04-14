const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesToOptimize = [
  {
    inputPath: path.join(process.cwd(), 'public/images/Soundboard/soundboard_tracker.webp'),
    outputDir: path.join(process.cwd(), 'public/images/Soundboard'),
    sizes: [
      { width: 250, height: 125, suffix: '-250' },
      { width: 500, height: 250, suffix: '-500' },
      { width: 1000, height: 500, suffix: '-1000' }
    ]
  },
  {
    inputPath: path.join(process.cwd(), 'public/images/Casey/CaseyFriedrich.webp'),
    outputDir: path.join(process.cwd(), 'public/images/Casey'),
    sizes: [
      { width: 100, height: 100, suffix: '-100' },
      { width: 200, height: 200, suffix: '-200' },
      { width: 400, height: 400, suffix: '-400' }
    ]
  },
  {
    inputPath: path.join(process.cwd(), 'public/images/ADAsh/ADAsh1.webp'),
    outputDir: path.join(process.cwd(), 'public/images/ADAsh'),
    sizes: [
      { width: 250, height: 125, suffix: '-250' },
      { width: 500, height: 250, suffix: '-500' },
      { width: 1000, height: 500, suffix: '-1000' }
    ]
  },
  {
    inputPath: path.join(process.cwd(), 'public/images/ADAsh/ADAsh2.webp'),
    outputDir: path.join(process.cwd(), 'public/images/ADAsh'),
    sizes: [
      { width: 250, height: 125, suffix: '-250' },
      { width: 500, height: 250, suffix: '-500' },
      { width: 1000, height: 500, suffix: '-1000' }
    ]
  },
  {
    inputPath: path.join(process.cwd(), 'public/images/ADAsh/ADAsh3.webp'),
    outputDir: path.join(process.cwd(), 'public/images/ADAsh'),
    sizes: [
      { width: 250, height: 125, suffix: '-250' },
      { width: 500, height: 250, suffix: '-500' },
      { width: 1000, height: 500, suffix: '-1000' }
    ]
  },
  {
    inputPath: path.join(process.cwd(), 'public/images/ADAsh/ADAsh4.webp'),
    outputDir: path.join(process.cwd(), 'public/images/ADAsh'),
    sizes: [
      { width: 250, height: 125, suffix: '-250' },
      { width: 500, height: 250, suffix: '-500' },
      { width: 1000, height: 500, suffix: '-1000' }
    ]
  },
  {
    inputPath: path.join(process.cwd(), 'public/images/CCPlugin/CC_Gif.gif'),
    outputDir: path.join(process.cwd(), 'public/images/CCPlugin'),
    sizes: [
      { width: 250, height: 125, suffix: '-250' },
      { width: 500, height: 250, suffix: '-500' },
      { width: 1000, height: 500, suffix: '-1000' }
    ]
  }
];

async function optimizeImages() {
  try {
    for (const image of imagesToOptimize) {
      // Ensure output directory exists
      if (!fs.existsSync(image.outputDir)) {
        fs.mkdirSync(image.outputDir, { recursive: true });
      }

      // Generate each size
      for (const size of image.sizes) {
        const outputPath = path.join(
          image.outputDir,
          `${path.basename(image.inputPath, path.extname(image.inputPath))}${size.suffix}.webp`
        );
        
        await sharp(image.inputPath)
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`Generated ${outputPath}`);
      }
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages(); 
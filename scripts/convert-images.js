const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Convert ADAsh images
const adashImages = [
  'ADAsh1.png',
  'ADAsh2.png',
  'ADAsh3.png',
  'ADAsh4.png'
];

adashImages.forEach(image => {
  const inputPath = path.join(__dirname, '../public/images/ADAsh', image);
  const outputPath = path.join(__dirname, '../public/images/ADAsh', image.replace('.png', '.webp'));
  
  sharp(inputPath)
    .resize(500, 250, {
      fit: 'cover',
      position: 'top'
    })
    .webp({ 
      lossless: true,
      effort: 6
    })
    .toFile(outputPath)
    .then(() => console.log(`Converted ${image} to WebP`))
    .catch(err => console.error(`Error converting ${image}:`, err));
});

// Convert CCPlugin GIF to WebP
const ccGifPath = path.join(__dirname, '../public/images/CCPlugin/CC_Gif.gif');
const ccWebpPath = path.join(__dirname, '../public/images/CCPlugin/CC.webp');

sharp(ccGifPath)
  .resize(500, 250, {
    fit: 'cover',
    position: 'top'
  })
  .webp({ 
    lossless: true,
    effort: 6
  })
  .toFile(ccWebpPath)
  .then(() => console.log('Converted CC_Gif.gif to WebP'))
  .catch(err => console.error('Error converting CC_Gif.gif:', err)); 
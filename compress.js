import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './public/nest-raw';
const outputDir = './public';

const files = [
  'RENDER EKSTERIOR 1 (1).png',
  'RENDERAN EKSTERIOR 5 (3).png',
  'RENDERAN TAMAN 5.png',
  'RENDERAN TAMAN 6 (1).png',
  'RENDERAN TAMAN 6.png'
];

async function run() {
  console.log('Starting image compression...');
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const inputPath = path.join(inputDir, filename);
    const outputName = `nest${i + 1}.webp`;
    const outputPath = path.join(outputDir, outputName);

    if (fs.existsSync(inputPath)) {
      console.log(`Processing: ${filename} -> ${outputName}`);
      try {
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Successfully created ${outputName}`);
      } catch (err) {
        console.error(`Error processing ${filename}:`, err);
      }
    } else {
      console.warn(`File not found: ${inputPath}`);
    }
  }
  console.log('All images processed!');
}

run();

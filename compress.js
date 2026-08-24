import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './public/nest-raw';
const outputDir = './public';

// Get prefix from command line arguments, default to 'mv'
const prefix = process.argv[2] || 'mv';

async function run() {
  console.log(`Starting image compression with prefix: "${prefix}"...`);

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`);
    return;
  }

  // Read directory files
  let files = fs.readdirSync(inputDir);

  // Filter for images (png, jpg, jpeg)
  files = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
  });

  if (files.length === 0) {
    console.warn(`No image files found in ${inputDir}`);
    return;
  }

  // Sort files numerically by extracting the first sequence of digits
  files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/) || 0, 10);
    const numB = parseInt(b.match(/\d+/) || 0, 10);
    return numA - numB;
  });

  console.log(`Found ${files.length} images. Sorting order:`);
  console.log(files.map((f, i) => `${i + 1}: ${f}`).join('\n'));

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const inputPath = path.join(inputDir, filename);
    const outputName = `${prefix}${i + 1}.webp`;
    const outputPath = path.join(outputDir, outputName);

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
  }
  console.log('All images processed successfully!');
}

run();

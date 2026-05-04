import { defineConfig } from 'astro/config';
import path from 'path';
import fs from 'fs/promises';
import { glob } from 'glob';
import type { AstroConfig } from 'astro';

export function imageProcessor() {
  return {
    name: 'image-processor',
    hooks: {
      'astro:config:setup': async ({ config }: { config: AstroConfig }) => {
        console.log('Image processor starting...');
        
        const rootDir = typeof config.root === 'string' ? config.root : config.root.pathname;
        const contentDir = path.join(rootDir, 'src', 'content');
        const publicDir = path.join(rootDir, 'public');
        const imageDir = path.join(publicDir, 'images');
        console.log('publicDir', publicDir);
        console.log('Content directory:', contentDir);
        console.log('Public directory:', publicDir);
        console.log('Image directory:', imageDir);

        await fs.mkdir(imageDir, { recursive: true });
        console.log('Image directory created or already exists');

        console.log('Processing Markdown files...');
        const mdFiles = await glob('**/*.md', { cwd: contentDir });
        for (const mdFile of mdFiles) {
            console.log("mdFile", mdFile);
            const filePath = path.join(contentDir, mdFile);
            let content = await fs.readFile(filePath, 'utf-8');
            const imgRegex = /<img\s+src=["'](.+?)["']/g;
            let match;
            while ((match = imgRegex.exec(content))) {
            // Only process paths that start with ./assets
            if (match[1].startsWith('./assets') || match[1].startsWith('assets')) {
                const src = match[1];
                // Get the full path
                const fullPath = path.join(contentDir, mdFile,"../",src);
                console.log("src", src);
                console.log("fullPath", fullPath);
                const destPath = path.join(imageDir, mdFile,"../",src);
                console.log("destPath", destPath);
                await fs.mkdir(path.dirname(destPath), { recursive: true });
                await fs.copyFile(fullPath, destPath);
                // Replace the img src with newSrc
                const newSrc = `/images/${path.relative(contentDir, fullPath)}`;
                console.log("newSrc", newSrc);
                content = content.replace(`<img src="${src}"`, `<img src="${newSrc}"`);
                console.log(`Replaced ${src} with ${newSrc}`);
                await fs.writeFile(filePath, content);

            }
        //     await fs.mkdir(imageDir, { recursive: true });
        //     console.log('Image directory created or already exists');
        //     const sourcePath = path.join(contentDir, match[1]);
        //     console.log("sourcePath", sourcePath);
        //     const destPath = path.join(imageDir, match[1]);
        //     console.log("destPath", destPath);
        //     await fs.mkdir(path.dirname(destPath), { recursive: true });
        //     await fs.copyFile(sourcePath, destPath);
            // const fileName = path.basename(match[1]);
            // const newSrc = `/images/${fileName}`;
            // content = content.replace(match[0], `<img src="${newSrc}"`);
            // console.log(`Replaced ${match[1]} with ${newSrc}`);
        }
        }
    }
      
    }
  };
}  

//         // Replace <img> src attributes
//         content = content.replace(
//             /<img\s+src=["'](.+?)["']/g,
//             (match, src) => {
//             console.log("================================")
//             console.log('match', match);
//             console.log('src', src);
//             const fileName = path.basename(src);
//             console.log('fileName', fileName);
//             const newSrc = `/images/${fileName}`;
//             return `<img src="${newSrc}"`;
//             }
//         );

//    await fs.writeFile(filePath, content);


//         try {
//           await fs.mkdir(imageDir, { recursive: true });
//           console.log('Image directory created or already exists');

//           console.log('Searching for images...');
//           const images = await glob('**/*.{png,jpg,jpeg,gif,webp,svg}', { cwd: contentDir });
//           console.log(`Found ${images.length} images`);

//           // Process images in batches
//           const batchSize = 10;
//           const staticLinks = [];
//           for (let i = 0; i < images.length; i += batchSize) {
//             const batch = images.slice(i, i + batchSize);
//             const batchLinks = await Promise.all(
//               batch.map(async (image) => {
//                 const sourcePath = path.join(contentDir, image);
//                 const destPath = path.join(imageDir, image);
//                 await fs.mkdir(path.dirname(destPath), { recursive: true });
//                 await fs.copyFile(sourcePath, destPath);
//                 return `/images/${image}`;
//               })
//             );
//             staticLinks.push(...batchLinks);
//             console.log(`Processed ${i + batch.length} / ${images.length} images`);
//           }

         
//           }
//           console.log(`Processed ${mdFiles.length} Markdown files`);

//           console.log('Image processor finished');

//           // Print out the generated static links
//           console.log('Static image links generated:');
//           staticLinks.forEach(link => console.log(link));

//           // You can still keep the original console.log if needed
//           // console.log('Static image links generated:', staticLinks);
//         } catch (error) {
//           console.error('Error in image processor:', error);
//         }
//       }
//     }
//   };
// }

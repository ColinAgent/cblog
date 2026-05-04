import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import { SITE } from './src/config.ts'
import { remarkReadingTime } from './src/support/time.ts'
// import { imageProcessor } from './src/support/imgproccer.ts'

// Create a simple remark plugin that converts Markdown image scale attributes into styles
function remarkImageScale() {
  return function transformer(tree) {
    // Traverse the AST with the MDX API
    function visitor(node) {
      // Check whether this is an image node
      if (node.type === 'image' && node.url) {
        // Check whether the image URL contains "?width=" or "?scale=" parameters
        const urlParts = node.url.split('?');
        if (urlParts.length === 2) {
          const url = urlParts[0];
          const paramsString = urlParts[1];
          const params = new URLSearchParams(paramsString);
          
          // Set width or scale ratio
          const width = params.get('width');
          const scale = params.get('scale');
          
          // Update the image node URL and attributes
          node.url = url;
          node.data = node.data || {};
          node.data.hProperties = node.data.hProperties || {};
          
          // Set style attributes
          let style = '';
          if (width) {
            style += `width: ${width}px; `;
          }
          if (scale) {
            style += `transform: scale(${scale}); transform-origin: center; `;
          }
          
          if (style) {
            node.data.hProperties.style = style;
          }
        }
      }
    }
    
    // Traverse all nodes
    function visitNodes(tree) {
      if (Array.isArray(tree.children)) {
        tree.children.forEach((node) => {
          visitor(node);
          if (node.children) {
            visitNodes(node);
          }
        });
      }
    }
    
    visitNodes(tree);
  };
}

export default defineConfig({
    site: SITE.url,
    image: {},
    integrations: [
        // imageProcessor(),
        mdx(),
        sitemap(),
        tailwind(),
        react(),
        partytown(),
       
        (await import('@playform/compress')).default({
            CSS: true,
            HTML: true,
            Image: false, // too slow when deploy to production,
            JavaScript: true,
            SVG: true,
            Logger: 2,
        }),
    ],
    markdown: {
        remarkPlugins: [remarkReadingTime, remarkImageScale],
        shikiConfig: {
            themes: {
                light: 'material-theme-lighter',
                dark: 'one-dark-pro',
            },
            wrap: false,
        },
    },
    output: 'static',
    // experimental: {
    //     clientPrerender: true,
    //     directRenderScript: true,
    // },
})

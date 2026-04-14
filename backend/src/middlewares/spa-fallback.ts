/**
 * SPA Fallback Middleware
 * Serves React build files and redirects all non-API routes to index.html
 */

import path from 'path';
import express from 'express';

export default (config: any, { strapi }: any) => {
  return async (ctx: any, next: any) => {
    // Only apply to non-API requests
    if (!ctx.path.startsWith('/api') && !ctx.path.startsWith('/admin') && !ctx.path.startsWith('/content-manager')) {
      const frontendPath = path.join(__dirname, '../../..', 'frontend', 'build');
      const filePath = path.join(frontendPath, ctx.path);

      // Try to serve the requested file
      try {
        await require('fs').promises.access(filePath);
        ctx.type = 'application/javascript';
        ctx.body = require('fs').createReadStream(filePath);
        return;
      } catch (err) {
        // File doesn't exist, serve index.html for SPA routing
        try {
          const indexPath = path.join(frontendPath, 'index.html');
          await require('fs').promises.access(indexPath);
          ctx.type = 'text/html';
          ctx.body = require('fs').createReadStream(indexPath);
          return;
        } catch (indexErr) {
          // index.html doesn't exist either
        }
      }
    }

    await next();
  };
};

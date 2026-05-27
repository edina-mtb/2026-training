import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 4321);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

function resolvePath(urlPath) {
  if (urlPath === '/' || urlPath === '') {
    return path.join(__dirname, 'index.html');
  }

  const normalized = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const directPath = path.join(__dirname, normalized);
  const publicPath = path.join(__dirname, 'public', normalized);

  if (existsSync(directPath) && statSync(directPath).isFile()) {
    return directPath;
  }

  if (existsSync(publicPath) && statSync(publicPath).isFile()) {
    return publicPath;
  }

  return path.join(__dirname, 'index.html');
}

const server = createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const filePath = resolvePath(requestUrl.pathname);
    const ext = path.extname(filePath).toLowerCase();
    const content = await readFile(filePath);

    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=300',
    });
    res.end(content);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Server error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Static site running at http://127.0.0.1:${PORT}/`);
});

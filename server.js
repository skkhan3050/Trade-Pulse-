const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.php': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(reqUrl.pathname);

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);

  // Handle POST routes for PHP form submissions
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      let formData = {};
      const contentType = req.headers['content-type'] || '';
      
      if (contentType.includes('multipart/form-data')) {
        const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
        if (boundaryMatch) {
          const boundary = boundaryMatch[1] || boundaryMatch[2];
          const parts = body.split('--' + boundary);
          parts.forEach(part => {
            const nameMatch = part.match(/name="([^"]+)"/);
            if (nameMatch) {
              const fieldName = nameMatch[1];
              const valueMatch = part.split(/\r?\n\r?\n/);
              if (valueMatch.length > 1) {
                const val = valueMatch[1].split(/\r?\n/)[0];
                formData[fieldName] = val.trim();
              }
            }
          });
        }
      } else {
        formData = querystring.parse(body);
      }

      if (pathname === '/mail.php') {
        const payload = new URLSearchParams({
          sheet_name: 'Sheet1',
          spreadsheet_id: '15YLBv2kSTBEEf7VzjzZyCYM4FgGUwWUrpnvz_YEIzQI',
          sheet_url: 'https://docs.google.com/spreadsheets/d/15YLBv2kSTBEEf7VzjzZyCYM4FgGUwWUrpnvz_YEIzQI/edit?usp=sharing',
          name: formData.name || '',
          phone: formData.phone || '',
          email: formData.email || '',
          background: formData.background || '',
          experience: formData.experience || '',
          payment_id: 'Not Applicable - Free Workshop'
        });

        // Fire-and-forget to Google Apps Script asynchronously
        fetch('https://script.google.com/macros/s/AKfycbzgXrNUhQy9rnVrXprf94f8Hi-kPuGDeDhblNFt0B7aINKa9oqxS7KRGd-pkpZM5Gqb/exec', {
          method: 'POST',
          body: payload
        }).catch(err => console.error('Background Google Sheet Sync Error:', err.message));

        // Instant response to client (< 20ms)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success' }));
        return;
      }

      if (pathname === '/register_demo.php') {
        const payload = new URLSearchParams({
          sheet_name: 'Sheet1',
          spreadsheet_id: '15YLBv2kSTBEEf7VzjzZyCYM4FgGUwWUrpnvz_YEIzQI',
          sheet_url: 'https://docs.google.com/spreadsheets/d/15YLBv2kSTBEEf7VzjzZyCYM4FgGUwWUrpnvz_YEIzQI/edit?usp=sharing',
          name: formData.name || '',
          phone: formData.phone || '',
          email: formData.email || '',
          background: formData.background || 'N/A',
          experience: formData.experience || 'N/A',
          payment_id: 'Free Workshop'
        });

        fetch('https://script.google.com/macros/s/AKfycbzgXrNUhQy9rnVrXprf94f8Hi-kPuGDeDhblNFt0B7aINKa9oqxS7KRGd-pkpZM5Gqb/exec', {
          method: 'POST',
          body: payload
        }).catch(err => console.error('Background Google Sheet Sync Error:', err.message));

        res.writeHead(302, { 'Location': '/thank-you.php' });
        res.end();
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    });
    return;
  }

  // Handle GET requests
  if (pathname === '/') {
    pathname = fs.existsSync(path.join(PUBLIC_DIR, 'index.html')) ? '/index.html' : '/index.php';
  }

  let filePath = path.join(PUBLIC_DIR, pathname);

  // If path has no extension and doesn't exist, try appending .html or .php
  if (!fs.existsSync(filePath) && !path.extname(pathname)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(filePath + '.php')) {
      filePath += '.php';
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 TradePulse Local Web Server Running!`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`📄 Pages:`);
  console.log(`   - Home (HTML): http://localhost:${PORT}/index.html`);
  console.log(`   - Home (PHP):  http://localhost:${PORT}/index.php`);
  console.log(`   - Training:    http://localhost:${PORT}/training.php`);
  console.log(`   - Thank You:   http://localhost:${PORT}/thank-you.php`);
  console.log(`=================================================`);
});

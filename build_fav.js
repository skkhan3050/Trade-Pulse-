const { execSync } = require('child_process');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const cmd = `"${edgePath}" --headless --disable-gpu --window-size=128,128 --screenshot=favicon.png http://localhost:3000/generate_favicon.html`;

try {
  execSync(cmd);
  console.log('favicon.png generated successfully!');
  fs.copyFileSync('favicon.png', 'favicon.ico');
  console.log('favicon.ico updated!');
} catch(err) {
  console.error('Error generating favicon:', err.message);
}

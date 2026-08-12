const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(
  /<a class="btn-primary" href="#demo">([\s\S]*?)Watch the Free Training<\/a>/,
  '<a class="btn-primary" href="training.php">$1Watch the Free Training</a>'
);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Fixed btn-primary href');

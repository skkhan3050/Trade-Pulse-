const fs = require('fs');

let content = fs.readFileSync('index.php', 'utf8');

// Change the sticky nav button
content = content.replace(
  /onclick="document\.getElementById\('demoModal'\)\.classList\.add\('show'\)"\s*>2 Days Workshop Register now/g,
  'href="https://goadslive002.wistia.com/medias/z93nnjir80" target="_blank">Watch the Free Training'
);

// Change the announce bar
content = content.replace(
  /href="javascript:void\(0\)"\s*onclick="document\.getElementById\('demoModal'\)\.classList\.add\('show'\)"([\s\S]*?)>Register for\s*2-Day Workshop now\.<\/a/g,
  'href="https://goadslive002.wistia.com/medias/z93nnjir80" target="_blank"$1>Watch the Free Training now.</a'
);

// Change ALL remaining triggers to open the Wistia video
// This covers the video banner and all other CTA buttons
content = content.replace(
  /onclick="document\.getElementById\('demoModal'\)\.classList\.add\('show'\)"/g,
  'onclick="window.open(\'https://goadslive002.wistia.com/medias/z93nnjir80\', \'_blank\')"'
);

content = content.replace(
  /onclick="\s*document\.getElementById\('demoModal'\)\.classList\.add\('show'\)\s*"/g,
  'onclick="window.open(\'https://goadslive002.wistia.com/medias/z93nnjir80\', \'_blank\')"'
);

// Update all occurrences of "Book Your 2-Day Workshop" to "Watch the Free Training"
content = content.replace(
  />\s*<i\s*class="fa-solid fa-graduation-cap"[^>]*><\/i>\s*Book Your\s*2-Day Workshop\s*<\/a/gi,
  '><i class="fa-solid fa-graduation-cap" style="margin-right: 8px"></i>Watch the Free Training</a'
);

content = content.replace(
  />Book Your\s*2-Day Workshop<\/a/gi,
  '>Watch the Free Training</a'
);

fs.writeFileSync('index.php', content, 'utf8');
console.log('Replacements made.');

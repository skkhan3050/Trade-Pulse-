const fs = require('fs');

['mail.php', 'register_demo.php'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /header\("Location: https:\/\/goadslive002\.wistia\.com\/medias\/z93nnjir80"\);/g,
    `if (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], 'training.php') !== false) {
            header("Location: thank-you.php");
        } else {
            header("Location: training.php");
        }`
  );
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Updated redirects.');

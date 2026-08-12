const fs = require('fs');

function fixFile(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');

    // Fix the button text we missed
    content = content.replace(/Pay â‚¹9 \(Refundable\) & Book/g, 'Pay 9 Rs and get 2 days workshop');
    
    // Some buttons might just be the string in innerHTML
    content = content.replace(/Pay â‚¹9 \(Refundable\) &amp; Book/g, 'Pay 9 Rs and get 2 days workshop');

    // Fix encoding corruptions caused by PowerShell 5.1 default ANSI read
    content = content.replace(/â€”/g, '—');
    content = content.replace(/Â·/g, '·');
    content = content.replace(/â€™/g, '\'');
    content = content.replace(/â‚¹/g, '₹');

    // Also remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }

    fs.writeFileSync(filename, content, 'utf8');
    console.log('Fixed encoding in ' + filename);
}

fixFile('index.php');
fixFile('register_demo.php');
fixFile('mail.php');

const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The banner HTML we used previously
const videoBannerHtml = `
          <div 
            class="video" 
            style="display: block; margin: 0 auto; position: relative; cursor: pointer; border-radius: 8px; overflow: hidden; max-width: 600px; margin-top: 20px;" 
            onclick="window.location.href='training.php'">
            <img src="bannerimageofvideosection.jpeg" alt="Workshop Banner" style="width: 100%; height: auto; display: block;" />
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <i class="fa-solid fa-play" style="color: white; font-size: 24px; margin-left: 4px;"></i>
            </div>
          </div>
`;

// Inject the video banner after the h1 in the hero section
content = content.replace(
  /<h1>Stop Guessing\.<br \/>Learn to <em>Trade<\/em> with a System\.<\/h1>/,
  '<h1>Stop Guessing.<br />Learn to <em>Trade</em> with a System.</h1>' + videoBannerHtml
);

// Update all occurrences of "Book Your Free 3-Day Demo" to "Watch the Free Training"
content = content.replace(/Book Your Free 3-Day Demo/gi, 'Watch the Free Training');
content = content.replace(/Book Your 3-Day Demo/gi, 'Watch the Free Training');
content = content.replace(/Register for the Free 3-Day Demo/gi, 'Watch the Free Training');
content = content.replace(/2 Days Workshop Register now/gi, 'Watch the Free Training now');
content = content.replace(/3-Day Demo/gi, '2-Day Workshop');
content = content.replace(/3 days/gi, '2 days');

// Point the hero button to training.php
content = content.replace(
  /<a class="btn-primary" href="#demo">([\s\S]*?)Watch the Free Training<\/a>/,
  '<a class="btn-primary" href="training.php">$1Watch the Free Training</a>'
);

// We need to also remove Razorpay from index.html if it's there
let razorpayStart = content.indexOf('<!-- Razorpay Checkout Integration -->');
if (razorpayStart !== -1) {
  let razorpayEnd = content.indexOf('</body>', razorpayStart);
  if (razorpayEnd !== -1) {
     content = content.substring(0, razorpayStart) + content.substring(razorpayEnd);
  }
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Restored video banner and removed razorpay from index.html.');

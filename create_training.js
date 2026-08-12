const fs = require('fs');
let indexContent = fs.readFileSync('index.html', 'utf8');

let headMatch = indexContent.match(/<head>([\s\S]*?)<\/head>/);
let headHtml = headMatch ? headMatch[0] : '';

// Extract the modal code and razorpay script
let modalMatch = indexContent.match(/<div class="modal-overlay" id="demoModal">[\s\S]*?<\/div>\s*<\/div>/);
let modalHtml = modalMatch ? modalMatch[0] : '';

let razorpayScriptMatch = indexContent.match(/<!-- Razorpay Checkout Integration -->[\s\S]*?<\/script>\s*<\/script>/);
let razorpayScript = razorpayScriptMatch ? razorpayScriptMatch[0] : '';

let trainingHtml = `<!DOCTYPE html>
<html lang="en">
${headHtml}
<body style="background-color: #f8fafc; background-image: radial-gradient(#e2e8f0 1px, transparent 1px); background-size: 20px 20px;">

  <div style="max-width: 800px; margin: 60px auto; padding: 20px; text-align: center;">
    <div style="display: inline-block; background-color: #e6fcf5; color: #0ca678; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; letter-spacing: 1px; margin-bottom: 20px; border: 1px solid #c3fae8;">
      ACCESS UNLOCKED &bull; FREE TRAINING READY
    </div>

    <h1 style="font-size: 48px; color: #1e293b; margin-bottom: 16px; letter-spacing: -1px; font-weight: 800;">
      You are in. Your <span style="color: #0ca678; text-decoration: underline; text-decoration-color: #ffe066; text-decoration-thickness: 4px;">free training</span> is ready.
    </h1>

    <p style="font-size: 18px; color: #64748b; margin-bottom: 40px; line-height: 1.6;">
      Welcome. Your access to the free training is unlocked below. It is about <strong>10 minutes</strong>, and it covers why most traders stay stuck, and the structured way serious traders actually learn.
    </p>

    <div style="box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; margin-bottom: 40px; border: 4px solid #e6fcf5;">
      <script src="https://fast.wistia.com/embed/medias/z93nnjir80.jsonp" async></script>
      <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
      <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
        <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
          <div class="wistia_embed wistia_async_z93nnjir80 videoFoam=true" style="height:100%;position:relative;width:100%">
            <div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;">
              <img src="https://fast.wistia.com/embed/medias/z93nnjir80/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="display: inline-block; background-color: #fff3bf; color: #b08d00; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 20px; border: 1px solid #ffec99;">
      <i class="fa-solid fa-circle" style="font-size: 8px; margin-right: 6px; position: relative; top: -2px;"></i> Hurry! Limited spots available.
    </div>

    <br/>

    <button onclick="document.getElementById('demoModal').classList.add('show')" style="background-color: #0ca678; color: white; border: none; padding: 16px 32px; font-size: 20px; font-weight: bold; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(12, 166, 120, 0.3); transition: all 0.2s;">
      Book your clarity call <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>
    </button>

    <p style="font-size: 14px; color: #94a3b8; margin-top: 16px; max-width: 500px; margin-left: auto; margin-right: auto;">
      Watch the full training first. Then book your clarity call only if you are serious about building a structured trading process.
    </p>

  </div>

  ${modalHtml}
  ${razorpayScript}
</body>
</html>`;

fs.writeFileSync('training.php', trainingHtml, 'utf8');

// Strip Razorpay from index.html
let newIndexContent = indexContent.replace(
  /<!-- Razorpay Checkout Integration -->[\s\S]*?<\/script>\s*<\/script>/g,
  ''
);

// We should also change the Wistia links in index.html to point to training.php
newIndexContent = newIndexContent.replace(
  /href="https:\/\/goadslive002\.wistia\.com\/medias\/z93nnjir80"/g,
  'href="training.php"'
);
newIndexContent = newIndexContent.replace(
  /onclick="window\.open\('https:\/\/goadslive002\.wistia\.com\/medias\/z93nnjir80',\s*'_blank'\)"/g,
  'onclick="window.location.href=\'training.php\'"'
);

fs.writeFileSync('index.html', newIndexContent, 'utf8');

console.log('Finished generating training.php and stripping index.html');

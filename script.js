const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const generateMemeButton = document.getElementById('generateMeme');
const downloadMemeButton = document.getElementById('downloadMeme');
const useDefaultButton = document.getElementById('useDefault');

let img = new Image();
canvas.width = 500;
canvas.height = 500;

// Load a default template when "Use Default Template" is clicked
useDefaultButton.addEventListener('click', () => {
  img.src = 'https://pbs.twimg.com/profile_images/1859127496576483328/bZ6p0sxU_400x400.jpg'; // Default meme template
  img.onload = () => drawMeme();
});

// Handle image upload
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
    img.onload = () => drawMeme();
  };
  reader.readAsDataURL(file);
});

// Draw the meme
function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Meme text settings
  ctx.font = '30px Impact';
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.textAlign = 'center';

  // Top text
  ctx.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, 40);
  ctx.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, 40);

  // Bottom text
  ctx.fillText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 20);
  ctx.strokeText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 20);
}

// Generate meme when the button is clicked
generateMemeButton.addEventListener('click', drawMeme);

// Download the meme
downloadMemeButton.addEventListener('click', () => {
  const memeURL = canvas.toDataURL('image/png');
  downloadMemeButton.href = memeURL;
});


  const countDisplay = document.getElementById('countDisplay');
  const templeElem = document.getElementById('temple');
  const incrementBtn = document.getElementById('increment');

  async function updateImage(count) {
    if (count <= 130) {
      countDisplay.innerText = count + ' Total Visits';
      templeElem.src = `images/t-${count}.png`;
    } else {
      templeElem.src = `images/t-130.png`;
      countDisplay.innerText = 'We have met our goal!';
    }
  }

  incrementBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('https://therapyidahofalls.com/counter.php');
      const count = await response.text();
      if (count <= 130) {
      updateImage(count);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Optionally load the current count on page load without incrementing:
  // (Uncomment if you want to show the current image without bumping the count)
  
  (async () => {
    try {
      const response = await fetch('https://therapyidahofalls.com/get-counter.php');
      const count = await response.text();
      updateImage(count);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  


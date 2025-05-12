const countDisplay = document.getElementById('countDisplay');
  const templeElem = document.getElementById('temple');
  const incrementBtn = document.getElementById('increment');
  const undoBtn = document.getElementById('undo');

  // Initialize session storage for clicks this session
  if (!sessionStorage.getItem('sessionClicks')) { 
    sessionStorage.setItem('sessionClicks', '0'); 
  }

  // Initialize the displayed count on page load
  let displayedCount = 0;

  function updateImage(count) {
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
      // Increment the backend counter
      const response = await fetch('https://therapyidahofalls.com/counter.php');
      const newCount = await response.text();

      if (newCount <= 130) {
        displayedCount = Number(newCount);
        updateImage(displayedCount);

        // Increment the local session click counter
        let sessionClicks = sessionStorage.getItem('sessionClicks'); 
        sessionClicks = Number(sessionClicks) + 1;
        sessionStorage.setItem('sessionClicks', sessionClicks); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Optionally load the current count on page load
  (async () => {
    try {
      const response = await fetch('https://therapyidahofalls.com/get-counter.php');
      displayedCount = Number(await response.text());
      updateImage(displayedCount);
    } catch (error) {
      console.error('Error:', error);
    }
  })();


// Undo last click (only affects the local display and session count)
undoBtn.addEventListener('click', () => {
  let sessionClicks = Number(sessionStorage.getItem('sessionClicks') || '0'); // 
    if (sessionClicks > 0 && displayedCount > 0) {
      sessionClicks--;
      sessionStorage.setItem('sessionClicks', sessionClicks); // 
      displayedCount--; // Decrement the local displayed count
      updateImage(displayedCount);
    }
});
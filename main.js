  const countDisplay = document.getElementById('countDisplay');
  const templeElem = document.getElementById('temple');
  const monthsElem = document.getElementById('month');
  const incrementBtn = document.getElementById('increment');
  const undoBtn = document.getElementById('undo');
  

  // Initialize session storage for clicks this session
  sessionStorage.setItem('sessionClicks', '0');

  // Initialize the displayed count on page load
  let displayedCount;
  let monthCount;
  
  (async () => {
    try {
      // First get the month count
      const monthResponse = await fetch('https://therapyidahofalls.com/get-month-counter.php');
      monthCount = Number(await monthResponse.text());
      updateMonthImage(monthCount); // if you use this

      // Then get the regular count
      const countResponse = await fetch('https://therapyidahofalls.com/get-counter.php');
      displayedCount = Number(await countResponse.text());

      // Now both are ready
      updateImage(displayedCount);

    } catch (error) {
      console.error('Error:', error);
    }
  })();

  function updateImage(count) {
    countDisplay.innerText = (count + monthCount * 130) + '/1000' + ' Visits ';
    if (count <= 130) {
      templeElem.src = `images/t-${count}.png`;
    } else {
      templeElem.src = `images/t-130.png`;
      countDisplay.innerText = 'We have met our month goal!';
    }
  }

  async function updateMonth(){
      const mresponse = await fetch('https://therapyidahofalls.com/month-counter.php');
      const newMonCount = await mresponse.text();
      console.log(newMonCount);
        monthCount = Number(newMonCount);
        updateMonthImage(monthCount);
  }

  function updateMonthImage(monthCount) {
    if (monthCount <= 7 && monthCount >= 0) {
      monthsElem.src=`images/month-${monthCount}.png`;
    } else {
      monthsElem.src=`images/month-8.png`;
      countDisplay.innerText = 'We have met our goal!'
    }
  }

  incrementBtn.addEventListener('click', async () => {
    try {
      // Increment the backend counter
      const response = await fetch('https://therapyidahofalls.com/counter.php');
      const newCount = await response.text();
      
      let sessionClicks = Number(sessionStorage.getItem('sessionClicks')); 
      if (sessionClicks < 0) {
        sessionStorage.setItem(sessionClicks, 0);
      }
      if (newCount <= 130 && newCount >= 0) {
        
        displayedCount = Number(newCount);
        updateImage(displayedCount);

        // Increment the local session click counter
        sessionClicks++;
        sessionStorage.setItem('sessionClicks', sessionClicks); 
      } else {
        updateMonth();
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  });

  

  

// Undo last click (only affects the local display and session count)
undoBtn.addEventListener('click', async() => {
  let sessionClicks = Number(sessionStorage.getItem('sessionClicks')); // 
  if (sessionClicks < 1){
    return;
  }
      try {
        // Increment the backend counter
        const response = await fetch('https://therapyidahofalls.com/counter_minus.php');
        const newCount = await response.text();
  
        if (newCount <= 130 && newCount >= 0 && sessionClicks > 0 && sessionClicks >= 1) {
          displayedCount = Number(newCount);
          updateImage(displayedCount);
  
          // Decrement the local session click counter          
            sessionClicks--;
            console.log(sessionClicks);
            sessionStorage.setItem('sessionClicks', sessionClicks); 
          
        }
      } catch (error) {
        console.error('Error:', error);
      }
    
});
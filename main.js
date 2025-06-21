  const countDisplay = document.getElementById('countDisplay');
  const templeElem = document.getElementById('temple');
  const monthsElem = document.getElementById('month');
  const incrementBtn = document.getElementById('increment');
  const undoBtn = document.getElementById('undo');
  

  // Initialize session storage for clicks this session
  if (!sessionStorage.getItem('sessionClicks')) { 
    sessionStorage.setItem('sessionClicks', '0'); 
  }

  // Initialize the displayed count on page load
  let displayedCount = 0;
  let monthCount = 0;
  

  function updateImage(count) {
    //console.log(count);
    if (count <= 130) {
      countDisplay.innerText = (count + monthCount * 130) + '/1040' + ' Total Visits ';
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
    console.log(monthCount);
    if (monthCount <= 6 && monthCount >= 0) {
      monthsElem.src=`images/month-${monthCount}.png`;
    } else {
      monthsElem.src=`images/month-7.png`;
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

  // Load the current count on page load
  (async () => {
    try {
      const response = await fetch('https://therapyidahofalls.com/get-counter.php');
      displayedCount = Number(await response.text());
      updateImage(displayedCount);
    } catch (error) {
      console.error('Error:', error);
    }
  })();

  // Load the current month on page load
  (async () => {
    try {
      const response = await fetch('https://therapyidahofalls.com/get-month-counter.php');
      monthCount = Number(await response.text());
      updateMonthImage(monthCount);
    } catch (error) {
      console.error('Error:', error);
    }
  })();


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
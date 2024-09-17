localStorage.setItem("name" , "kaizhang")
let events = []
var calendarGrid;
var monthElement;
var currentMonths;
var year ;
let currentMonthIndex;
let currentMonth2;
let currentDay;
let currentYear;
let eventdet = true;
let editbar = true;
let infobar = true;
let chatbar = true;
var elmnt = document.getElementById("mydiv");
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;



document.addEventListener('DOMContentLoaded', function() {
  preloadImages(startAfterPreload);
});
function startAfterPreload(){

  checkName();
  checkOwnership();
  calendar();
  addExistingEvents();

  if(localStorage.getItem("curchat") == null){
    localStorage.setItem("curchat","general");
  }

  if (localStorage.getItem("curchat") == "general" && document.getElementById("chatbut2")) {
    document.getElementById("chatbut2").style.display = "none";
  } else if (document.getElementById("chatbut2")){
    document.getElementById("chatbut2").style.display = "block";
  }

  setTimeout(function() {
    document.querySelector('body').style.opacity = 1;
  }, 50);

  // Bounce-in effect
  const textElements = document.querySelectorAll('body *');
  textElements.forEach(element => {
    if (element.textContent.trim() && element.id !== "createeventbutton" && element.id !== "chaticon2" && element.id !== "chaticonimg") {
      element.classList.add('bounce-in');
    }
  });

  // Remove bounce-in class after 1 second
  setTimeout(function() {
    textElements.forEach(element => {
      if (element.id !== "createeventbutton" && element.id !== "chat2icon" && element.id !== "chaticonimg") {
        element.classList.remove('bounce-in');
      }
    });
  }, 1000); 

  // Set opacity to 1 after preload, avoid setting display
  document.getElementById("chaticon2").style.display= 'none';
  setTimeout(function() {
    document.getElementById("chaticon2").style.display= 'block';
  }, 900); // Delay slightly to prevent flickering
}



window.transitionToPage = function(href, id) {
  document.querySelector('body').style.opacity = 0
  setTimeout(function() { 
      window.location.href = href
  }, 300)
}

// Function to preload images
function preloadImages(callback) {
  var imageUrls = [
          "Croppedbackground1.png",
          "bell.png"
  ]
  // if (document.title == "index"){
  //     var imageUrls = [
  //         "Croppedbackground1.png"
  //     ]
  // }

  var loadedImagesCount = 0;
  var totalImages = imageUrls.length;

  function loadImage(url) {
    if (!url) {
      loadedImagesCount++;
      if (loadedImagesCount === totalImages-1) {
        callback();
      }
      return;
    }

    var img = new Image();
    img.src = url;

    img.onload = function() {

      loadedImagesCount++;
      if (loadedImagesCount === totalImages) {
        callback();
      }
    };

    img.onerror = function() {
      console.error("Error loading image: " + url);
      loadedImagesCount++;
      if (loadedImagesCount === totalImages) {
        callback();
      }
    };
  }

  imageUrls.forEach(function(url) {
    loadImage(url);
  });
}

function createEvent1() {  
  document.getElementById("myDropdown").classList.toggle("show");
}

function addExistingEvents(){
  //adding events
  fetch('data.json')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON data
  })
  .then(data => {       
    for (i = 0; i < data.length; i++) {
      addEvent2(data[i].title, data[i].data, data[i].place, data[i].duration, data[i].description); 

    }
  })
  .catch(error => {
      console.error('There was a problem with fetching the text file:', error);
  });
}

function checkName(){
  if(localStorage.getItem("name") == null){
    var signup = prompt("Please enter your name");

    fetch('members.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON data
    })
    .then(data => {
      console.log(data)
      while(localStorage.getItem("name")==null){
      if(!data.includes(signup)){
        localStorage.setItem("name",signup)
        $.ajax({
          type: "POST",
          url: "members.php",
          contentType: "application/json",
          data: JSON.stringify(signup),
          success: function(response) {
            console.log("Data sent successfully:", response);
          },
          error: function(error) {
            console.error("Error sending data:", error);
          }
        });
      } else{
        signup = prompt("Username taken, please enter a new one.")
      }
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

  }
}

function checkOwnership(){
  fetch('owners.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    if (data.includes(localStorage.getItem("name"))) {
        // Use querySelectorAll to select all elements with the 'adminonly' class
        var elements = document.querySelectorAll('.adminonly');

        // Loop through the NodeList using forEach
        elements.forEach(function(element) {
            // Example alert to show the element's id
            //alert(element.id);
            // Replace 'adminonly' with 'dropbtn' while keeping other classes intact
            element.classList.replace('adminonly', 'dropbtn');
        });
    }


  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

}

function calendar(){
    calendarGrid = document.getElementById('calendarGrid');
    monthElement = document.getElementById('month');

    currentMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   year = 2024;
    currentMonth = new Date()
    currentMonthIndex = currentMonth.getMonth();
  
    currentDay = currentMonth.getDate();
    currentMonth2 = currentMonth.getMonth()+1;
    currentYear = currentMonth.getFullYear();
      fetch('data.json')
       .then(response => response.json())
       .then(data => {
         for (i=0; i<data.length; i++){
           l=data[i].data.split("-");
           if(l[0]<= currentYear && l[1]<currentMonth2 || l[0] == currentYear && l[1] == currentMonth2 && l[2]+7<currentDay ){
             
             //funny thing
             var filename = encodeURIComponent(data[i].title) + ".txt";

             if (filename) {
                 $.ajax({
                     url: 'delete_file.php',
                     type: 'POST',
                     data: { filename: filename },
                     dataType: 'json',
                     success: function(response) {
                         $('#responseMessage').text(response.message);
                     },
                     error: function() {
                         $('#responseMessage').text('An error occurred while deleting the file.');
                     }
                 });
                
             }
           } 
         }
       
       })
       .catch(error => {
         console.error('Error fetching or parsing JSON:', error);
    });
  

    createCalendar();
}

function createCalendar() {
    calendarGrid.innerHTML = '';
    monthElement.textContent = currentMonths[currentMonthIndex] + " " + year;

    const daysInMonth = new Date(year, currentMonthIndex + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('calendar-day');
      const eventDate = `${year}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      dayDiv.innerHTML = `<span>${currentMonths[currentMonthIndex]} ${day}, ${year}</span><br>`;
      dayDiv.setAttribute('data-date', eventDate);
      calendarGrid.appendChild(dayDiv);

      if ((year > currentYear) || 
          (year === currentYear && currentMonthIndex+1 > currentMonth2) || 
          (year === currentYear && currentMonthIndex+1 === currentMonth2 && day >= currentDay)) {
          //avaliablebutton(dayDiv, currentMonthIndex+1, day, year);
      }
      if (year == currentYear && currentMonthIndex+1 == currentMonth2 && day == currentDay) {
        dayDiv.style.backgroundColor = "lightblue";
      }

  }
}

function avaliablebutton(dayDiv, currentMonthIndex, day,year){
  
  if (localStorage.getItem(`day-btn-${day}-${currentMonthIndex}-${year}`) == "Unavaliable"){
    const unavaliableButton = document.createElement('button');
    unavaliableButton.innerHTML = 'Unavaliable';
    unavaliableButton.classList.add('avbut');
    unavaliableButton.addEventListener('click', function() {
      unavaliableButton.remove();
      localStorage.setItem(`day-btn-${day}-${currentMonthIndex}-${year}`,"Avaliable");
      avaliablebutton(dayDiv, currentMonthIndex, day,year);
      dayDiv.style.backgroundColor = '#fff';
    });
    dayDiv.appendChild(unavaliableButton);
    dayDiv.style.backgroundColor = 'lightblue';
  }
  else{
    const dayButton = document.createElement('button');
    localStorage.setItem(`day-btn-${day}-${currentMonthIndex}-${year}`,"Avaliable");
    dayButton.innerHTML = 'Avaliable';
    dayButton.classList.add('avbut');
    dayButton.id = `day-btn-${day}-${currentMonthIndex}-${year}`; // Give each button a unique ID if needed
    dayButton.addEventListener('click', function() {
      localStorage.setItem(`day-btn-${day}-${currentMonthIndex}-${year}`,"Unavaliable");
      console.log(`Button for ${currentMonths[currentMonthIndex]} ${day}, ${year} clicked!`);
      dayButton.remove();
      const unavaliableButton = document.createElement('button');
      unavaliableButton.innerHTML = 'Unavaliable';
      unavaliableButton.classList.add('avbut');
      unavaliableButton.addEventListener('click', function() {
        unavaliableButton.remove();
        localStorage.setItem(`day-btn-${day}-${currentMonthIndex}-${year}`,"Avaliable");
        avaliablebutton(dayDiv, currentMonthIndex, day,year);
        dayDiv.style.backgroundColor = '#fff';
      });
      dayDiv.appendChild(unavaliableButton);
      dayDiv.style.backgroundColor = 'lightblue';
    });
    dayDiv.appendChild(dayButton);
  }
  
}

function switchtogeneral(){
  localStorage.setItem("curchat","general")
  displaychat()
  document.getElementById("chatTitle").innerHTML = localStorage.getItem("curchat");
  document.getElementById("chatbut2").style.display = "none";
}
//json testing
function send(){
  data = {
    title: document.getElementById("eventTitle").value,
    data: document.getElementById("eventDate").value,
    place: document.getElementById("eventLocation").value,
    duration: document.getElementById("eventDuration").value,
    description: document.getElementById("eventDescription").value,
    name: localStorage.getItem("name")
  }
      $.ajax({
        type: "POST",
        url: "calendar.php",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
          console.log("Data sent successfully:", response);
        },
        error: function(error) {
          console.error("Error sending data:", error);
        }
      });
}


// // Check if the current day has an event and add "Join" button
// const eventForDay = events.find(event => event.data === eventDate);

// if (eventForDay) {
//   alert("hi");
//   // Ensure the "Join" button stays on the event day
//   addJoinButtonAndEvent(dayDiv, eventForDay);
// }


function addJoinButtonAndEvent(dayDiv, eventForDay) {

  
  // Create the Join button
  const joinbtn = document.createElement('button');
  joinbtn.id = "joinbtn";
  joinbtn.innerHTML = 'Join';
  
  
  //   joinbtn.addEventListener('click', function() {
  
  // // Increment the member count when the join button is clicked
  // eventForDay.membersJoined += 1;
  // UpdateMemberCount(dayDiv, eventForDay);
  // });
  dayDiv.appendChild(joinbtn);

// Add the event title to the calendar day
const eventElement = document.createElement('div');
eventElement.classList.add('event');
eventElement.textContent = eventForDay.title;
dayDiv.appendChild(eventElement);

}
function joinEvent() {
  const title = document.getElementById("eventTitleDisplay").textContent.trim();
  const safeTitle = encodeURIComponent(title);  // Sanitizing the title
  var data = {
    title: document.getElementById("eventTitleDisplay").innerHTML,
    name: localStorage.getItem("name")
  };
  if(document.getElementById("joinbutton").innerHTML.trim() == "Join"){
    console.log("Sending data:", data); // Log the data to check its values
    if(document.getElementById('eventTitleDisplay').innerHTML.trim() == title){
      document.getElementById("joinbutton").innerHTML = "Joined";
      document.getElementById("joinbutton").style.backgroundColor = "lightblue";
      
        document.getElementById("mcount").textContent = parseInt(document.getElementById("mcount").textContent) + 1;
      
    }
    $.ajax({
        type: "POST",
        url: "attendance.php",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            console.log("Data sent successfully:", response);
        },
        error: function(error) {
            console.error("Error sending data:", error);
        }
    });
  } else {
    if(confirm("Are you sure you want to leave this event?")){
      document.getElementById("joinbutton").innerHTML = "Join";
      document.getElementById("mcount").textContent = parseInt(document.getElementById("mcount").textContent) - 1;
      document.getElementById("joinbutton").style.backgroundColor = "#52abff";
    $.ajax({
        type: "POST",
        url: "leave.php",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            console.log("Data sent successfully:", response);
        },
        error: function(error) {
            console.error("Error sending data:", error);
        }
    });
    }
  }
    
}


// // Update member count in real-time
// function updateMemberCount(dayDiv, eventForDay) {

//   fetch('data.json')
//   .then(response => response.json())
//   .then(data => {
//     // Step 2: Modify the part of the JSON object you want
//     data.members = data.members +1;  // Example change

//     // Step 3: Convert back to JSON
//     const updatedJsonData = JSON.stringify(data, null, 2);  // Pretty print for readability

//     // Output the updated JSON in the console (or send it back to a server)
//     console.log(updatedJsonData);

//     // Optional: You can use the updated data in the app or send it to a server for saving
//   })
//   .catch(error => {
//     console.error('Error fetching or parsing JSON:', error);
//   });
//   const memberCountDiv = dayDiv.querySelector('.member-count');
//   if (memberCountDiv) {
//     memberCountDiv.innerHTML = `Members Joined: ${eventForDay.membersJoined}`;
// }
// }

function changeMonth(direction) {
    currentMonthIndex += direction;
    if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        year = year - 1;
    } else if (currentMonthIndex > 11) {
        currentMonthIndex = 0;  
        year = year + 1
    }
  createCalendar();
  fetch('data.json')
  .then(response => {
      // Check if the response is successful
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON data
  })
  .then(data => {       
    for (i = 0; i < data.length;i++){
      addEvent2(data[i].title,data[i].data,data[i].place,data[i].duration,data[i].description); 
    }
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

// Function to display JSON data in the HTML
document.body.addEventListener('click', function (event) {
  // Check if the clicked element is not the button or any element inside the dropdown content
  if (!event.target.closest('.dropbtn') && !event.target.closest('.dropdown-content')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.closest('.event-details-panel') && document.getElementById("eventDetailsPanel").classList.contains("show-panel") && eventdet == false && infobar == true && editbar == true && !event.target.closest('.event') && chatbar == true){
    
    eventdet = true;
    closeEventDetails();
  }
  if (!event.target.closest('.event-details-panel2') && infobar == false){
    infobar = true;
    closeEventDetails2();
  }
  if (!event.target.closest('.event-details-panel2') && editbar == false){
    editbar = true;
    closeeditdet();
  }
  if (!event.target.closest('.mydiv') && !event.target.closest('.chatbuttonicon') && chatbar == false){
    chatbar = true;
    closechatbar();
  }
  
});

function addEvent2( title, date , place, duration, description) {

  const eventTitle = title;
  const eventDate = date;
  const year = parseInt(eventDate.split('-')[0],10);
  var month = parseInt(eventDate.split('-')[1],10);
  var day = parseInt(eventDate.split('-')[2],10);
  let red = false;
   // Initialize the `red` variable

  // Check if the year is before the current year
  if (year < currentYear) {
      red = true;
  }
  // If the year is the same, check the month
  else if (year === currentYear && month < currentMonth2) {
      red = true;
  }
  // If the year and month are the same, check the day
  else if (year === currentYear && month === currentMonth2 && day < currentDay) {
      red = true;
  }
  

  const eventplace = place;
  const eventDuration = duration +" hour(s)";
  const eventDescription = description;
  const payPiv = document.querySelector(`.calendar-day[data-date='${eventDate}']`);


  if (eventTitle.trim() === "" || eventDate === "") {
    console.log("Please enter both the event title and date.");
      return;
  }
  if (payPiv) {
      const eventElement = document.createElement('div');
      if (red){
        
        eventElement.style.backgroundColor = "orangered";
        eventElement.style.color = "black";
      }
      eventElement.classList.add('event');
      eventElement.textContent = eventTitle;

    eventElement.addEventListener('click', function () {
      
        showEventDetails(eventTitle || "", eventDate || "", eventplace || "", eventDuration || "", eventDescription || "");
    });

      payPiv.appendChild(eventElement);
  } else {
      console.log("Invalid date selected.");
  }

}

function addEvent() {

    send()
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;

    const eventplace = document.getElementById('eventLocation').value;
    const eventDuration = document.getElementById('eventDuration').value + " hour(s)";
    const eventDescription = document.getElementById('eventDescription').value;
    var year = parseInt(eventDate.split('-')[0],10);
    var month = parseInt(eventDate.split('-')[1],10);
    var day = parseInt(eventDate.split('-')[2],10);
    let red = false;
   // Initialize the `red` variable

  // Check if the year is before the current year
  if (year < currentYear) {
      red = true;
  }
  // If the year is the same, check the month
  else if (year === currentYear && month < currentMonth2) {
      red = true;
  }
  // If the year and month are the same, check the day
  else if (year === currentYear && month === currentMonth2 && day < currentDay) {
      red = true;
  }


    const dayDiv = document.querySelector(`.calendar-day[data-date='${eventDate}']`);

    if (dayDiv) {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.textContent = eventTitle;
        if (red){
  
          eventElement.style.backgroundColor = "orangered";
          eventElement.style.color = "black";
        }
        eventElement.addEventListener('click', function () {
    
        showEventDetails(eventTitle, eventDate, eventplace, eventDuration, eventDescription);
      });
        dayDiv.appendChild(eventElement);

    } else {
       console.log("Invalid date selected.");
    }

    document.getElementById('eventTitle').value = "";
    document.getElementById('eventDate').value = "";
}

// function checkEventTimes() {
//   const now = new Date();

//   // Loop through all the events and check if any are within 30, 10, or 5 minutes
//   events.forEach(event => {
//     const eventTime = new Date(event.data);  // Assuming event.data is the event date and time in a parseable format

//     const timeDifference = (eventTime - now) / 60000;  // Time difference in minutes

//     if (timeDifference <= 30 && timeDifference > 29.5) {
//       showNotification(`Event "${event.title}" is starting in 30 minutes!`);
//     } else if (timeDifference <= 10 && timeDifference > 9.5) {
//       showNotification(`Event "${event.title}" is starting in 10 minutes!`);
//     } else if (timeDifference <= 5 && timeDifference > 4.5) {
//       showNotification(`Event "${event.title}" is starting in 5 minutes!`);
//     }
//   });
// }

// // Function to show the notification
// function showNotification(message) {
//   if (Notification.permission === 'granted') {
//     new Notification(message);
//   }
// }

function showEventDetails(title, date, place, duration, description) {
  textLines = []
  document.getElementById('eventTitleDisplay').textContent = title;
  document.getElementById('eventDateDisplay').textContent = date;
  document.getElementById('eventPlaceDisplay').textContent = place;
  document.getElementById('eventLocationDisplay').textContent = duration;
  document.getElementById('eventDescriptionDisplay').textContent = description;
  const timezone = 'America/Los_Angeles'; // Example: Pacific Time (US & Canada)

  // Get the current date and time
  const now = new Date();

  // Format the date and time in the specified timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formatterTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
  });

  // Get the formatted date in MM/DD/YYYY format
  const eformattedDate = formatter.format(now);
  const formattedTime = formatterTime.format(now);

  // Rearrange the formattedDate to be in YYYY-MM-DD format
  const [month, day, year] = eformattedDate.split('/');
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate); // Output: 2024-09-13, 22:14:49
  fetch('data.json')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON data
  })
  .then(data => {       
    
    for (let i = 0; i < data.length; i++) {
      if(data[i].title == title){
        const event = data[i];

        // Extract event hours and minutes, converting to numbers for comparison
        const eventHours = parseInt(event.duration.slice(0, 2), 10);
        const eventMinutes = parseInt(event.duration.slice(3, 5), 10);

        // Extract current hours and minutes, converting to numbers for comparison
        const currentHours = parseInt(formattedTime.slice(0, 2), 10);
        const currentMinutes = parseInt(formattedTime.slice(3, 5), 10);


        // Ensure the event date is the same as today's date
        const isSameDay = event.data === formattedDate;

        // Check if the event has started by comparing hours and minutes
        const isEventStarted = (
            (eventHours < currentHours) || // If the event started in a previous hour
            (eventHours === currentHours && eventMinutes <= currentMinutes) // If it's the same hour, check minutes
        );
        
        // If both conditions are met, update the button text
        
        if (isSameDay && isEventStarted) {
          
            document.getElementById("joinbutton").textContent = "ATTENDANCE STARTED";
            break; // Exit loop as soon as attendance starts for any event
        }
        
      }
     
    }



  })
  .catch(error => {
      console.error('There was a problem with fetching the text file:', error);
  });
  

    
  if (document.getElementById('changechat')){
    document.getElementById('changechat').innerHTML = title + " Chat";
  }
  let eventDate = date;
  const panel = document.getElementById('eventDetailsPanel');
  const eventYear = eventDate.split('-')[0];
  const eventMonth = parseInt(eventDate.split('-')[1],10);
  const eventDay = parseInt(eventDate.split('-')[2],10);
  let joinButton = document.getElementById('joinbutton');

  //add eventDay == currentDay later;
 
  if (eventYear == currentYear && eventMonth == currentMonth2 && eventDay > currentDay) {
    

    if (joinButton) {
      textLines = []
        joinButton.style.display = 'block';
      const title = document.getElementById("eventTitleDisplay").textContent.trim();
      const safeTitle = encodeURIComponent(title);  // Sanitizing the title
      
      fetch(safeTitle + ".txt")
        
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Parse the JSON data
      })
      .then(data => {       
        const textLines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        const userName = localStorage.getItem("name");
        //alert(textLines.includes(userName))

        // Get the user's name from local storage
        if(document.getElementById('eventTitleDisplay').innerHTML == title){
          document.getElementById("mcount").textContent = textLines.length;
        }

        // Check if the user's name is in the list of names for this event
        document.getElementById("closeevent").style.display = "block";
        document.getElementById("changechat").style.display = "block";
        if (textLines.includes(userName) && document.getElementById("eventTitleDisplay").innerHTML.trim() == title ) {
          
          // If the name is already in the list, show the user they have already joined
          document.getElementById("joinbutton").innerHTML = "Joined";
          document.getElementById("joinbutton").style.backgroundColor = "lightblue"
        } else{
          document.getElementById("joinbutton").innerHTML = "Join";
          document.getElementById("joinbutton").style.backgroundColor = "#52abff";
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  } else {
    

    if (joinButton) {
      document.getElementById("joinbutton").style.display = "none";
      document.getElementById("closeevent").style.display = "none";
      document.getElementById("changechat").style.display = "none";
      //document.getElementById("closebutton").display = "none";
    }
  }

  panel.classList.add('show-panel');
  setTimeout(function(){eventdet=false},450);
}

function closeEventDetails() {
  const panel = document.getElementById('eventDetailsPanel');
  panel.classList.remove('show-panel');
}
function editevent(){
  //open edit tnhing
  if (document.getElementById('editDetails').classList.contains("show-panel2")){
    closeeditdet();
    editbar = true;
  }
  else{
    showeditdet();
    setTimeout(function(){editbar=false},450);
  }
  
}
function closeeditdet(){
  document.getElementById('editDetails').classList.remove("show-panel2");
}
function showeditdet(){
  document.getElementById('editDetails').classList.add("show-panel2");
}
function sidebar(){
  
  if (document.getElementById('eventDetailsPanel2').classList.contains("show-panel2")){
    closeEventDetails2();
    infobar = true;
  }
  else{
    showEventDetails2();
    document.getElementById("joinedppl").innerHTML = '';
    let eventtitle = document.getElementById("eventTitleDisplay").textContent;
    var textLines = [];
    fetch(encodeURIComponent(eventtitle)+'.txt')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
        textLines = data.split('\n')
        
        
        for (let i = 0; i<textLines.length;i++){
          if (textLines[i]) {
              alert(textLines[i])
          
              const nameElement = document.createElement('span');
              nameElement.id = textLines[i]
              nameElement.textContent = textLines[i]; // Set the name text

              // Create a button
              const button = document.createElement('button');
              button.textContent = "Here"; // Set button text
            button.id = document.getElementById("eventTitleDisplay").textContent;
            button.className = "joinbutton"  
            
            button.onclick = function() {
                data = {
                  buttonId: nameElement.id,
                  filePat: document.getElementById("eventTitleDisplay").textContent
                }
                  //alert("comming soon")
                // change txt file and add checkmark
              $.ajax({
                  type: 'POST',
                  url: 'mark.php', // PHP file to process the request
                  data: data,
                  success: function(response) {
                      // Display success message or error from the PHP response
                      $('#responseMessage').text(response);
                  },
                  error: function(xhr, status, error) {
                      // Display error if the request fails
                      $('#responseMessage').text('An error occurred: ' + error);
                  }
              });
              };

              // Create a <br> element
              const lineBreak = document.createElement('br');
            nameElement.style.display = 'block';
            button.style.display = 'block';
            lineBreak.style.display = 'block';
            nameElement.className = "joinedpple";
            button.className = "joinedpple";
            lineBreak.className = "joinedpple";
            

              // Append all elements to the container
              const container = document.getElementById('joinedppl');
              container.appendChild(nameElement);  // Add the name
              container.appendChild(button);      // Add the button
              container.appendChild(lineBreak);   // Add the line break
              
              
          }
         
        }
        
      })
      .catch(error => {
          console.error('There was a problem with fetching the text file:', error);
      });
    setTimeout(function(){infobar=false},450)
  }
}

function showEventDetails2(){
  const panel = document.getElementById('eventDetailsPanel2');
  panel.classList.add('show-panel2');
  
}
function closeEventDetails2() {
  const panel = document.getElementById('eventDetailsPanel2');
  panel.classList.remove('show-panel2');
}

function changetochat(){
  localStorage.setItem("curchat", document.getElementById('changechat').innerHTML)
  eventdet = true;
  closeEventDetails();
  document.getElementById("chatbut2").style.display = "block";
  document.getElementById("chatTitle").innerHTML = localStorage.getItem("curchat");
  document.getElementById("mydiv").style.display = "block";
  document.getElementById("mydiv").classList.add("myDi");
  
  setTimeout(function(){document.getElementById("mydiv").classList.remove("myDi");document.getElementById("mydiv").style.opacity = 1;chatbar = false;},500)
  displaychat()
}

function chatsend() {
    var chatbox = document.getElementById("chatbox");

    if (chatbox.value.trim() !== "" && chatbox.value.trim().length <= 1500) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "chat.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // Disable the input field before sending the request
        chatbox.disabled = true;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Re-enable the input field after the response is received
                chatbox.disabled = false;

            }
        };

        const curChat = encodeURIComponent(localStorage.getItem("curchat"));
        const name = encodeURIComponent(localStorage.getItem("name"));
        const chatboxValue = encodeURIComponent(chatbox.value);

        // Create the data string with newlines encoded as %0A
        const data = `username=${curChat}%0A${name} %0A${chatboxValue}`;
        xhr.send(data);

        // Clear chatbox after sending
        chatbox.value = "";
        displaychat();
        document.getElementById("chatContainer").scrollTop = document.getElementById("chatContainer").scrollHeight;
    } else if (chatbox.value.trim().length > 1500) {
        chatbox.value = "Message too long";
    }
}


function displaychat(){
  if (document.getElementById("chatbox")){
    var textLines = []
      fetch('chat.txt')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
        textLines = data.split('\n')
          var chat = [];
          for(i=2;i<textLines.length;i+=3){

            if(textLines[i-2] == localStorage.getItem("curchat")){
              chat.push({ name: textLines[i-1], score: textLines[i] })
            }

          }

        document.getElementById("chatContainer").innerHTML = "";
        chat.forEach(function(player, index) {
          //console.log(`${index + 1}. ${player.name}: ${player.score}`);
          var row = document.createElement('tr');
          //nameofbro
          var nameCell = document.createElement('td');
          nameCell.className = "namestuf";
          nameCell.innerHTML = player.name.trim()+":\xa0";
          nameCell.style.color = "black"
          if (player.name == localStorage.getItem("name")){
            nameCell.style.color = "lightgreen";
            nameCell.style.fontWeight = "bold";
          }
          row.appendChild(nameCell);
          //hisscore
          var coinsCell = document.createElement('td');
          coinsCell.className = "textstuf";
          coinsCell.innerHTML = player.score;
          row.appendChild(coinsCell);
          //plzworkdaddy
          document.getElementById("chatContainer").appendChild(row);  
      })
    })
      .catch(error => {
          console.error('There was a problem with fetching the text file:', error);
      });
  }
}


// Execute a function when the user presses a key on the keyboard
window.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    event.preventDefault();
    chatsend()
  }
});

//just do like 5 seconds, it doesnt matter too much anyways
displaychat();

setInterval(displaychat,5000);
//editing stuff
$('#eventForm').on('submit', function(e) {
    e.preventDefault(); // Prevent form submission from redirecting


    var formData = {
        eventTitle: document.getElementById("eventTitleDisplay").innerHTML,

        newEventTitle: $('#eventTitle').val(),
        eventDate: $('#eventDate').val(),
        eventDuration: $('#eventDuration').val(),
        eventPlace: $('#eventPlace').val(),
        eventDescription: $('#eventDescription').val()
    };
    
  $.ajax({
      type: 'POST',
      url: 'updateJson.php',
      data: JSON.stringify(formData),  // Convert formData object to JSON
      contentType: 'application/json', // Make sure the content type is JSON
      success: function(response) {
          console.log(response);  // Inspect response
      },
      error: function(xhr, status, error) {
          alert('An error occurred: ' + error);
      }
  });
  location.reload()

});
window.addEventListener('scroll', function() {
  const siteHeader = document.getElementById('siteheader');
  if (window.scrollY > 50) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
});

function checkif(){
  if($('#eventTitle').val() != ""||
$('#eventDate').val() != ""|| $('#eventDuration').val() != ""||$('#eventPlace').val()!=""|| $('#eventDescription').val()!=""){
    document.getElementById("submit-btn123").textContent = "Update Event";
  } else{
    document.getElementById("submit-btn123").textContent = "Delete Event";
  }
}
document.addEventListener('mousemove', (e) => {
  createTrail(e.pageX, e.pageY-85);
});
function randomValueInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function createTrail(x, y) {
  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.backgroundColor =  `rgba(${randomValueInRange(150, 200)}, ${randomValueInRange(200, 255)}, ${randomValueInRange(240, 255)}, 0.8)`;
  document.body.appendChild(trail);

  // Position the trail at the mouse coordinates
  trail.style.left = `${x-5}px`;  // Offset horizontally
  trail.style.top = `${y}px`;   // Offset vertically

  // Remove the trail after animation completes
  setTimeout(() => {
      trail.remove();
  }, 800);  // Matches the animation duration
}



dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();
  // Get the initial mouse cursor position
  pos3 = e.clientX;
  pos4 = e.clientY;
  // Get the initial element position
  pos1 = elmnt.offsetLeft;
  pos2 = elmnt.offsetTop;
  document.onmouseup = closeDragElement;
  // Call a function whenever the cursor moves
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  // Calculate the new cursor position
  var deltaX = e.clientX - pos3;
  var deltaY = e.clientY - pos4;
  // Set the element's new position
  elmnt.style.left = (pos1 + deltaX) + "px";
  elmnt.style.top = (pos2 + deltaY-80) + "px";
}

function closeDragElement() {
  // Stop moving when mouse button is released
  document.onmouseup = null;
  document.onmousemove = null;
}
}

document.getElementById("chaticon2").onclick = function() {

  if (document.getElementById("mydiv").style.display == "block"){
    document.getElementById("mydiv").classList.add("cDi");
    setTimeout(function(){document.getElementById("mydiv").classList.remove("cDi");document.getElementById("mydiv").style.display = "none";    chatbar = true;},500)
  }
  else{
   
    if (localStorage.getItem("curchat") == "general" && document.getElementById("chatbut2")) {
      document.getElementById("chatbut2").style.display = "none";
    }
    else if (document.getElementById("chatbut2")){
      document.getElementById("chatbut2").style.display = "block";
    }
    document.getElementById("mydiv").style.display = "block";
    document.getElementById("chatTitle").innerHTML = localStorage.getItem("curchat");
    document.getElementById("mydiv").classList.add("myDi");
    setTimeout(function(){document.getElementById("mydiv").classList.remove("myDi");document.getElementById("mydiv").style.opacity = 1; chatbar = false;},500)
    displaychat()
  }
  
}

function closechatbar(){
  document.getElementById("mydiv").classList.add("cDi");
  setTimeout(function(){document.getElementById("mydiv").classList.remove("cDi");document.getElementById("mydiv").style.display = "none";     chatbar = true;},500)
}
localStorage.setItem("name" , name)
let events = []
var calendarGrid;
var monthElement;
var currentMonths;
var year ;
let currentMonthIndex;
let currentDay;

document.addEventListener('DOMContentLoaded', function() {
  preloadImages(startAfterPreload);
});

function startAfterPreload(){

  checkName();
  checkOwnership();
  calendar();
  addExistingEvents();

  if(localStorage.getItem("curchat") == null){
    localStorage.setItem("curchat","general")
  }
  if (localStorage.getItem("curchat") == "general" && document.getElementById("generalbut")) {
      document.getElementById("generalbut").style.display = "none";
  }
  else if (document.getElementById("generalbut")){
      document.getElementById("generalbut").style.display = "block";
  }

  setTimeout(function() {
    document.querySelector('body').style.opacity = 1;
  }, 50);
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

function createEvent1() {  document.getElementById("myDropdown").classList.toggle("show");
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
    if(data.includes(localStorage.getItem("name"))){
      //alert("YOU ARE AN ADMIN");
      var elements = document.getElementsByClassName('adminonly');
      for (var i in elements) {
        if (elements.hasOwnProperty(i)) {
          elements[i].className = 'dropbtn';
        }
      }
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
    const currentMonth = new Date()
    currentMonthIndex = currentMonth.getMonth();
    const currentYear = new Date().getFullYear();
    currentDay = currentMonth.getDate();

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


      if(day >= currentDay){
        avaliablebutton(dayDiv, currentMonthIndex, day,year);
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
  document.getElementById("generalbut").style.display = "none";
}
//json testing
function send(){
  data = {
    title: document.getElementById("eventTitle").value,
    data: document.getElementById("eventDate").value,
    place: document.getElementById("eventLocation").value,
    duration: document.getElementById("eventDuration").value,
    description: document.getElementById("eventDescription").value,
    members: 0
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
});

function addEvent2( title, date , place, duration, description) {

  const eventTitle = title;
  const eventDate = date;
  var month = eventDate.split('-')[1];
  var day = eventDate.split('-')[2];
  let red = false;
  if (month<9){
    red = true;
  }
  else if (month == 9 && day < currentDay){
    red = true;
  }
  const eventplace = place;
  const eventDuration = duration;
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
    const eventDuration = document.getElementById('eventDuration').value;
    const eventDescription = document.getElementById('eventDescription').value;
    var month = eventDate.split('-')[1];
    var day = eventDate.split('-')[2];
    let red = false;
    if (month<9){
      red = true;
    }
    else if (month == 9 && day < currentDay){
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
  document.getElementById('eventTitleDisplay').textContent = title;
  document.getElementById('eventDateDisplay').textContent = date;
  document.getElementById('eventPlaceDisplay').textContent = place;
  document.getElementById('eventLocationDisplay').textContent = duration;
  document.getElementById('eventDescriptionDisplay').textContent = description;

    
  if (document.getElementById('changechat')){
    document.getElementById('changechat').innerHTML = title + " Chat";
  }



  const panel = document.getElementById('eventDetailsPanel');
  panel.classList.add('show-panel');
}

function closeEventDetails() {
  const panel = document.getElementById('eventDetailsPanel');
  panel.classList.remove('show-panel');
}
function editevent(){
  alert("L this is broken");
}

function changetochat(){
  localStorage.setItem("curchat", document.getElementById('changechat').innerHTML)
  document.getElementById("generalbut").style.display = "block";
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

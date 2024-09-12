<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Youth4Good Overview</title>
    <link href="style.css" rel="stylesheet" type="text/css" />
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script type= "module" src="https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js"></script>
    <script type= "module" src="https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore-compat.js"></script>
    <script type="module" src="firebase.js"></script>
    <script src="googlesignin.js"></script>
</head>
<body>
    <div id="siteheader">
        <div id="Logoname" >YOUTH4GOOD</div>
        <div id = "siteheader-content">
            <span id = "overview" onclick="transitionToPage('index.html')" class = "currentpage">Overview</span>
            <span id = "overview" onclick="transitionToPage('calendar.html')">Calendar</span>
            <button onclick="callGoogleSignIn()" value="Google Sign In" id="googleSignIn">Google</button>
        <script>
        </script>
        </div>
    </div>

    <div id = "TITLE">
        <h1>Youth 4 Good</h1>
        <!--<button id="notificationBtn" onclick="askNotificationPermission()"><img src = "bell.png" alt = "notification" width = "35px" height = "35px"></button>!-->
    </div>
    <div class="line-1"></div>
    <div id = "titledescription">
        <h2>Our mission is to develop leadership skills and good citizenship practices in youngsters through community service.</h2>
    </div>
  
    <div class="calendar-container">
        <div class="calendar-header">
            <h2>Event Calendar</h2>
            <h3 id="month"></h3>
            <span>
                <button id="prevMonth" onclick="changeMonth(-1)"> &lt; </button>
                <button id="nextMonth" onclick="changeMonth(1)"> &gt; </button>
            </span>
        </div>
        <div class="calendar-grid" id="calendarGrid">
        </div>
    </div>

    <div id="eventDetailsPanel" class="event-details-panel">
        <h1 id="eventTitleDisplay">Event Title</h1>
        <h2 id="eventDateDisplay">Event Date</h2>
        <h2 id="eventPlaceDisplay">Event Place</h2>
        <h2 id="eventLocationDisplay">Event Duration</h2>
        <h2 id="eventDescriptionDisplay">Event Description</h2>
        <button id = "changechat" onclick = "changetochat()">Change Chat</button>
        <button id = "closeevent" onclick="closeEventDetails()">Close</button>
        <button id = "editevent" class = "adminonly" onclick="editevent()">Edit</button>
        <div id="myDropdown" class="dropdown-content">
          <span id = "crev">CREATE AN EVENT</span>
          <span> <div class="event-form">
              <input type="text" id="eventTitle" placeholder="Event Title" />
              <input type="date" id="eventDate" />
          </div></span>
          <span><div class="event-form">
                <input type="text" id="eventLocation" placeholder="Event Location" />
                 <input type="text" id="eventDuration" placeholder="Event Event Duration" />
            </div></span>
          <span id = "lastform"><div  class="event-form">
                  <input type="text" id="eventDescription" placeholder="Event Description" />
              <button id = "addev" onclick="addEvent()">Add Event</button>
              </div></span>

        </div>
    </div>
  
    <div class = "person">
          <span>
              <div class = "Container" id = "chatContainer"></div>
              <div id = "chat"><form id = "chatform" onsubmit="return false">
              <input type="text" id="chatbox" name="name" placeholder ="Enter your message:">
              </form></div>
              <div id = "generalbut"><button id = "chatbut2" onclick = "switchtogeneral()">Switch To General</button></div>
              <div id= "chatbutcont"><button id = "chatbut" onclick = "chatsend()">Send</button></div>
          </span>
          <span><img id = "titlepageimg" src = "Youth4g.png"></span>

    </div>
    <script src="script.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Youth4Good Overview</title>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Youth4Good Overview</title>
    <link href="style.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="module" src="firebase.js"></script>
    <script src="googlesignin.js"></script>
    </head>
<body>

    <div id="siteheader">
        <div id="Logoname" >YOUTH4GOOD</div>
        <div id = "siteheader-content">
            <span id = "overview" onclick="transitionToPage('index.html')" class = "currentpage">Overview</span>
        </div>
    </div>
    

    <div id = "TITLE">
        <h1>Youth 4 Good</h1>
        <!-- <button id="notificationBtn" onclick="Notifaction()"><img src = "bell.png" alt = "notification" width = "35px" height = "35px"></button> -->
        <div class="line-1"></div>
        <div id = "titledescription">
            <h2>Our mission is to develop leadership skills and good citizenship practices in youngsters through community service.</h2>
        </div>
    </div>

    <div id = "contentcalendar">
        <button id = "createeventbutton" class = "adminonly" onclick="createEvent1()" class="dropbtn">Create Event</button>
        <div id="myDropdown" class="dropdown-content">
          <span id = "crev">CREATE AN EVENT</span>
          <span> <div class="event-form">
              <input type="text" id="eventTitle" placeholder="Event Title" />
              <input type="date" id="eventDate" />
          </div></span>
          <span><div class="event-form">
                <input type="text" id="eventLocation" placeholder="Event Location" />
                 <input type="number" id="eventDuration" placeholder="Event Event Duration" />
            </div></span>
          <span id = "lastform"><div  class="event-form">
                  <input type="text" id="eventDescription" placeholder="Event Description" />
              <button id = "addev" onclick="addEvent()">Add Event</button>
              </div></span>

        </div>
        <div class="calendar-container">
            <div class="calendar-header">
                <h2>Event Calendar</h2>
                <h3 id="month"></h3>
                <span>
                    <button id="prevMonth" onclick="changeMonth(-1)"> &lt; </button>
                    <button id="nextMonth" onclick="changeMonth(1)"> &gt; </button>
                    <button onclick="callGoogleSignIn()" value="Google Sign In" id="googleSignIn">Google</button>
                    <button onclick="logOut()" value="Google Sign Out" id="googleSignOut">Log Out</button>
                </span>
            </div>
            <div class="calendar-grid" id="calendarGrid">
            </div>
        </div>
    </div>
    
    <div id="eventDetailsPanel2" class="event-details-panel2">
       <h1 class = "joined">Joined: </h1>
        <h2 id = "joinedppl"></h2>
       


    </div>
    <div id = "editDetails" class = "event-details-panel2">
        <form id="eventForm" oninput = "checkif()" onclick = "checkif()" >
            <label for="eventTitle">Event Title:</label>
            <br>
            <input class = "sidebarform"  type="text" id="eventTitle" name="eventTitle" ><br><br>

            <label for="eventDate">Event Date:</label>
            <br>
            <input class = "sidebarform"   type="date" id="eventDate" name="eventDate" ><br><br>

            <label for="eventDuration">Event Duration (hours):</label>
            <br>
            <input class = "sidebarform"  type="text" id="eventDuration" name="eventDuration" ><br><br>

            <label for="eventPlace">Event Place:</label>
            <br>
            <input class = "sidebarform"   type="text" id="eventPlace" name="eventPlace" ><br><br>

            <label for="eventDescription">Event Description:</label>
            <br>
            <textarea class = "sidebarform"  id="eventDescription" name="eventDescription" ></textarea><br><br>

            <button type="submit" id = "submit-btn123" class = "sidebarbtn">Delete Event</button>
        </form>
    </div>
    <div id="eventDetailsPanel" class="event-details-panel">
        <h1 id="eventTitleDisplay">Event Title</h1>
        <h2 id="eventDateDisplay">Event Date</h2>
        <h2 id="eventPlaceDisplay">Event Place</h2>
        <h2 id="eventLocationDisplay">Event Duration</h2>
        <h2 id="eventDescriptionDisplay">Event Description</h2>

        <l>Members: </l><l id = "mcount">0</l><br>
        <button class = "eventDetPanBTN" id = "changechat" onclick = "changetochat()">Change Chat</button>
        <button class = "eventDetPanBTN" id = "joinbutton" onclick = "joinEvent()">Join</button>
        <button class = "adminonly" id = "closeevent" onclick="sidebar()">Info</button>
        
        <button id = "editevent" class = "adminonly" onclick="editevent()">Edit</button>
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

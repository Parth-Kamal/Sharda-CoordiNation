document.addEventListener("DOMContentLoaded", function () {
//   // Initialize FullCalendar
//   var calendarEl = document.getElementById("calendar");
//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     headerToolbar: {
//       left: "prev,next today",
//       center: "title",
//       right: "dayGridMonth,timeGridWeek,timeGridDay",
//     },
//     initialView: "dayGridMonth",
//     editable: true,
//     selectable: true,
//     events: [
//       {
//         title: "Meeting with Dept. A",
//         start: "2024-08-30T10:00:00",
//         end: "2024-08-30T11:00:00",
//         color: "blue",
//       },
//       {
//         title: "Project Deadline",
//         start: "2024-09-01",
//         color: "red",
//       },
//       {
//         title: "Team Building Event",
//         start: "2024-09-05T13:00:00",
//         end: "2024-09-05T15:00:00",
//         color: "green",
//       },
//     ],
//     dateClick: function (info) {
//       alert("Date clicked: " + info.dateStr);
//     },
//     eventClick: function (info) {
//       alert("Event: " + info.event.title);
//     },
//   });
//   calendar.render();

  // Initialize Chart.js
  const ctx = document.getElementById("projectChart").getContext("2d");
  const projectChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Public Works",
        "Environmental Dept.",
        "Water Resources",
        "Transport Dept.",
      ],
      datasets: [
        {
          label: "No. of Projects",
          data: [3, 2, 3.8, 1],
          backgroundColor: [
            "rgba(30, 144, 255, 0.6)", // Light Blue
            "rgba(54, 162, 235, 0.6)", // Blue
            "rgba(255, 206, 86, 0.6)", // Yellow
            "rgba(255, 99, 132, 0.6)", // Red
          ],
          borderColor: [
            "rgba(30, 144, 255, 1)", // Darker Blue
            "rgba(54, 162, 235, 1)", // Dark Blue
            "rgba(255, 206, 86, 1)", // Dark Yellow
            "rgba(255, 99, 132, 1)", // Dark Red
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            color: "#000000",
          },
        },
        x: {
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            color: "#000000",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#000000",
          },
        },
      },
      layout: {
        padding: 20,
      },
      maintainAspectRatio: false,
    },
  });

  // Initialize Leaflet Map
  var map = L.map("map").setView([28.6139, 77.209], 12); // default location (e.g., New Delhi)

  // Add a tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Add markers for work locations
  var workLocations = [
    {
      lat: 28.5494,
      lng: 77.2517,
      title: "Nehru Place - Commercial Area Renovation",
      status: "ongoing",
    },
    {
      lat: 28.5245,
      lng: 77.2066,
      title: "Saket - Road Widening Project",
      status: "pending",
    },
    {
      lat: 28.5462,
      lng: 77.259,
      title: "Kalkaji - Water Supply Improvement",
      status: "ongoing",
    },
    {
      lat: 28.6139,
      lng: 77.209,
      title: "Connaught Place - Infrastructure Revamp",
      status: "ongoing",
    },
    {
      lat: 28.5273,
      lng: 77.2167,
      title: "Hauz Khas - Park Restoration",
      status: "pending",
    },
    {
      lat: 28.7041,
      lng: 77.1025,
      title: "Pitampura - Flyover Expansion",
      status: "completed",
    },
    {
      lat: 28.6692,
      lng: 77.2265,
      title: "Shahdara - Waste Management Facility",
      status: "ongoing",
    },
    {
      lat: 28.6434,
      lng: 77.2324,
      title: "Azadpur - Market Area Renovation",
      status: "pending",
    },
    {
      lat: 28.4818,
      lng: 77.3027,
      title: "Faridabad - Highway Expansion",
      status: "ongoing",
    },
    {
      lat: 28.6743,
      lng: 77.2219,
      title: "Sadar Bazaar - Traffic Decongestion",
      status: "completed",
    },
    {
      lat: 28.5244,
      lng: 77.168,
      title: "Vasant Vihar - Road Safety Improvements",
      status: "ongoing",
    },
    {
      lat: 28.691,
      lng: 77.2153,
      title: "Civil Lines - Gas Pipeline Development",
      status: "pending",
    },
    {
      lat: 28.5967,
      lng: 77.2024,
      title: "Karol Bagh - Market Electrification",
      status: "ongoing",
    },
  ];

  workLocations.forEach(function (location) {
    var markerColor = location.status === "ongoing" ? "yellow" : "red";
    var markerIcon = L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color: ${markerColor}; width: 15px; height: 15px; border-radius: 50%;"></div>`,
      iconSize: [15, 15],
      popupAnchor: [0, -15],
    });

    L.marker([location.lat, location.lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<b>${location.title}</b><br>Status: ${location.status}`);
  });

  // Sample data for projects and resources
  const projectsData = {
    "nehru place": [
      { name: "Commercial Area Renovation", status: "Ongoing" },
      { name: "Street Lighting Upgrade", status: "Scheduled" },
      { name: "Green Space Development", status: "Completed" },
    ],
    saket: [
      { name: "Road Widening Project", status: "Pending" },
      { name: "Public Park Development", status: "Ongoing" },
      { name: "Community Hall Construction", status: "Scheduled" },
    ],
    kalkaji: [
      { name: "Water Supply Improvement", status: "Ongoing" },
      { name: "Waste Management System", status: "Scheduled" },
      { name: "Underground Drainage Repair", status: "Ongoing" },
    ],
    "connaught place": [
      { name: "Infrastructure Revamp", status: "Ongoing" },
      { name: "Heritage Building Renovation", status: "Scheduled" },
      { name: "Tourism and Signage Project", status: "Completed" },
    ],
    "hauz khas": [
      { name: "Park Restoration", status: "Pending" },
      { name: "Lake Cleaning Initiative", status: "Ongoing" },
      { name: "Cultural Center Construction", status: "Scheduled" },
    ],
    pitampura: [
      { name: "Flyover Expansion", status: "Completed" },
      { name: "Public Transportation Hub", status: "Ongoing" },
      { name: "Road Beautification Project", status: "Pending" },
    ],
    shahdara: [
      { name: "Waste Management Facility", status: "Ongoing" },
      { name: "Recycling Center Setup", status: "Scheduled" },
      { name: "Traffic Signal Modernization", status: "Pending" },
    ],
    azadpur: [
      { name: "Market Area Renovation", status: "Pending" },
      { name: "Parking Lot Expansion", status: "Scheduled" },
      { name: "Pedestrian Walkway Construction", status: "Ongoing" },
    ],
    faridabad: [
      { name: "Highway Expansion", status: "Ongoing" },
      { name: "Public Bus Depot Construction", status: "Scheduled" },
      { name: "Metro Station Installation", status: "Ongoing" },
    ],
    "sadar bazaar": [
      { name: "Traffic Decongestion", status: "Completed" },
      { name: "Market Overhaul", status: "Scheduled" },
      { name: "Street Vendor Regulation", status: "Pending" },
    ],
    "vasant vihar": [
      { name: "Road Safety Improvements", status: "Ongoing" },
      { name: "Traffic Signal Upgradation", status: "Completed" },
      { name: "School Zone Safety Project", status: "Ongoing" },
    ],
    "civil lines": [
      { name: "Gas Pipeline Development", status: "Pending" },
      { name: "Electricity Grid Modernization", status: "Scheduled" },
      { name: "Public Library Construction", status: "Ongoing" },
    ],
    "karol bagh": [
      { name: "Market Electrification", status: "Ongoing" },
      { name: "Shopping Complex Development", status: "Pending" },
      { name: "Sewer Line Repair", status: "Ongoing" },
    ],
    noida: [
      { name: "Metro Station Construction", status: "Ongoing" },
      { name: "Residential Complex Project", status: "Scheduled" },
      { name: "IT Park Expansion", status: "Ongoing" },
    ],
    "india gate": [
      { name: "Public Garden Expansion", status: "Completed" },
      { name: "Security System Upgrade", status: "Scheduled" },
      { name: "Visitor Information Center", status: "Pending" },
    ],
    gurgaon: [
      { name: "IT Park Development", status: "Pending" },
      { name: "Corporate Office Complex", status: "Scheduled" },
      { name: "Urban Transport Revamp", status: "Ongoing" },
    ],
    okhla: [
      { name: "Solar Power Plant Installation", status: "Ongoing" },
      { name: "Renewable Energy Facility", status: "Pending" },
      { name: "Green Industrial Zone Development", status: "Scheduled" },
    ],
    "cyber city": [
      { name: "Smart City Project", status: "Scheduled" },
      { name: "Data Center Construction", status: "Ongoing" },
      { name: "AI-Driven Traffic Management", status: "Pending" },
    ],
  };

  const resourcesData = {
    Excavator: "Available",
    "Water Pump": "In Use",
    "Surveying Equipment": "Available",
    "Cement Mixer": "Finished",
  };

  // Toggle chatbot window visibility
  function toggleChat() {
    const chatbotWindow = document.getElementById("chatbot-window");
    chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "flex" : "none";
}

// Handle sending a message
function sendMessage(event) {
    if (event.type === "keypress" && event.key !== "Enter") return;

    const inputField = document.getElementById("chatbot-input");
    const message = inputField.value.trim();
    if (message === "") return;

    appendMessage("user", message);
    inputField.value = "";

    processUserMessage(message);
}

// Append message to chat window
function appendMessage(sender, message) {
    const chatbotMessages = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);

    if (sender === "bot") {
        // Add scheduling button for bot responses
        const scheduleButton = document.createElement("button");
        scheduleButton.textContent = "Schedule";
        scheduleButton.classList.add("schedule-btn");
        scheduleButton.onclick = () => {
            window.location.href = 'form.html';
        };
        (JSON.parse(localStorage.getItem("user")).role === "admin") && chatbotMessages.appendChild(scheduleButton);
    }
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; 
}

// Process user message and provide response
function processUserMessage(message) {
    const lowerCaseMessage = message.toLowerCase().trim();
    console.log("Received Message:", lowerCaseMessage);  // Debugging line

    let response = "";

    if (lowerCaseMessage.includes("location")) {
        const location = lowerCaseMessage.split("location")[1]?.trim();
        console.log("Extracted Location:", location);  
        response = getProjectsForLocation(location);
    } else if (lowerCaseMessage.includes("resource")) {
        const resource = lowerCaseMessage.split("resource")[1]?.trim();
        console.log("Extracted Resource:", resource);  
        response = getResourceStatus(resource);
    } else {
        response = "I'm sorry, I didn't understand that. Please specify a valid location or resource.";
    }

    appendMessage("bot", response);
}


function getProjectsForLocation(location) {
    const normalizedLocation = location.toLowerCase();
    console.log("Normalized Location:", normalizedLocation); 
    const projects = projectsData[normalizedLocation];
    if (projects && projects.length > 0) {
        return projects.map(project => `${project.name} - ${project.status}`).join("\n");
    } else {
        return "No projects found for the specified location.";
    }
}

function getResourceStatus(resource) {
    console.log("Requested Resource:", resource); 
    const status = resourcesData[resource];
    if (status) {
        return `${resource} is currently ${status}.`;
    } else {
        return "Resource not found.";
    }
}



// Initialize chatbot button click event
document.getElementById("chatbot-button").addEventListener("click", toggleChat);
document.getElementById("chatbot-input").addEventListener("keypress", sendMessage);
document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("close-button").addEventListener("click", toggleChat);

  // Task Management Function
  window.addTask = function () {
    const taskNameInput = document.getElementById("taskName");
    const taskStatusSelect = document.getElementById("taskStatus");
    const taskName = taskNameInput.value.trim();
    const taskStatus = taskStatusSelect.value;

    if (taskName === "") {
      alert("Please enter a task name.");
      return;
    }

    const taskList = document.getElementById("taskList").querySelector("ul");
    const newTask = document.createElement("li");

    newTask.innerHTML = `${taskName} - <strong>Status: ${taskStatus}</strong> `;

    // Add a button to delete the task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.onclick = function () {
      taskList.removeChild(newTask);
    };
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);

    // Clear input fields after adding the task
    taskNameInput.value = "";
    taskStatusSelect.value = "Pending";
  };

  // Resource Management Function
  window.addResource = function () {
    const resourceList = document
      .getElementById("resourceList")
      .querySelector("ul");
    const newResource = document.createElement("li");
    newResource.innerHTML =
      "Resource: New Equipment - Department: Example - <strong>Status: Available</strong>";
    resourceList.appendChild(newResource);
  };
  window.viewProfiles = function () {
    alert("Coming Soon");
  };
  // Document Management - Upload Document Function
  window.handleFileUpload = function (event) {
    const file = event.target.files[0];
    const fileType = file.type;

    // Validate file type: only allow PDF or image files
    if (!fileType.match("application/pdf") && !fileType.match("image.*")) {
      alert("Only PDF or image files are allowed.");
      return;
    }

    const fileName = file.name;
    const documentList = document.getElementById("documentsUl");

    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.textContent = fileName;
    link.target = "_blank";

    listItem.appendChild(link);
    documentList.appendChild(listItem);
  };

  // Forum Posting Function
  window.addPost = function () {
    const forumPosts = document.getElementById("forumPosts");
    const newPostText = document.getElementById("newPost").value;
    if (newPostText.trim()) {
      const newPost = document.createElement("div");
      newPost.classList.add("post");
      newPost.textContent = newPostText;
      forumPosts.appendChild(newPost);
      document.getElementById("newPost").value = "";
    }
  };

  // Feedback Submission
  document
    .getElementById("feedbackForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const feedbackText = document.getElementById("feedbackText").value;
      alert("Feedback submitted: " + feedbackText);
      document.getElementById("feedbackText").value = "";
    });

  // Smooth Scroll for Navigation
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Toggle burger menu
function toggleMenu() {
  const navList = document.querySelector(".nav-list");
  const navbar = document.querySelector(".navbar");
  navList.classList.toggle("show-menu");
  navbar.classList.toggle("overlay-nav");
}
function closeMenu() {
  const navList = document.querySelector(".nav-list");
  const navbar = document.querySelector(".navbar");
  navList.classList.remove("show-menu");
  navbar.classList.remove("overlay-nav");
}

// Add event listeners to nav links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});

function showAlert(message) {
  document.getElementById("alertMessage").textContent = message;
  document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}
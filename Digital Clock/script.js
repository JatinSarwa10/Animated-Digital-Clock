const toggleMode = document.getElementById("toggleMode");
const toggleFormat = document.getElementById("toggleFormat");
let is24HourFormat = localStorage.getItem("timeFormat") === "true"; // Retrieve format preference

// Apply stored light/dark mode preference
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggleMode.textContent = "🌞 Dark Mode";
}

// Update Time Function
function updateTime() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = "AM";

    if (!is24HourFormat) {
        ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12; // Convert 12-hour format
    } else {
        ampm = "";
    }

    document.getElementById("hrs").textContent = h.toString().padStart(2, '0');
    document.getElementById("mins").textContent = m.toString().padStart(2, '0');
    document.getElementById("secs").textContent = s.toString().padStart(2, '0');
    document.getElementById("ampm").textContent = ampm;

    // Circular Progress Bar
    document.getElementById("hh").style.strokeDashoffset = 440 - (440 * h) / (is24HourFormat ? 24 : 12);
    document.getElementById("mm").style.strokeDashoffset = 440 - (440 * m) / 60;
    document.getElementById("ss").style.strokeDashoffset = 440 - (440 * s) / 60;

    // Dot Movement
    document.querySelector(".h_dot").style.transform = `rotate(${h * (is24HourFormat ? 15 : 30)}deg)`;
    document.querySelector(".m_dot").style.transform = `rotate(${m * 6}deg)`;
    document.querySelector(".s_dot").style.transform = `rotate(${s * 6}deg)`;

    // Date Update
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    document.getElementById("date").textContent = now.toLocaleDateString("en-US", dateOptions);
}

// Mode Toggle
toggleMode.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        toggleMode.textContent = "🌙 Dark Mode";
    } else {
        localStorage.setItem("theme", "dark");
        toggleMode.textContent = "🌞 Light Mode";
    }
});

// Format Toggle (12/24 Hour)
toggleFormat.addEventListener("click", () => {
    is24HourFormat = !is24HourFormat;
    localStorage.setItem("timeFormat", is24HourFormat); // Store format preference
    updateTime();
});
// Get Day
function updateDay() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  document.getElementById("day").textContent = days[today.getDay()];
}

// Get User Location
// function fetchLocation() {
//   if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(async function(position) {
//           const lat = position.coords.latitude;
//           const lon = position.coords.longitude;

//           // Fetch location name using OpenWeatherMap API
//           const apiKey = "YOUR_API_KEY"; // Get API key from OpenWeatherMap
//           const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
          
//           try {
//               const response = await fetch(url);
//               const data = await response.json();
//               const city = data.name;
//               document.getElementById("location").textContent = city ? `📍 ${city}` : "Location Unavailable";
//           } catch (error) {
//               document.getElementById("location").textContent = "Location Error";
//           }
//       }, function() {
//           document.getElementById("location").textContent = "Location Access Denied";
//       });
//   } else {
//       document.getElementById("location").textContent = "Location Not Supported";
//   }
// }

// Call Functions
updateDay();
// fetchLocation();


// Initial Call & Interval
updateTime();
setInterval(updateTime, 1000);

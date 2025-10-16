// -------------------- LOGIN & REGISTER --------------------
const loginModal = document.getElementById('login-modal');
const authStatus = document.getElementById('auth-status');

window.addEventListener('load', () => {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  if(savedUser && savedUser.username){
    loginModal.style.display = 'none';
    initChat();
  } else {
    loginModal.style.display = 'flex';
  }
});

function registerUser(){
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if(!username || !password){
    authStatus.innerText = 'Please enter username & password!';
    return;
  }
  localStorage.setItem('user', JSON.stringify({username,password}));
  authStatus.style.color = 'green';
  authStatus.innerText = '✅ Registered successfully! Now login.';
}

function loginUser(){
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const savedUser = JSON.parse(localStorage.getItem('user'));

  if(savedUser && savedUser.username === username && savedUser.password === password){
    loginModal.style.display = 'none';
    initChat();
  } else {
    authStatus.style.color = 'red';
    authStatus.innerText = '❌ Invalid credentials!';
  }
}

function logoutUser(){
  localStorage.removeItem('user');
  location.reload();
}

// -------------------- THEME SWITCHER --------------------
function changeTheme(color){
  if(color==='blue'){
    document.documentElement.style.setProperty('--brand','#0056b3');
    document.documentElement.style.setProperty('--accent','#ffcc00');
    document.documentElement.style.setProperty('--background','linear-gradient(135deg,#0056b3,#ffcc00)');
  } else if(color==='yellow'){
    document.documentElement.style.setProperty('--brand','#ffcc00');
    document.documentElement.style.setProperty('--accent','#0056b3');
    document.documentElement.style.setProperty('--background','linear-gradient(135deg,#ffcc00,#0056b3)');
  } else if(color==='dark'){
    document.documentElement.style.setProperty('--brand','#333');
    document.documentElement.style.setProperty('--accent','#555');
    document.documentElement.style.setProperty('--background','linear-gradient(135deg,#222,#555)');
  }
}

// -------------------- CHAT --------------------
let messages, typingIndicator, inputEl;

function initChat(){
  messages = document.getElementById('messages');
  typingIndicator = document.getElementById('typing-indicator');
  inputEl = document.getElementById('user-input');
  typeBot("👋 Hello! I'm Miraite — your school assistant. Ask about principal, school, achievements or use the buttons. You can also speak your questions!");
}

// Append user message
function appendUser(text){
  const div = document.createElement('div');
  div.className = 'message from-user';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Bot typing
function typeBot(text){
  typingIndicator.style.display = 'block';
  let i=0;
  const div = document.createElement('div');
  div.className = 'message from-miraite';
  messages.appendChild(div);

  function typeChar(){
    if(i<text.length){
      div.innerHTML += text[i];
      i++;
      messages.scrollTop = messages.scrollHeight;
      setTimeout(typeChar, 15 + Math.random()*10); // faster typing
    } else {
      typingIndicator.style.display='none';
    }
  }
  typeChar();
}

// Send message
function sendMessage(){
  const text = inputEl.value.trim();
  if(!text) return;
  appendUser(text);
  inputEl.value='';
  handleUserQuery(text);
}

// Voice recognition
function startMic(){
  if(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)){
    alert('🎙️ Speech recognition not supported.');
    return;
  }
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Rec();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.start();
  recognition.onresult = (event)=>{
    const spoken = event.results[0][0].transcript;
    appendUser(spoken);
    handleUserQuery(spoken);
  };
}

// Website / Registration
function openWebsite(){
  window.open('https://www.miramodelschooldelhi.edu.in', '_blank');
  typeBot('🌐 Opening official website...');
}
function openRegistration(){
  const regWin = window.open('https://entab.online/Registration/RegistrationGroupClass', '_blank');
  if(!regWin) alert('Allow popups or open manually.');
  typeBot('📝 Opening registration page...');
}

// -------------------- BOT RESPONSES --------------------
function handleUserQuery(text){
  const t = text.toLowerCase();

  const data = {
    'principal': "👩‍🏫 Principal Mrs. Meenakshi Sant leads Mira Model School with vision and dedication. She emphasizes holistic learning, digital education, extracurricular excellence, and student welfare. Under her guidance, students thrive academically, socially, and morally. She encourages leadership, community service, and innovation among students. Her approachable leadership style ensures parents and students feel supported. With years of experience in education, she fosters a nurturing environment where every child’s potential is recognized and developed.",
    'about school': "🏫 Mira Model School, established in 1972 in Janakpuri, New Delhi, is a premier co-educational CBSE school on a 12-acre campus. The school emphasizes academics, extracurriculars, and values-based learning. It features digital classrooms, science and computer labs, libraries, sports facilities, and auditoriums. Students engage in projects, competitions, and cultural activities, fostering innovation and teamwork. MMS aims to develop responsible citizens through holistic education. The school motto 'Service Before Self' is reflected in student-led social initiatives and community programs.",
    'streams': "🎓 MMS offers Science, Commerce, and Humanities streams. Science focuses on Physics, Chemistry, Biology, Mathematics for future engineers and doctors. Commerce includes Accountancy, Business Studies, Economics for entrepreneurs and finance careers. Humanities emphasizes Political Science, Psychology, History, Sociology, developing analytical and creative thinking. All streams integrate project work, practical learning, and career guidance.",
    'extra curricular': "🎨 MMS encourages students to explore arts, music, dance, theatre, debates, sports, and social service. Clubs like Eco Club, Robotics, Literary Society, and Coding Club help students innovate and collaborate. Annual fests, inter-school competitions, and cultural programs nurture creativity, teamwork, and confidence.",
    'facilities': "🏢 MMS provides modern infrastructure, including smart classrooms, advanced science and computer labs, audio-visual rooms, a library, sports fields, basketball and cricket facilities, yoga halls, medical care, safe transport, and a large auditorium. The campus is designed for safety, creativity, and efficient learning.",
    'achievements': "🏅 MMS students excel in academics, Olympiads, debates, arts, and sports, earning national and international recognition. The school has received the British Council ISA Award and is consistently ranked among Delhi’s top CBSE schools.",
    'admission': "📝 Admission at MMS is open for Nursery to Class XII. Registration forms are online. Required documents include birth certificate, photos, academic records, and address proof. Selection for senior classes is merit-based, while early registration is encouraged due to limited seats.",
    'contact': "📞 Mira Model School, Shaheed Captain Anuj Nayyar Marg, Janakpuri, New Delhi – 110058. Phone: 011-25508486 | Mobile: 9311125072, 9311125073 | Email: office@miramodelschooldelhi.edu.in. Website: www.miramodelschooldelhi.edu.in."
  };

  for(let key in data){
    if(t.includes(key)){
      typeBot(data[key]);
      return;
    }
  }

  if(t.includes('hello')||t.includes('hi')||t.includes('hey')){
    typeBot('👋 Hello! I am Miraite, your virtual school assistant. You can ask about the school, streams, admission, achievements, facilities, and more. Use the buttons or speak your question.');
    return;
  }

  typeBot("🤔 Sorry, I didn't understand. You can ask about school, streams, admissions, achievements, facilities, or speak your query.");
}

// Quick buttons
function askTopic(topic){
  appendUser(topic);
  handleUserQuery(topic);
}

// Slideshow
(function(){
  const imgs=document.querySelectorAll('#slideshow img');
  let i=0;
  setInterval(()=>{
    imgs[i].classList.remove('active');
    i=(i+1)%imgs.length;
    imgs[i].classList.add('active');
  },3500);
})();
// THEME MENU TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const themeOptions = document.getElementById('theme-options');
const themeMenu = document.getElementById('theme-menu');

themeToggle.addEventListener('click', () => {
  themeOptions.style.display = themeOptions.style.display === 'flex' ? 'none' : 'flex';
});

document.addEventListener('click', (e) => {
  if(!themeMenu.contains(e.target)){
    themeOptions.style.display = 'none';
  }
});


window.addEventListener('load', () => {
  typeBot("👋 Hello! I'm Miraite — your school assistant. Ask about principal, school, achievements or use the buttons. You can also speak your questions!");
});

const messages = document.getElementById('messages');
const typingIndicator = document.getElementById('typing-indicator');
const inputEl = document.getElementById('user-input');

// Function to append user message
function appendUser(text){
  const div = document.createElement('div');
  div.className = 'message from-user';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Typing animation for Miraite
function typeBot(text){
  typingIndicator.style.display = 'block';
  let i = 0;
  const div = document.createElement('div');
  div.className = 'message from-miraite';
  messages.appendChild(div);

  function typeChar(){
    if(i < text.length){
      div.innerHTML += text[i];
      i++;
      messages.scrollTop = messages.scrollHeight;
      setTimeout(typeChar, 25 + Math.random()*20);
    } else {
      typingIndicator.style.display = 'none';
    }
  }
  typeChar();
}

// Send message on button click
function sendMessage(){
  const text = inputEl.value.trim();
  if(!text) return;
  appendUser(text);
  inputEl.value = '';
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

// Open website/registration
function openWebsite(){
  window.open('https://www.miramodelschooldelhi.edu.in', '_blank');
  typeBot('🌐 Opening official website...');
}
function openRegistration(){
  const regWin = window.open('https://entab.online/Registration/RegistrationGroupClass', '_blank');
  if(!regWin) alert('Allow popups or open manually.');
  typeBot('📝 Opening registration page...');
}

// Main bot responses (100-120 words)
function handleUserQuery(text){
  const t = text.toLowerCase();

  if(t.includes('hello')||t.includes('hi')||t.includes('hey')){
    typeBot('👋 Hello! I am Miraite, your virtual school assistant. You can ask about the school, streams, admission, achievements, facilities, and more. Use the buttons or speak your question.'); return;
  }

  const data = {
    'principal': "👩‍🏫 Principal Mrs. Meenakshi Sant leads Mira Model School with vision and dedication. She emphasizes holistic learning, digital education, extracurricular excellence, and student welfare. Under her guidance, students thrive academically, socially, and morally. She encourages leadership, community service, and innovation among students. Her approachable leadership style ensures parents and students feel supported. With years of experience in education, she fosters a nurturing environment where every child’s potential is recognized and developed. Her initiatives include teacher training, modern classrooms, and a focus on values-based education.",
    'about school': "🏫 Mira Model School, established in 1972 in Janakpuri, New Delhi, is a premier co-educational CBSE school on a 12-acre campus. The school emphasizes academics, extracurriculars, and values-based learning. It features digital classrooms, science and computer labs, libraries, sports facilities, and auditoriums. Students engage in projects, competitions, and cultural activities, fostering innovation and teamwork. MMS aims to develop responsible citizens through holistic education. The school motto 'Service Before Self' is reflected in student-led social initiatives and community programs, preparing learners for life beyond academics, with confidence and ethical grounding.",
    'streams': "🎓 MMS offers Science, Commerce, and Humanities streams. Science focuses on Physics, Chemistry, Biology, Mathematics for future engineers and doctors. Commerce includes Accountancy, Business Studies, Economics for entrepreneurs and finance careers. Humanities emphasizes Political Science, Psychology, History, Sociology, developing analytical and creative thinking. All streams integrate project work, practical learning, and career guidance. Students are encouraged to participate in workshops, competitions, and mentorship programs. The curriculum is designed to prepare students for higher education, competitive exams, and global opportunities while maintaining balance in extracurricular and social development.",
    'extra': "🎨 MMS encourages students to explore arts, music, dance, theatre, debates, sports, and social service. Clubs like Eco Club, Robotics, Literary Society, and Coding Club help students innovate and collaborate. Annual fests, inter-school competitions, and cultural programs nurture creativity, teamwork, and confidence. Students participate in leadership activities, community service, and workshops to enhance practical skills. The school aims to develop well-rounded individuals with critical thinking, problem-solving, and social responsibility. Extracurricular programs complement academics, providing holistic growth and opportunities for recognition in regional and national events.",
    'facilities': "🏢 MMS provides modern infrastructure, including smart classrooms, advanced science and computer labs, audio-visual rooms, a library, sports fields, basketball and cricket facilities, yoga halls, medical care, safe transport, and a large auditorium. The campus is designed for safety, creativity, and efficient learning. Facilities support curricular and co-curricular programs, fostering practical learning experiences. Students benefit from well-equipped labs for experiments, digital tools for interactive learning, and spaces for arts and sports. Every facility aligns with the school’s aim to create an inspiring, engaging, and supportive learning environment for all students.",
    'achievements': "🏅 MMS students excel in academics, Olympiads, debates, arts, and sports, earning national and international recognition. The school has received the British Council ISA Award and is consistently ranked among Delhi’s top CBSE schools. Alumni succeed in higher education, entrepreneurship, creative arts, and public service. Students are encouraged to participate in competitions, community programs, and innovative projects. The school celebrates achievements to inspire peers and maintain a culture of excellence. Through rigorous academics, extracurricular success, and character development, MMS nurtures students to achieve their highest potential and contribute meaningfully to society.",
    'admission': "📝 Admission at MMS is open for Nursery to Class XII. Registration forms are online. Required documents include birth certificate, photos, academic records, and address proof. Selection for senior classes is merit-based, while early registration is encouraged due to limited seats. Parents can track admission status online or contact the office. The school provides orientation sessions, guidance for parents and students, and support for completing formalities. Admissions focus on selecting students aligned with the school’s ethos, ensuring a conducive environment for learning, and promoting holistic growth across academics, extracurriculars, and personal development.",
    'contact': "📞 Mira Model School, Shaheed Captain Anuj Nayyar Marg, Janakpuri, New Delhi – 110058. Phone: 011-25508486, 25500489 | Mobile: 9311125072, 9311125073 | Email: office@miramodelschooldelhi.edu.in. Website: www.miramodelschooldelhi.edu.in. For admissions, events, or general inquiries, the office staff is available on working days. Parents and students can schedule visits, communicate via email, or contact via phone for support. MMS ensures responsive communication to facilitate smooth academic and administrative processes for its community."
  };

  for(let key in data){
    if(t.includes(key)){
      typeBot(data[key]);
      return;
    }
  }

  typeBot("🤔 Sorry, I didn't understand. You can ask about school, streams, admissions, achievements, facilities, or speak your query.");
}

// Quick button triggers
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

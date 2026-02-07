// Configuración base
const API_BASE = 'http://localhost:9090/api';
let token = null;
let usuarioLogueadoId = null;
let currentQuestion = null;

async function fetchJSON(url, options = {}) {
  if (!options.headers) options.headers = {};
  
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status}: ${msg}`);
  }
  return res.json();
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetchJSON(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    token = res.access_token;
    usuarioLogueadoId = res.payload.sub; 

    document.getElementById('loginStatus').innerText = `¡Bienvenido! ID: ${usuarioLogueadoId}`;
    
    // Cambiamos la interfaz
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    document.getElementById('playerName').innerText = res.payload.email;

  } catch (err) {
    document.getElementById('loginStatus').innerText = `Error: ${err.message}`;
  }
}

async function loadRandom() {
  try {
    const q = await fetchJSON(`${API_BASE}/trivial/random`);
    currentQuestion = q;

    document.getElementById('statement').innerText = q.statement;

    const box = document.getElementById('options');
    box.innerHTML = '';
    
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = `${opt.index}. ${opt.text}`;
      btn.onclick = () => answerQuestion(opt.index);
      box.appendChild(btn);
    });

    document.getElementById('status').innerText = '';
  } catch (err) {
    document.getElementById('status').innerText = `Error: ${err.message}`;
  }
}

async function answerQuestion(optionIndex) {
  if (!currentQuestion || !usuarioLogueadoId) return;

  try {
    const res = await fetchJSON(`${API_BASE}/trivial/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: currentQuestion.id, 
        respuesta: optionIndex,
        usuarioId: usuarioLogueadoId 
      }),
    });

    document.getElementById('status').innerText = res.correcta ? '¡Correcto!' : 'Incorrecto';
    
    if(res.correcta) {
        let scoreElem = document.getElementById('score');
        scoreElem.innerText = parseInt(scoreElem.innerText) + 1;
    }

  } catch (err) {
    document.getElementById('status').innerText = `Error: ${err.message}`;
  }
}
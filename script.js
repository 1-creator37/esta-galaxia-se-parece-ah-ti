// ================= DATOS DE PLANETAS Y DATOS CÓSMICOS =================
const PLANETS_DATA = [
  {
    id: 'greisly-star',
    name: 'Estrella Greys ✨',
    color: '#ff66b2',
    radius: 5.8,
    distance: 0,
    speed: 0,
    quote: 'Greys, eres la estrella más brillante de todo mi universo. ¡Feliz 18 Years!',
    message: 'Como la estrella principal de esta galaxia, tu sonrisa y ternura iluminan cada rincón de mi existencia.❤️',
    fact: 'Emite una luz dorada y rosada eterna que simboliza tu dulzura y tus 18 años.',
    type: 'star'
  },
  {
    id: 'mercury',
    name: 'Mercurio',
    color: '#a8a8a8',
    radius: 1.2,
    distance: 12,
    speed: 0.025,
    quote: 'Rapidez y conexión en el cosmos.',
    message: 'Nuestras conversaciones e ideas fluyen rápidamente en momentos inolvidables.',
    fact: 'Orbita alrededor del Sol más rápido que ningún otro planeta.',
    type: 'rocky'
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#e3bb76',
    radius: 1.8,
    distance: 18,
    speed: 0.018,
    quote: 'La belleza de tu alma brilla más que cualquier estrella.',
    message: 'El lucero del alba refleja la paz e incondicionalidad que transmites, Greys.',
    fact: 'Brilla más en nuestro cielo nocturno que cualquier otro planeta.',
    type: 'rocky'
  },
  {
    id: 'earth',
    name: 'Planeta Greys (Tierra) 💖',
    color: '#2b82c9',
    radius: 2.2,
    distance: 26,
    speed: 0.014,
    quote: 'Entre 8 mil millones de personas, haberte conocido a ti es mi bendición.',
    message: 'Aquí habita la persona más maravillosa y especial del mundo. ¡Felices 18 años!',
    fact: 'Un hogar único que celebra la vida y la alegría de Greys.',
    type: 'rocky',
    isEarth: true
  },
  {
    id: 'mars',
    name: 'Marte',
    color: '#c1440e',
    radius: 1.5,
    distance: 34,
    speed: 0.011,
    quote: 'Espíritu inquebrantable y aventuras juntas.',
    message: 'Representa el valor con el que superamos cualquier obstáculo.',
    fact: 'Alberga el Monte Olimpo, el volcán más alto conocido.',
    type: 'rocky'
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    color: '#d4a373',
    radius: 4.2,
    distance: 46,
    speed: 0.007,
    quote: 'Tu corazón es gigante como el planeta más grande.',
    message: 'Protege a todos a su alrededor con inmenso cariño y buenos consejos.',
    fact: 'Es más de dos veces más masivo que todos los demás planetas juntos.',
    type: 'gas'
  },
  {
    id: 'saturn',
    name: 'Saturno',
    color: '#e6c875',
    radius: 3.5,
    distance: 60,
    speed: 0.005,
    quote: 'Anillos dorados para momentos inolvidables.',
    message: 'Sus anillos deslumbrantes son como las sonrisas que compartimos día a día.',
    fact: 'Tiene anillos formados por hielo y rocas espaciales.',
    hasRings: true,
    type: 'gas'
  },
  {
    id: 'uranus',
    name: 'Urano',
    color: '#4bdeed',
    radius: 2.8,
    distance: 72,
    speed: 0.0035,
    quote: 'Tu autenticidad es tu mayor superpoder.',
    message: 'Orbita con estilo propio enseñándonos lo valioso de ser únicos.',
    fact: 'Gira sobre su costado con una inclinación casi horizontal.',
    type: 'ice'
  },
  {
    id: 'neptune',
    name: 'Neptuno',
    color: '#2746d8',
    radius: 2.7,
    distance: 84,
    speed: 0.0025,
    quote: 'Profundo y azul como el océano místico.',
    message: 'La distancia nunca enfriará el cariño sincero que te tenemos.',
    fact: 'Posee los vientos más veloces del sistema solar.',
    type: 'ice'
  }
];

// Fotos por defecto para la galería
let galleryPhotos = [
  { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500', title: 'Galaxia Espiral' },
  { url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500', title: 'Polvo Estelar' },
  { url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500', title: 'Planeta Azul Tierra' }
];

// ================= ESTADO DE LA APLICACIÓN =================
let scene, camera, renderer;
let planetMeshes = new Map();
let orbitAngles = new Map();
let selectedPlanet = null;
let cameraAngle = { theta: 0, phi: 0.55, radius: 115 };
let isPointerDown = false;
let previousPointerPos = { x: 0, y: 0 };

// ================= INICIALIZACIÓN =================
document.addEventListener('DOMContentLoaded', () => {
  setupLoginLogic();
  setupAudioLogic();
  setupGalleryLogic();
});

// --- LÓGICA DE INICIO DE SESIÓN ---
function setupLoginLogic() {
  const loginForm = document.getElementById('login-form');
  const btnQuickLogin = document.getElementById('btn-quick-login');
  const btnLogout = document.getElementById('btn-logout');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value.trim().toLowerCase();
    const pass = document.getElementById('password').value.trim();

    if ((user === 'greys' || user === 'greisly') && pass === '1234') {
      document.getElementById('login-portal').classList.add('hidden');
      document.getElementById('galaxy-app').classList.remove('hidden');
      initThreeGalaxy();
    } else {
      document.getElementById('login-error').classList.remove('hidden');
    }
  });

  btnQuickLogin.addEventListener('click', () => {
    document.getElementById('username').value = 'Greys';
    document.getElementById('password').value = '1234';
    document.getElementById('login-error').classList.add('hidden');
  });

  btnLogout.addEventListener('click', () => {
    document.getElementById('galaxy-app').classList.add('hidden');
    document.getElementById('login-portal').classList.remove('hidden');
  });
}

// --- LÓGICA DE REPRODUCTOR MÚSICA ---
function setupAudioLogic() {
  const bgAudio = document.getElementById('bg-audio');
  const btnPlayMusic = document.getElementById('btn-play-music');
  const musicStatus = document.getElementById('music-status');
  const volumeSlider = document.getElementById('volume-slider');

  btnPlayMusic.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play();
      btnPlayMusic.textContent = '⏸';
      musicStatus.textContent = 'Reproduciendo...';
    } else {
      bgAudio.pause();
      btnPlayMusic.textContent = '▶';
      musicStatus.textContent = 'Música en Pausa';
    }
  });

  volumeSlider.addEventListener('input', (e) => {
    bgAudio.volume = e.target.value;
  });
}

// --- LÓGICA DE GALERÍA DE FOTOS ---
function setupGalleryLogic() {
  const btnOpenGallery = document.getElementById('btn-open-gallery');
  const btnCloseGallery = document.getElementById('btn-close-gallery');
  const galleryModal = document.getElementById('gallery-modal');
  const photoUpload = document.getElementById('photo-upload');

  btnOpenGallery.addEventListener('click', () => {
    renderGallery();
    galleryModal.classList.remove('hidden');
  });

  btnCloseGallery.addEventListener('click', () => {
    galleryModal.classList.add('hidden');
  });

  photoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        galleryPhotos.unshift({ url: event.target.result, title: 'Recuerdo Especial Greys ✨' });
        renderGallery();
      };
      reader.readAsDataURL(file);
    }
  });
}

function renderGallery() {
  const photoGrid = document.getElementById('photo-grid');
  photoGrid.innerHTML = '';
  galleryPhotos.forEach((photo) => {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" />
      <div class="photo-caption">${photo.title}</div>
    `;
    photoGrid.appendChild(item);
  });
}

// ================= UNIVERSO 3D CON THREE.JS =================
function initThreeGalaxy() {
  const container = document.getElementById('canvas-container');
  if (container.children.length > 0) return; // Evita duplicar lienzo

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030712, 0.002);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 40, 115);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight(0xffeedd, 3, 600);
  scene.add(sunLight);

  // Fondo de Estrellas
  const starGeo = new THREE.BufferGeometry();
  const starCount = 5000;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPos[i] = (Math.random() - 0.5) * 1200;
    starPos[i + 1] = (Math.random() - 0.5) * 1200;
    starPos[i + 2] = (Math.random() - 0.5) * 1200;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, transparent: true, opacity: 0.8 });
  scene.add(new THREE.Points(starGeo, starMat));

  // Crear Botones del Nav
  const planetNav = document.getElementById('planet-nav');
  PLANETS_DATA.forEach((planet) => {
    // Botón Navegación
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.innerHTML = `<span style="color:${planet.color}">●</span> ${planet.name}`;
    btn.addEventListener('click', () => selectPlanet(planet));
    planetNav.appendChild(btn);

    // Malla Planeta
    const group = new THREE.Group();
    const geom = new THREE.SphereGeometry(planet.radius, 32, 32);
    const mat = planet.type === 'star'
      ? new THREE.MeshBasicMaterial({ color: planet.color })
      : new THREE.MeshStandardMaterial({ color: planet.color, roughness: 0.6 });

    const mesh = new THREE.Mesh(geom, mat);
    group.add(mesh);

    // Anillos si aplica
    if (planet.hasRings) {
      const ringGeom = new THREE.RingGeometry(planet.radius * 1.4, planet.radius * 2.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: planet.color, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      group.add(ringMesh);
    }

    // Órbita
    if (planet.distance > 0) {
      const curve = new THREE.EllipseCurve(0, 0, planet.distance, planet.distance, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(100);
      const orbitGeom = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
      const orbitMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.2 });
      scene.add(new THREE.LineLoop(orbitGeom, orbitMat));
    }

    scene.add(group);
    planetMeshes.set(planet.id, group);
    orbitAngles.set(planet.id, Math.random() * Math.PI * 2);
  });

  // Botón cerrar tarjeta de planeta
  document.getElementById('btn-close-planet').addEventListener('click', () => {
    selectedPlanet = null;
    document.getElementById('planet-modal').classList.add('hidden');
  });

  // Eventos de ratón/pantalla
  container.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    previousPointerPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    const deltaX = e.clientX - previousPointerPos.x;
    const deltaY = e.clientY - previousPointerPos.y;

    cameraAngle.theta -= deltaX * 0.005;
    cameraAngle.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngle.phi - deltaY * 0.005));
    previousPointerPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointerup', () => { isPointerDown = false; });
  window.addEventListener('resize', onWindowResize);

  // Loop de Animación
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    PLANETS_DATA.forEach((planet) => {
      const group = planetMeshes.get(planet.id);
      if (!group) return;

      group.rotation.y += delta * 0.5;

      if (planet.distance > 0) {
        let angle = orbitAngles.get(planet.id) + planet.speed * delta * 15;
        orbitAngles.set(planet.id, angle);
        group.position.x = Math.cos(angle) * planet.distance;
        group.position.z = Math.sin(angle) * planet.distance;
      }
    });

    if (!isPointerDown && !selectedPlanet) {
      cameraAngle.theta += delta * 0.1;
    }

    if (!selectedPlanet) {
      camera.position.x = cameraAngle.radius * Math.sin(cameraAngle.phi) * Math.sin(cameraAngle.theta);
      camera.position.y = cameraAngle.radius * Math.cos(cameraAngle.phi);
      camera.position.z = cameraAngle.radius * Math.sin(cameraAngle.phi) * Math.cos(cameraAngle.theta);
      camera.lookAt(0, 0, 0);
    } else {
      const targetGroup = planetMeshes.get(selectedPlanet.id);
      if (targetGroup) {
        camera.lookAt(targetGroup.position);
      }
    }

    renderer.render(scene, camera);
  }

  animate();
}

function selectPlanet(planet) {
  selectedPlanet = planet;
  const modal = document.getElementById('planet-modal');
  
  if (!planet) {
    modal.classList.add('hidden');
    return;
  }

  document.getElementById('planet-name').textContent = planet.name;
  document.getElementById('planet-quote').textContent = `"${planet.quote}"`;
  document.getElementById('planet-msg').textContent = planet.message;
  document.getElementById('planet-fact').textContent = `💡 Dato Cósmico: ${planet.fact}`;
  modal.classList.remove('hidden');
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

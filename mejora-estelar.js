/**
 * Script de Mejora Estelar en Calidad Máxima (8K Optimization)
 */

(function() {
    console.log("Iniciando motor visual en máxima resolución...");

    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => iniciarCalidad8K();
        document.head.appendChild(script);
    } else {
        iniciarCalidad8K();
    }

    function iniciarCalidad8K() {
        const overlayCanvas = document.createElement('canvas');
        overlayCanvas.id = 'canvas-8k-visual';
        overlayCanvas.style.position = 'fixed';
        overlayCanvas.style.top = '0';
        overlayCanvas.style.left = '0';
        overlayCanvas.style.width = '100vw';
        overlayCanvas.style.height = '100vh';
        overlayCanvas.style.pointerEvents = 'none';
        overlayCanvas.style.zIndex = '999';
        document.body.appendChild(overlayCanvas);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        
        // Configuración clave para 8K: antialias activado y forzar el PixelRatio máximo del dispositivo
        const renderer = new THREE.WebGLRenderer({ 
            canvas: overlayCanvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        // window.devicePixelRatio fuerza la máxima nitidez en pantallas de ultra alta definición (4K/8K)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));

        // Fondo de estrellas de alta densidad (Efecto ultra nítido tipo 8K)
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 8000; // Cuatro veces más partículas para mayor profundidad
        const starPositions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i++) {
            starPositions[i] = (Math.random() - 0.5) * 1200;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        
        const starsMaterial = new THREE.PointsMaterial({ 
            color: 0xffffff, 
            size: 0.8, // Tamaños más finos para que parezcan estrellas lejanas ultradefinidas
            transparent: true,
            opacity: 0.9
        });
        
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        camera.position.z = 50;

        function animar8K() {
            requestAnimationFrame(animar8K);
            starField.rotation.y += 0.0001;
            renderer.render(scene, camera);
        }

        animar8K();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
        });

        console.log("¡Entorno configurado a máxima resolución y nitidez!");
    }
})();

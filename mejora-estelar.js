/**
 * Script independiente para mejorar la calidad visual de tu Sistema Solar existente.
 * Inserta este archivo o copia este código en tu proyecto sin alterar tu estructura base.
 */

(function() {
    console.log("Inyectando mejoras de calidad (Three.js)...");

    // 1. Asegurar que Three.js esté disponible en la página
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => iniciarMejorasVisuales();
        document.head.appendChild(script);
    } else {
        iniciarMejorasVisuales();
    }

    function iniciarMejorasVisuales() {
        // Creamos un canvas flotante transparente por encima o integramos sobre el existente
        const overlayCanvas = document.createElement('canvas');
        overlayCanvas.id = 'canvas-mejora-visual';
        overlayCanvas.style.position = 'fixed';
        overlayCanvas.style.top = '0';
        overlayCanvas.style.left = '0';
        overlayCanvas.style.width = '100vw';
        overlayCanvas.style.height = '100vh';
        overlayCanvas.style.pointerEvents = 'none'; // Para que no bloquee clics en tus menús
        overlayCanvas.style.zIndex = '999'; // Modifica según convenga con tu CSS
        document.body.appendChild(overlayCanvas);

        // Configuración de Three.js dedicada a los efectos de alta calidad (Fondo de estrellas y luces)
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: overlayCanvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Sistema de partículas avanzado para el fondo de estrellas profundas
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 3000;
        const starPositions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i++) {
            starPositions[i] = (Math.random() - 0.5) * 800;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        
        // Material con brillo difuminado para las estrellas
        const starsMaterial = new THREE.PointsMaterial({ 
            color: 0xffffff, 
            size: 1.2,
            transparent: true,
            opacity: 0.8
        });
        
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        camera.position.z = 50;

        // Bucle de renderizado independiente para las mejoras
        function animarMejoras() {
            requestAnimationFrame(animarMejoras);
            
            // Rotación sutil del campo estelar para dar dinamismo al espacio profundo
            starField.rotation.y += 0.0002;
            starField.rotation.x += 0.0001;

            renderer.render(scene, camera);
        }

        animarMejoras();

        // Control de redimensionamiento de ventana automático
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        console.log("¡Mejoras aplicadas con éxito sin tocar tu código base!");
    }
})();

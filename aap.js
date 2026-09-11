/* =========================================================
   SAMYAK SOLAR - ADVANCED 3D INTERACTIONS
   ========================================================= */

// =========================
// LOADING SCREEN
// =========================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 1800);
});

// =========================
// CUSTOM CURSOR
// =========================
(function initCursor() {
    if (window.innerWidth < 768) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX - 20 + 'px';
        ring.style.top = ringY - 20 + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .feature-card, .features-box, .prject .card, .step-box, .contact-item, .footer-social a').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
})();

// =========================
// THREE.JS 3D BACKGROUND
// =========================
(function initThreeBackground() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Particles
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        const color = new THREE.Color();
        color.setHSL(0.12 + Math.random() * 0.05, 0.8, 0.5 + Math.random() * 0.3);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 3 + 0.5;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Wireframe Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(2.5, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd900,
        wireframe: true,
        transparent: true,
        opacity: 0.06
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icoMesh);

    // Second wireframe
    const ico2Geometry = new THREE.IcosahedronGeometry(3.5, 1);
    const ico2Material = new THREE.MeshBasicMaterial({
        color: 0x34aeff,
        wireframe: true,
        transparent: true,
        opacity: 0.04
    });
    const ico2Mesh = new THREE.Mesh(ico2Geometry, ico2Material);
    scene.add(ico2Mesh);

    camera.position.z = 5;

    let mouseX3D = 0, mouseY3D = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX3D = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY3D = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.0005;

        particles.rotation.y = time * 0.05;
        particles.rotation.x = time * 0.03;

        icoMesh.rotation.x = time * 0.15;
        icoMesh.rotation.y = time * 0.1;

        ico2Mesh.rotation.x = -time * 0.1;
        ico2Mesh.rotation.y = time * 0.08;

        camera.position.x += (mouseX3D * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY3D * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

// =========================
// SCROLL PROGRESS BAR
// =========================
(function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
})();

// =========================
// NAVBAR SCROLL EFFECT
// =========================
(function initNavScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
})();

// =========================
// SCROLL REVEAL ANIMATIONS
// =========================
(function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
})();

// =========================
// 3D TILT ON CARDS
// =========================
(function init3DTilt() {
    if (window.innerWidth < 768) return;

    const tiltElements = document.querySelectorAll('.feature-card, .features-box, .prject .card, .calculator');

    tiltElements.forEach(el => {
        el.style.transformStyle = 'preserve-3d';
        el.style.transition = 'transform 0.1s ease';

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px) scale(1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        });
    });
})();

// =========================
// PARALLAX EFFECT ON HERO
// =========================
(function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const headerSection = document.querySelector('.header-section');
    if (!heroContent || !headerSection) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = headerSection.offsetHeight;

        if (scrollY < heroHeight) {
            const progress = scrollY / heroHeight;
            heroContent.style.transform = `translateY(${scrollY * 0.3}px) translateZ(${60 - progress * 60}px) scale(${1 - progress * 0.1})`;
            heroContent.style.opacity = 1 - progress * 1.2;
        }
    });

    // Mouse parallax on hero
    if (window.innerWidth >= 768) {
        headerSection.addEventListener('mousemove', (e) => {
            const rect = headerSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroContent.style.transform += ` rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
        });
    }
})();

// =========================
// FLOATING PARTICLES DOM
// =========================
(function initParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = (Math.random() * 4 + 1) + 'px';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
    }
})();

// =========================
// SMOOTH ANCHOR SCROLL
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =========================
// NOISE OVERLAY
// =========================
(function initNoise() {
    const noise = document.createElement('div');
    noise.className = 'noise-overlay';
    document.body.appendChild(noise);
})();

// =========================
// TYPED EFFECT ON HERO TAG
// =========================
(function initTypedEffect() {
    const tag = document.querySelector('.hero-tag');
    if (!tag) return;

    const text = tag.textContent.trim();
    tag.textContent = '';
    tag.style.borderRight = '2px solid var(--primary)';

    let i = 0;
    function typeChar() {
        if (i < text.length) {
            tag.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 40);
        } else {
            setTimeout(() => {
                tag.style.borderRight = 'none';
            }, 1000);
        }
    }

    setTimeout(typeChar, 2000);
})();

// =========================
// COUNTER ANIMATION
// =========================
(function initCounters() {
    const counterElements = document.querySelectorAll('[data-count]');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current);
                }, 16);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => observer.observe(el));
})();

// =========================
// MOUSE TILT ON FEATURE ICONS
// =========================
(function initIconTilt() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.feature-icon, .box-icon, .contact-icon').forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            icon.style.transform = `translateZ(25px) rotateY(${x * 25}deg) rotateX(${-y * 25}deg) scale(1.15)`;
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateZ(0) rotateY(0) rotateX(0) scale(1)';
        });
    });
})();

// =========================
// STEP COUNTERS ANIMATION
// =========================
(function initStepAnimation() {
    const steps = document.querySelectorAll('.step-box');
    if (!steps.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateZ(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px) translateZ(-20px)';
        step.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(step);
    });
})();

// =========================
// CONTACT FORM ANIMATION
// =========================
(function initFormEffects() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateZ(10px)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateZ(0)';
        });
    });
})();

// =========================
// MAGNETIC BUTTONS
// =========================
(function initMagneticButtons() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.btn-primary, .btn-whatsapp, .calculate-btn, .opportunity-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) translateY(0)';
        });
    });
})();

// =========================
// SOLAR CALCULATOR (existing logic preserved)
// =========================
function calculateSolar() {
    const type = document.getElementById("solarType").value;
    const bill = Number(document.getElementById("monthlyBill").value);
    const units = Number(document.getElementById("monthlyUnits").value);

    if (bill <= 0) {
        alert("Please enter your monthly electricity bill.");
        return;
    }

    if (units <= 0) {
        alert("Please enter your monthly consumption.");
        return;
    }

    const capacity = Math.max(1, Math.ceil(units / 120));
    const monthlySaving = bill * 0.90;
    const yearlySaving = monthlySaving * 12;

    let costPerKW;
    if (type === "residential") {
        costPerKW = 55000;
    } else if (type === "commercial") {
        costPerKW = 50000;
    } else {
        costPerKW = 45000;
    }

    const systemCost = capacity * costPerKW;
    const payback = systemCost / yearlySaving;

    document.getElementById("capacity").textContent = capacity + " kW";
    document.getElementById("monthlySaving").textContent =
        "₹" + Math.round(monthlySaving).toLocaleString("en-IN");
    document.getElementById("yearlySaving").textContent =
        "₹" + Math.round(yearlySaving).toLocaleString("en-IN");
    document.getElementById("systemCost").textContent =
        "₹" + Math.round(systemCost).toLocaleString("en-IN");
    document.getElementById("payback").textContent =
        payback.toFixed(1) + " Years";

    const result = document.getElementById("result");
    result.style.display = "block";
    result.style.animation = "none";
    result.offsetHeight;
    result.style.animation = "resultReveal 0.5s ease-out";
}

// =========================
// GLOW ORBS IN SECTIONS
// =========================
(function initGlowOrbs() {
    const sections = document.querySelectorAll('.section-solar-solutions, .solar-section, .aboutus-section, .prject');
    sections.forEach(section => {
        const orb1 = document.createElement('div');
        orb1.className = 'glow-orb glow-orb-1';
        section.style.position = 'relative';
        section.appendChild(orb1);

        const orb2 = document.createElement('div');
        orb2.className = 'glow-orb glow-orb-2';
        section.appendChild(orb2);
    });
})();

// =========================
// SMOOTH PAGE TRANSITIONS
// =========================
(function initPageTransitions() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
})();

// =========================
// EASTER EGG: KONAMI CODE
// =========================
(function initEasterEgg() {
    let keys = [];
    const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    document.addEventListener('keydown', (e) => {
        keys.push(e.keyCode);
        if (keys.length > 10) keys.shift();
        if (JSON.stringify(keys) === JSON.stringify(code)) {
            document.body.style.animation = 'rainbow 2s linear';
            setTimeout(() => { document.body.style.animation = ''; }, 2000);
        }
    });
})();

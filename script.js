document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // 1. Navigation & Scroll Reveal Logic
    // ----------------------------------------
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active state based on scroll position
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navItems.forEach((navItem) => {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('href') === `#${entry.target.id}`) {
                        navItem.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.25 });

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // only reveal once
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });

    // ----------------------------------------
    // 2. Typing Terminal Effect
    // ----------------------------------------
    const typeWriterElement = document.getElementById('typewriter-text');
    if (typeWriterElement) {
        const textToType = "Hi, I'm Justin.";
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < textToType.length) {
                typeWriterElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); // typing speed
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1500);
    }

    // ----------------------------------------
    // 3. Neural Network Canvas Background
    // ----------------------------------------
    const canvas = document.getElementById('network-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Mouse position
        let mouse = {
            x: null,
            y: null,
            radius: 150
        }

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', function() {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        // Resize event
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Re-initialize particles to fit new screen
        });

        // Create Particle
        class Particle {
            constructor(x, y, dirX, dirY, size, color) {
                this.x = x;
                this.y = y;
                this.dirX = dirX;
                this.dirY = dirY;
                this.size = size;
                this.color = color;
            }
            // Draw method
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            // Update method
            update() {
                // Check if particle is still within canvas
                if (this.x > canvas.width || this.x < 0) {
                    this.dirX = -this.dirX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.dirY = -this.dirY;
                }

                // Move particle
                this.x += this.dirX;
                this.y += this.dirY;

                // Mouse interactivity
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    // Slow down slightly if near mouse
                    if (distance < mouse.radius) {
                        this.x -= dx * 0.01;
                        this.y -= dy * 0.01;
                    }
                }

                this.draw();
            }
        }

        // Initialize particle array
        function init() {
            particlesArray = [];
            // Amount of particles based on screen size
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1; // 1 to 3
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let dirX = (Math.random() * 2) - 1; // -1 to 1 speed
                let dirY = (Math.random() * 2) - 1;
                let color = 'rgba(0, 255, 204, 0.8)'; // Cyan particles

                particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
            }
        }

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        // Connect particles close to each other
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                                 + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(0, 255, 204, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
                
                // Draw line to mouse
                if (mouse.x != null && mouse.y != null) {
                    let mouseDistance = Math.sqrt(
                        Math.pow((particlesArray[a].x - mouse.x), 2) + 
                        Math.pow((particlesArray[a].y - mouse.y), 2)
                    );
                    
                    if (mouseDistance < mouse.radius) {
                        ctx.strokeStyle = `rgba(255, 0, 255, ${1 - mouseDistance/mouse.radius})`; // Magenta links to mouse
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        init();
        animate();
    }
});

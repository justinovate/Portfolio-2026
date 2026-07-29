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
                revealObserver.unobserve(entry.target);
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
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1200);
    }

    // ----------------------------------------
    // 3. Neural Network Canvas Background
    // ----------------------------------------
    const canvas = document.getElementById('network-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

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

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        class Particle {
            constructor(x, y, dirX, dirY, size, color) {
                this.x = x;
                this.y = y;
                this.dirX = dirX;
                this.dirY = dirY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.dirX = -this.dirX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.dirY = -this.dirY;
                }
                this.x += this.dirX;
                this.y += this.dirY;

                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        this.x -= dx * 0.01;
                        this.y -= dy * 0.01;
                    }
                }

                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let dirX = (Math.random() * 2) - 1;
                let dirY = (Math.random() * 2) - 1;
                let color = 'rgba(0, 255, 204, 0.8)';

                particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

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
                
                if (mouse.x != null && mouse.y != null) {
                    let mouseDistance = Math.sqrt(
                        Math.pow((particlesArray[a].x - mouse.x), 2) + 
                        Math.pow((particlesArray[a].y - mouse.y), 2)
                    );
                    
                    if (mouseDistance < mouse.radius) {
                        ctx.strokeStyle = `rgba(255, 0, 255, ${1 - mouseDistance/mouse.radius})`;
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

    // ----------------------------------------
    // 4. Virtual File System & Viewport-Locked CLI Engine
    // ----------------------------------------
    const asciiLogo = `
  ______  _____  _____ _______ _____ _   _ 
 |___  / |  ___|/  ___|__   __/|_   _| \ | |
    / /  | |__  \ \`--.   | |    | |  |  \| |
   / /   |  __|  \`--. \  | |    | |  | . \` |
 ./ /___ | |___ /\__/ /  | |   _| |_ | |\  |
 \_____/ \____/ \____/   |_|  |_____|\_| \_|
  Computer Engineering // AI Specialization
`;

    const vfs = {
        name: '/',
        type: 'dir',
        children: {
            'about.txt': {
                name: 'about.txt',
                type: 'file',
                description: 'Personal Bio & Engineering Background',
                content: `
USER: Justin Andre De Leon
ROLE: Computer Engineering Student (Specializing in Artificial Intelligence)
INSTITUTION: Mapúa University, Manila

SUMMARY:
Building clean, user-focused applications and scalable systems at the intersection of modern software engineering, Artificial Intelligence, and embedded hardware.

CURRENT FOCUS:
- Full-Stack Web Development (React.js, Next.js, Tailwind CSS, Supabase)
- AI & NLP Systems (Retrieval-Augmented Generation, LLMs, Semantic Search)
- Hardware & Microcontrollers (Arduino, ESP32, Circuit Prototyping)
`
            },
            'skills.txt': {
                name: 'skills.txt',
                type: 'file',
                description: 'Technical Skills Matrix',
                content: `
[PROGRAMMING LANGUAGES]
- Python, JavaScript (ES6+), C / C++

[ARTIFICIAL INTELLIGENCE]
- RAG & LLMs, Semantic Search, TensorFlow, Scikit-learn, NLP

[WEB ARCHITECTURE]
- React.js, Next.js, Tailwind CSS, Supabase, Node.js, Vercel, Netlify

[HARDWARE & EMBEDDED]
- Arduino Microcontrollers, Circuit Prototyping, Sensors & Actuators
`
            },
            'contact.txt': {
                name: 'contact.txt',
                type: 'file',
                description: 'Communication Channels',
                content: `
EMAIL: deleonjustinandre@gmail.com
LINKEDIN: https://www.linkedin.com/in/j-deleon/
GITHUB: https://github.com/justinovate
RESUME: ./JustinDeLeon_Resume.pdf
`
            },
            'resume.pdf': {
                name: 'resume.pdf',
                type: 'link',
                description: 'Resume Download Link',
                url: './JustinDeLeon_Resume.pdf'
            },
            'projects': {
                name: 'projects',
                type: 'dir',
                description: 'Categorized Project Directory',
                children: {
                    'ai': {
                        name: 'ai',
                        type: 'dir',
                        description: 'Artificial Intelligence & NLP Projects',
                        children: {
                            'career-path-navigator': {
                                name: 'career-path-navigator',
                                type: 'project',
                                title: 'Career Path Navigator',
                                year: '2025',
                                tech: ['Python', 'RAG / LLMs', 'NLP', 'Semantic Search'],
                                url: 'https://career-path-navigator-mu3b.onrender.com',
                                description: 'Academic & Career Intelligence platform powered by Retrieval-Augmented Generation (RAG) & NLP. Maps student skill profiles and adaptive AI quiz results to Philippine university programs and top employers.'
                            }
                        }
                    },
                    'web_apps': {
                        name: 'web_apps',
                        type: 'dir',
                        description: 'Web Applications & Full-Stack Systems',
                        children: {
                            'ieee-musb-hub': {
                                name: 'ieee-musb-hub',
                                type: 'project',
                                title: 'IEEE-MUSB Member Hub',
                                year: '2026',
                                tech: ['Next.js', 'Tailwind CSS', 'Supabase', 'Vercel'],
                                url: 'https://ieee-musb.vercel.app/',
                                description: 'Full-stack management system for IEEE Mapúa University Student Branch. Features member directory verification, announcement portal, and Supabase RLS security.'
                            },
                            'i3cts-2027-conference': {
                                name: 'i3cts-2027-conference',
                                type: 'project',
                                title: 'I3CTS 2027 Conference Site',
                                year: '2027',
                                tech: ['React.js', 'JavaScript', 'Vite', 'UI/UX Design'],
                                url: 'https://i3cts2027.netlify.app/',
                                description: 'Official web platform for the International Conference on Consumer, Computing, and Communications Technology Systems (I3CTS 2027) with EasyChair integration.'
                            }
                        }
                    },
                    'hardware': {
                        name: 'hardware',
                        type: 'dir',
                        description: 'Embedded Systems & Microcontroller Prototypes',
                        children: {
                            'microcontroller-dev': {
                                name: 'microcontroller-dev',
                                type: 'project',
                                title: 'Microcontroller & Arduino Prototypes',
                                year: '2026',
                                tech: ['Arduino', 'C++', 'ESP32', 'Sensors'],
                                url: '#contact',
                                description: 'Developing embedded systems and circuit prototypes using Arduino & ESP32 microcontrollers for sensor telemetry and hardware control.'
                            }
                        }
                    }
                }
            }
        }
    };

    let currentPath = ['/'];
    let commandHistory = [];
    let historyIndex = -1;
    let currentMode = 'cli'; // 'cli' or 'gui'

    const cliInputField = document.getElementById('cli-input-field');
    const cliOutput = document.getElementById('cli-output');
    const cliPromptText = document.getElementById('cli-prompt-text');
    const modeToggleBtn = document.getElementById('mode-toggle-btn');
    const modeBtnText = document.getElementById('mode-btn-text');
    const activeModeBadge = document.getElementById('active-mode-badge');

    function getNode(pathArr) {
        let node = vfs;
        for (let i = 1; i < pathArr.length; i++) {
            const part = pathArr[i];
            if (node.children && node.children[part]) {
                node = node.children[part];
            } else {
                return null;
            }
        }
        return node;
    }

    function getPathString() {
        if (currentPath.length === 1) return '~';
        return '~/' + currentPath.slice(1).join('/');
    }

    function updatePrompt() {
        if (cliPromptText) {
            cliPromptText.textContent = `root@justin:${getPathString()}$`;
        }
    }

    function appendOutput(htmlContent) {
        if (!cliOutput) return;
        const line = document.createElement('div');
        line.className = 'cli-line';
        line.innerHTML = htmlContent;
        cliOutput.appendChild(line);
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }

    function executeCommand(rawCommand) {
        const trimmed = rawCommand.trim();
        if (!trimmed) return;

        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;

        // Output typed prompt line
        appendOutput(`<span class="cli-user-cmd">root@justin:${getPathString()}$ ${escapeHtml(trimmed)}</span>`);

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        const currentNode = getNode(currentPath);

        switch (cmd) {
            case 'help':
            case 'commands':
            case 'show commands':
            case '?':
                showHelp();
                break;

            case 'banner':
            case 'sys':
            case 'logo':
                appendOutput(`<pre class="ascii-banner">${asciiLogo}</pre>`);
                break;

            case 'ls':
            case 'dir':
                listDirectory(currentNode, args[0]);
                break;

            case 'cd':
                changeDirectory(args[0]);
                break;

            case 'pwd':
                appendOutput(`/${currentPath.slice(1).join('/')}`);
                break;

            case 'cat':
            case 'view':
            case 'read':
                catFile(currentNode, args[0]);
                break;

            case 'about':
                catFile(vfs, 'about.txt');
                break;

            case 'skills':
                catFile(vfs, 'skills.txt');
                break;

            case 'projects':
                changeDirectory('projects');
                listDirectory(getNode(['/', 'projects']));
                break;

            case 'run':
            case 'open':
            case 'exec':
                runProject(currentNode, args[0]);
                break;

            case 'clear':
            case 'cls':
                if (cliOutput) {
                    cliOutput.innerHTML = '';
                }
                break;

            case 'whoami':
                appendOutput(`Justin De Leon | Computer Engineering Student (AI Specialization) @ Mapúa University`);
                break;

            case 'contact':
            case 'ping':
                catFile(vfs, 'contact.txt');
                break;

            case 'gui':
            case 'mode':
            case 'cards':
                toggleViewMode('gui');
                break;

            default:
                appendOutput(`<span style="color:#ef4444;">zsh: command not found: ${escapeHtml(cmd)}. Type <span class="cmd-highlight">'help'</span> or <span class="cmd-highlight">'commands'</span> to list all supported commands.</span>`);
                break;
        }
    }

    function showHelp() {
        appendOutput(`
<div style="color: var(--color-cyan); font-weight: bold; margin-bottom: 0.5rem;">[AVAILABLE LINUX SHELL COMMANDS]</div>
<table style="width:100%; border-collapse: collapse; margin: 0.25rem 0;">
  <tr><td style="color:var(--color-green); width:140px; font-weight:bold;">help / commands</td><td>Display list of all available CLI shell commands</td></tr>
  <tr><td style="color:var(--color-green); width:140px; font-weight:bold;">ls [path]</td><td>List files & directories in current working directory</td></tr>
  <tr><td style="color:var(--color-green); font-weight:bold;">cd &lt;dir&gt;</td><td>Change directory (e.g. <span class="cmd-highlight">cd projects</span>, <span class="cmd-highlight">cd ai</span>, <span class="cmd-highlight">cd ..</span>, <span class="cmd-highlight">cd /</span>)</td></tr>
  <tr><td style="color:var(--color-green); font-weight:bold;">pwd</td><td>Print current working directory path</td></tr>
  <tr><td style="color:var(--color-green); font-weight:bold;">cat &lt;file&gt;</td><td>Read file contents (e.g. <span class="cmd-highlight">cat about.txt</span>, <span class="cmd-highlight">cat skills.txt</span>)</td></tr>
  <tr><td style="color:var(--color-green); font-weight:bold;">run &lt;project&gt;</td><td>Open live project site in new tab (e.g. <span class="cmd-highlight">run career-path-navigator</span>)</td></tr>
  <tr><td style="color:var(--color-green); font-weight:bold;">clear / cls</td><td>Clear terminal screen output history</td></tr>
  <tr><td style="color:var(--color-green); font-weight:bold;">whoami</td><td>Display user identity and academic role</td></tr>
  <tr><td style="color:var(--color-green); font-weight:bold;">banner</td><td>Print ASCII banner logo</td></tr>
  <tr><td style="color:var(--color-green); font-weight:bold;">gui / mode</td><td>Switch focus to classic visual project cards</td></tr>
</table>
<div style="color: var(--color-text-muted); font-size: 0.85rem; margin-top: 0.25rem;">PRO TIP: Press <span style="color:white;">Tab</span> for auto-completion, or <span style="color:white;">Up/Down Arrow</span> keys for command history.</div>
`);
    }

    function listDirectory(currentNode, targetArg) {
        let node = currentNode;
        if (targetArg) {
            if (targetArg === '..' || targetArg === '../') {
                const parentPath = currentPath.slice(0, -1);
                node = getNode(parentPath.length ? parentPath : ['/']);
            } else if (targetArg === '/' || targetArg === '~') {
                node = vfs;
            } else if (currentNode.children && currentNode.children[targetArg]) {
                node = currentNode.children[targetArg];
            } else {
                appendOutput(`<span style="color:#ef4444;">ls: cannot access '${escapeHtml(targetArg)}': No such file or directory</span>`);
                return;
            }
        }

        if (node.type !== 'dir') {
            appendOutput(renderNodeItem(node.name, node));
            return;
        }

        const items = Object.keys(node.children).map(key => {
            const child = node.children[key];
            return renderNodeItem(key, child);
        });

        appendOutput(items.join(' &nbsp;&nbsp; '));
    }

    function renderNodeItem(name, node) {
        if (node.type === 'dir') {
            return `<span class="cli-dir-name">${name}/</span>`;
        } else if (node.type === 'file') {
            return `<span class="cli-file-name">${name}</span>`;
        } else if (node.type === 'link') {
            return `<span class="cli-link-name">${name}*</span>`;
        } else if (node.type === 'project') {
            return `<span class="cli-link-name" style="color:var(--color-cyan);">${name}*</span>`;
        }
        return name;
    }

    function changeDirectory(targetDir) {
        if (!targetDir || targetDir === '~' || targetDir === '/') {
            currentPath = ['/'];
            updatePrompt();
            return;
        }

        if (targetDir === '..') {
            if (currentPath.length > 1) {
                currentPath.pop();
            }
            updatePrompt();
            return;
        }

        const parts = targetDir.replace(/\/$/, '').split('/');
        let tempPath = [...currentPath];

        for (const part of parts) {
            if (part === '.') continue;
            if (part === '..') {
                if (tempPath.length > 1) tempPath.pop();
                continue;
            }

            const currNode = getNode(tempPath);
            if (currNode && currNode.children && currNode.children[part]) {
                if (currNode.children[part].type === 'dir') {
                    tempPath.push(part);
                } else {
                    appendOutput(`<span style="color:#ef4444;">cd: not a directory: ${escapeHtml(part)}</span>`);
                    return;
                }
            } else {
                appendOutput(`<span style="color:#ef4444;">cd: no such file or directory: ${escapeHtml(targetDir)}</span>`);
                return;
            }
        }

        currentPath = tempPath;
        updatePrompt();
    }

    function catFile(currentNode, fileName) {
        if (!fileName) {
            appendOutput(`<span style="color:#ef4444;">cat: missing filename argument. Usage: cat &lt;filename&gt;</span>`);
            return;
        }

        if (currentNode.children && currentNode.children[fileName]) {
            const child = currentNode.children[fileName];
            if (child.type === 'file') {
                appendOutput(`<pre style="font-family:inherit; color:white; white-space:pre-wrap; margin:0;">${escapeHtml(child.content)}</pre>`);
            } else if (child.type === 'link') {
                appendOutput(`Opening link ${child.name}... <a href="${child.url}" target="_blank" class="cli-link-name">${child.url}</a>`);
                window.open(child.url, '_blank');
            } else if (child.type === 'project') {
                appendOutput(`
<div style="border: 1px dashed var(--color-cyan); padding: 0.75rem; margin-top: 0.25rem;">
  <div style="color:var(--color-cyan); font-weight:bold;">> ${child.title} (${child.year})</div>
  <div style="color:white; margin: 0.25rem 0;">${child.description}</div>
  <div style="color:var(--color-text-muted);">TECH: ${child.tech.join(', ')}</div>
  <div style="margin-top: 0.5rem;"><a href="${child.url}" target="_blank" class="cli-link-name">> RUN ${child.url}</a></div>
</div>
`);
            } else if (child.type === 'dir') {
                appendOutput(`<span style="color:#ef4444;">cat: '${escapeHtml(fileName)}': Is a directory. Use 'cd ${escapeHtml(fileName)}' or 'ls'.</span>`);
            }
        } else {
            appendOutput(`<span style="color:#ef4444;">cat: ${escapeHtml(fileName)}: No such file or directory</span>`);
        }
    }

    function runProject(currentNode, projName) {
        if (!projName) {
            appendOutput(`<span style="color:#ef4444;">run: missing project name. Try 'run career-path-navigator' or 'run ieee-musb-hub'.</span>`);
            return;
        }

        let projNode = null;

        function findProject(node) {
            if (!node || !node.children) return;
            if (node.children[projName] && (node.children[projName].type === 'project' || node.children[projName].type === 'link')) {
                projNode = node.children[projName];
                return;
            }
            for (const k in node.children) {
                if (node.children[k].type === 'dir') {
                    findProject(node.children[k]);
                }
            }
        }

        findProject(vfs);

        if (projNode && projNode.url && projNode.url !== '#' && projNode.url !== '#contact') {
            appendOutput(`Executing binary: <span class="text-cyan">${projName}.exe</span> ➔ Opening ${projNode.url}`);
            window.open(projNode.url, '_blank');
        } else if (projNode && (projNode.url === '#' || projNode.url === '#contact')) {
            appendOutput(`<span class="text-green">> Project '${projName}' is currently in hardware prototyping stage. Status: IN_DEVELOPMENT.</span>`);
        } else {
            appendOutput(`<span style="color:#ef4444;">run: project '${escapeHtml(projName)}' not found. Type 'ls' or 'help'.</span>`);
        }
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    if (cliInputField) {
        cliInputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = cliInputField.value;
                cliInputField.value = '';
                executeCommand(val);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                handleTabCompletion();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length > 0) {
                    if (historyIndex > 0) historyIndex--;
                    cliInputField.value = commandHistory[historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    cliInputField.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    cliInputField.value = '';
                }
            }
        });
    }

    function handleTabCompletion() {
        const val = cliInputField.value;
        const commandsList = ['help', 'commands', 'ls', 'cd', 'pwd', 'cat', 'run', 'clear', 'whoami', 'contact', 'gui', 'banner', 'about', 'skills', 'projects'];
        const currentNode = getNode(currentPath);
        let childrenKeys = [];
        if (currentNode && currentNode.children) {
            childrenKeys = Object.keys(currentNode.children);
        }

        const parts = val.split(' ');
        if (parts.length === 1) {
            const matches = commandsList.filter(c => c.startsWith(parts[0]));
            if (matches.length === 1) {
                cliInputField.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                appendOutput(`<span style="color:var(--color-text-muted);">${matches.join(' &nbsp; ')}</span>`);
            }
        } else if (parts.length >= 2) {
            const target = parts[parts.length - 1];
            const matches = childrenKeys.filter(k => k.startsWith(target));
            if (matches.length === 1) {
                parts[parts.length - 1] = matches[0];
                cliInputField.value = parts.join(' ');
            } else if (matches.length > 1) {
                appendOutput(`<span style="color:var(--color-text-muted);">${matches.join(' &nbsp; ')}</span>`);
            }
        }
    }

    // Toggle CLI Mode vs GUI Viewport Mode
    function toggleViewMode(targetMode) {
        if (!targetMode) {
            currentMode = currentMode === 'cli' ? 'gui' : 'cli';
        } else {
            currentMode = targetMode;
        }

        if (currentMode === 'gui') {
            document.body.classList.remove('mode-cli');
            document.body.classList.add('mode-gui');

            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
            if (modeBtnText) modeBtnText.textContent = 'Switch to CLI Shell';
            if (activeModeBadge) {
                activeModeBadge.textContent = 'GUI CARDS';
                activeModeBadge.style.borderColor = 'var(--color-magenta)';
                activeModeBadge.style.color = 'var(--color-magenta)';
            }
            appendOutput(`<span class="text-cyan">Switched focus down to Visual Project Cards.</span>`);
        } else {
            document.body.classList.remove('mode-gui');
            document.body.classList.add('mode-cli');

            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.scrollIntoView({ behavior: 'smooth' });
            }
            if (modeBtnText) modeBtnText.textContent = 'Switch to GUI Cards';
            if (activeModeBadge) {
                activeModeBadge.textContent = 'CLI MODE';
                activeModeBadge.style.borderColor = 'var(--color-cyan)';
                activeModeBadge.style.color = 'var(--color-cyan)';
            }
            if (cliInputField) cliInputField.focus();
        }
    }

    if (modeToggleBtn) {
        modeToggleBtn.addEventListener('click', () => {
            toggleViewMode();
        });
    }

    // Set initial mode to CLI mode with viewport lock
    toggleViewMode('cli');
});

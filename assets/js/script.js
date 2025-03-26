// Terminal Typing Effect
const terminalText = document.getElementById('terminal-text');
const terminalLines = [
    "Welcome to Silas Henrique's portfolio",
    "Initializing systems...",
    "Loading programmer profile...",
    "> Education: Computer Engineering @ UEMA",
    "> Skills: Java, Python, Spring Boot, Arduino",
    "> Interests: AI, Robotics, Backend Dev",
    "System ready...",
    "Type 'help' for commands"
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeTerminal() {
    if (isPaused) return;

    const currentLine = terminalLines[lineIndex];
    
    if (isDeleting) {
        terminalText.textContent = currentLine.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % terminalLines.length;
            setTimeout(typeTerminal, 500);
            return;
        }
    } else {
        terminalText.textContent = currentLine.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentLine.length) {
            if (lineIndex === terminalLines.length - 1) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    setTimeout(typeTerminal, 1500);
                }, 3000);
                return;
            }
            isDeleting = true;
            setTimeout(typeTerminal, 1500);
            return;
        }
    }
    
    setTimeout(typeTerminal, isDeleting ? 50 : Math.random() * 100 + 50);
}

// Matrix Background Effect
function createMatrix() {
    const matrix = document.getElementById('matrix');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = matrix.clientWidth;
    canvas.height = matrix.clientHeight;
    matrix.appendChild(canvas);
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    const alphabet = katakana + latin + nums + symbols;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];
    
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    const draw = () => {
        ctx.fillStyle = 'rgba(15, 22, 32, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#4fc3f7';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    
    setInterval(draw, 30);
}

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const submitText = submitBtn.querySelector('span');
    const loadingDots = submitBtn.querySelector('.loading-dots');
    
    submitText.style.display = 'none';
    loadingDots.style.display = 'flex';
    
    // Simulate form submission
    setTimeout(() => {
        submitText.style.display = 'inline';
        loadingDots.style.display = 'none';
        
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Message sent successfully!';
        successMsg.style.color = '#69f0ae';
        successMsg.style.marginTop = '20px';
        successMsg.style.fontFamily = '"Share Tech Mono", monospace';
        
        this.appendChild(successMsg);
        
        // Reset form
        setTimeout(() => {
            this.reset();
            this.removeChild(successMsg);
        }, 3000);
    }, 2000);
});

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeTerminal();
    createMatrix();
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const techTags = card.querySelector('.project-tech');
            techTags.style.color = '#4fc3f7';
            techTags.style.borderTopColor = 'rgba(79, 195, 247, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            const techTags = card.querySelector('.project-tech');
            techTags.style.color = '#a0a0a0';
            techTags.style.borderTopColor = 'rgba(79, 195, 247, 0.1)';
        });
    });
    
    // Add animation to tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in');
    });
});
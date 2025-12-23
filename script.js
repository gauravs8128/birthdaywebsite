// When page loads
// Force Home page on load
window.onload = function() {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show only Home page
    document.getElementById('home').classList.add('active');
    
    // Remove active from any other page
    document.getElementById('letter').classList.remove('active');
    document.getElementById('music').classList.remove('active');
    document.getElementById('photos').classList.remove('active');
};
// Create background particles animation
function createParticles() {
    let particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
    } else {
        // Clear existing particles if re-running
        particlesContainer.innerHTML = '';
    }
    
    // Create 50 particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 30 + 10;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        particlesContainer.appendChild(particle);
    }
} 

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("Birthday website loaded for Abhilasha!");
    
    // Create background animations
    createParticles();
    createFloatingHearts();
    
    // Initialize other features
    initPhotoCarousel();
    initMusicPlayer();
    checkBirthday();
    
    // Make sure Home page is active
    setTimeout(() => {
        showPage('home');
    }, 100);
});

// Create floating hearts in background
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    // Clear existing hearts
    heartsContainer.innerHTML = '';
    
    // Create 25 floating hearts
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        
        // Random size
        const size = Math.random() * 15 + 10;
        heart.style.fontSize = size + 'px';
        
        // Random starting position
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        heart.style.animationDelay = Math.random() * 20 + 's';
        
        heartsContainer.appendChild(heart);
    }
}

// Show different pages - FIXED to ensure Home opens first
function showPage(pageId) {
    console.log("Showing page:", pageId);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        
        // Special actions for pages
        if (pageId === 'letter') {
            resetLetter();
        } else if (pageId === 'music') {
            // Auto-play music when visiting music page (only if player is ready)
            setTimeout(() => {
                const playBtn = document.getElementById('playBtn');
                if (playBtn && !playBtn.disabled) {
                    playBtn.click();
                }
            }, 500);
        }
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open the letter
function openLetter() {
    const envelope = document.querySelector('.envelope');
    const letterContent = document.getElementById('letterContent');
    
    if (!letterContent.style.display || letterContent.style.display === 'none') {
        // Open envelope animation
        envelope.style.transform = 'translateY(-20px) scale(0.9)';
        envelope.style.opacity = '0.5';
        envelope.style.pointerEvents = 'none';
        
        // Open flap
        const flap = document.querySelector('.envelope-flap');
        if (flap) {
            flap.style.borderTop = '0px solid #ff8fa3';
        }
        
        // Show letter after delay
        setTimeout(() => {
            if (letterContent) {
                letterContent.style.display = 'block';
            }
            if (envelope) {
                envelope.style.display = 'none';
            }
        }, 800);
    }
}

// Reset letter to closed state
function resetLetter() {
    const envelope = document.querySelector('.envelope');
    const letterContent = document.getElementById('letterContent');
    const envelopeFlap = document.querySelector('.envelope-flap');
    
    if (envelope) {
        envelope.style.display = 'block';
        envelope.style.transform = 'none';
        envelope.style.opacity = '1';
        envelope.style.pointerEvents = 'auto';
    }
    
    if (envelopeFlap) {
        envelopeFlap.style.borderTop = '90px solid #ff8fa3';
    }
    
    if (letterContent) {
        letterContent.style.display = 'none';
    }
}

// ========== PHOTO CAROUSEL ==========
let currentPhotoIndex = 0;
const photos = [
    "https://i.ibb.co/WWYGG98H/IMG-6740.jpg",
    "https://i.ibb.co/Nn22wxB2/IMG-6741.jpg",
    "https://i.ibb.co/5Whd46wp/IMG-6736.jpg",
    "https://i.ibb.co/ZpSmPSvv/IMG-6739.jpg",
    "https://i.ibb.co/jNj4fZ3/7-DD0-DC51-0-AA2-41-CB-879-B-32-DB391-DD3-BD.jpg",
    "https://i.ibb.co/GQfjbCPy/IMG-6737.jpg"
];

function initPhotoCarousel() {
    const container = document.querySelector('.carousel-container');
    if (!container) return;
    
    // prevent double-init
    if (container.dataset.initialized === 'true') return;
    container.dataset.initialized = 'true';
    
    // Clear container first
    container.innerHTML = '';
    
    // Create image elements
    photos.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Memory ${index + 1}`;
        img.loading = 'lazy';
        img.style.opacity = index === 0 ? '1' : '0';
        img.style.transform = index === 0 ? 'scale(1)' : 'scale(0.9)';
        img.style.zIndex = index === 0 ? '2' : '1';
        img.style.transition = 'all 0.8s ease';
        
        // Error handling
        img.onerror = function() {
            console.log(`Photo ${index + 1} failed to load`);
            this.src = 'https://via.placeholder.com/600x400/ffb6c1/ffffff?text=Beautiful+Memory';
        };
        
        container.appendChild(img);
    });
    
    // Update counters
    const totalElement = document.getElementById('totalPhotos');
    if (totalElement) {
        totalElement.textContent = photos.length;
    }
    updatePhotoCounter();
    
    // Auto rotate (only once)
    if (!window._photoInterval) {
        window._photoInterval = setInterval(nextPhoto, 2500);
    }
} 

function showPhoto(index) {
    const images = document.querySelectorAll('.carousel-container img');
    if (images.length === 0) return;
    
    // Hide current
    images[currentPhotoIndex].style.opacity = '0';
    images[currentPhotoIndex].style.transform = 'scale(0.9)';
    images[currentPhotoIndex].style.zIndex = '1';
    
    // Show new
    images[index].style.opacity = '1';
    images[index].style.transform = 'scale(1)';
    images[index].style.zIndex = '2';
    
    currentPhotoIndex = index;
    updatePhotoCounter();
}

function nextPhoto() {
    let nextIndex = currentPhotoIndex + 1;
    if (nextIndex >= photos.length) nextIndex = 0;
    showPhoto(nextIndex);
}

function prevPhoto() {
    let prevIndex = currentPhotoIndex - 1;
    if (prevIndex < 0) prevIndex = photos.length - 1;
    showPhoto(prevIndex);
}

function updatePhotoCounter() {
    const currentElement = document.getElementById('currentPhoto');
    if (currentElement) {
        currentElement.textContent = currentPhotoIndex + 1;
    }
}

// ========== MUSIC PLAYER - LOCAL AUDIO FILE ==========
let isPlaying = false;
let musicAudio = null;

function initMusicPlayer() {
    if (window._musicInitDone) return;
    window._musicInitDone = true;

    console.log("[MUSIC] initMusicPlayer called");

    // Get the audio element
    musicAudio = document.getElementById('musicAudio');
    if (!musicAudio) {
        console.error("[MUSIC] Audio element not found!");
        return;
    }

    // Set default volume
    musicAudio.volume = 0.7;
    console.log("[MUSIC] Audio element initialized, volume set to 0.7");

    // Listen for audio events
    musicAudio.addEventListener('canplay', () => {
        console.log("[MUSIC] Audio is ready to play");
        showMusicMessage("🎵 Ready to play music");
    });

    musicAudio.addEventListener('play', () => {
        console.log("[MUSIC] Audio started playing");
        updateUIPlaying();
    });

    musicAudio.addEventListener('pause', () => {
        console.log("[MUSIC] Audio paused");
        updateUIPaused();
    });

    musicAudio.addEventListener('ended', () => {
        console.log("[MUSIC] Audio finished");
        updateUIPaused();
    });

    musicAudio.addEventListener('error', (e) => {
        console.error("[MUSIC] Audio error:", e);
        showMusicMessage("❌ Error loading audio");
    });

    // Setup control buttons
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    if (playBtn) {
        playBtn.disabled = false;
        playBtn.addEventListener('click', playMusic);
        console.log("[MUSIC] Play button ready");
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', pauseMusic);
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            setMusicVolume(parseInt(this.value, 10));
        });
    }

    // Show ready message
    setTimeout(() => {
        showMusicMessage("🎵 Ready to play music");
    }, 500);
}

function updateUIPlaying() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const vinyl = document.querySelector('.vinyl-record');
    
    if (playBtn && pauseBtn) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }
    
    if (vinyl) {
        vinyl.style.animationPlayState = 'running';
    }
    
    isPlaying = true;
    showMusicMessage("🎵 Now playing: Tum Se Hi");
}

function updateUIPaused() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const vinyl = document.querySelector('.vinyl-record');
    
    if (playBtn && pauseBtn) {
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
    }
    
    if (vinyl) {
        vinyl.style.animationPlayState = 'paused';
    }
    
    isPlaying = false;
    showMusicMessage("⏸️ Paused");
}

// Control volume
function setMusicVolume(volume) {
    if (musicAudio) {
        musicAudio.volume = volume / 100;
        console.log(`[MUSIC] Volume set to ${musicAudio.volume.toFixed(2)}`);
    }
}

function playMusic() {
    console.log("[MUSIC] playMusic() called");
    
    if (!musicAudio) {
        showMusicMessage("⚠️ Audio element not found");
        return;
    }

    showMusicMessage("▶️ Playing...");
    
    musicAudio.play()
        .then(() => {
            console.log("[MUSIC] Audio playing successfully");
        })
        .catch(err => {
            console.error('[MUSIC] Failed to play:', err);
            showMusicMessage("⚠️ Cannot play - check permissions");
        });
}

function pauseMusic() {
    console.log("[MUSIC] pauseMusic() called");
    
    if (musicAudio) {
        musicAudio.pause();
    }
}

function showMusicMessage(text) {
    // Remove existing messages
    const existing = document.querySelectorAll('.music-message');
    existing.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = 'music-message';
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 139, 0.95);
        color: white;
        padding: 12px 25px;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255,255,255,0.3);
    `;
    
    document.body.appendChild(message);
    
    // Remove after 3 seconds
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Check if today is birthday
function checkBirthday() {
    const today = new Date();
    if (today.getMonth() === 11 && today.getDate() === 23) {
        console.log("🎂 Happy Birthday Abhilasha!");
        showMusicMessage("🎉 Happy Birthday Abhilasha!");
        
        // Add extra hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(createFloatingHearts, i * 100);
        }
        
        // Auto-play music on birthday
        setTimeout(() => {
            if (youtubePlayer) {
                youtubePlayer.playVideo();
            }
        }, 3000);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize floating hearts
window.addEventListener('load', function() {
    createFloatingHearts();
    setInterval(createFloatingHearts, 30000);
});
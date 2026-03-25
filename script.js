document.addEventListener("DOMContentLoaded", () => {
    const btnOpen = document.getElementById("btn-open");
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const btnAudio = document.getElementById("btn-audio");
    const audioIcon = btnAudio.querySelector("i");
    
    let isPlaying = false;

    // Open Invitation
    btnOpen.addEventListener("click", () => {
        splashScreen.classList.add("fade-out");
        setTimeout(() => {
            splashScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
            document.body.style.overflow = "auto";
            
            // Play music
            bgMusic.play().then(() => {
                isPlaying = true;
                btnAudio.classList.remove("hidden");
                btnAudio.classList.add("playing");
            }).catch(e => {
                console.log("Audio play blocked by browser", e);
                // Still show the button to allow manual play
                btnAudio.classList.remove("hidden");
                audioIcon.classList.replace("ph-speaker-high", "ph-speaker-slash");
                isPlaying = false;
            });
        }, 1000);
    });

    // Audio Toggle
    btnAudio.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            audioIcon.classList.replace("ph-speaker-high", "ph-speaker-slash");
            btnAudio.classList.remove("playing");
        } else {
            bgMusic.play();
            audioIcon.classList.replace("ph-speaker-slash", "ph-speaker-high");
            btnAudio.classList.add("playing");
        }
        isPlaying = !isPlaying;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize observer for fade-up elements
    document.querySelectorAll('.fade-up, .zoom-in, .reveal-text, .misty-reveal').forEach(el => {
        observer.observe(el);
    });

    // --- HIGH-PERFORMANCE PARALLAX SCROLLING ENGINE ---
    // Replicates the precise 3D depth scrolling of premium templates
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    // Use requestAnimationFrame for buttery smooth 60fps scrolling
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                parallaxLayers.forEach(layer => {
                    const speed = layer.getAttribute('data-speed') || 0.5;
                    // Move layer vertically based on scroll and its specific speed
                    const yPos = -(scrolled * speed);
                    layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Countdown Timer logic
    const targetDate = new Date("May 16, 2026 10:00:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }, 1000);

    // Copy to Clipboard
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-target');
            const element = document.getElementById(targetId);
            const textToCopy = element.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="ph ph-check"></i> Tersalin!';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 2000);
            });
        });
    });

    // Handle RSVP Form
    const rsvpForm = document.getElementById('rsvp-form');
    const wishesList = document.getElementById('wishes-list');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value;

        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.innerHTML = `
            <h5>${name}</h5>
            <p class="wish-status"><i class="ph ${attendance === 'Hadir' ? 'ph-check-circle' : 'ph-x-circle'}"></i> ${attendance}</p>
            <p>${message}</p>
        `;

        wishesList.insertBefore(wishCard, wishesList.firstChild);
        
        rsvpForm.reset();
        
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Terima Kasih!';
        submitBtn.style.backgroundColor = '#4caf50';
        submitBtn.style.color = '#fff';
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Kirim Konfirmasi';
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
        }, 3000);
    });
});

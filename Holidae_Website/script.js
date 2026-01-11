/* --- 1. SCROLL REVEAL ANIMATION (IntersectionObserver) --- */

document.addEventListener("DOMContentLoaded", function() {
    
    const observerOptions = {
        threshold: 0.1 /* Trigger when 10% of element is visible */
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements with the class 'reveal-on-scroll'
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
});


/* --- 2. INTERACTIVITY: LIKE & SHARE TOASTS --- */

function showToast(message) {
    const container = document.getElementById('toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add to screen
    container.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300); // Wait for fade out
    }, 3000);
}

function handleLike(btn) {
    // Toggle 'liked' class for visual state
    btn.classList.toggle('liked');
    
    if (btn.classList.contains('liked')) {
        showToast("❤️ Saved to your favourites!");
    } else {
        showToast("💔 Removed from favourites.");
    }
}

function handleShare(packageName) {
    // Mimic copying to clipboard
    navigator.clipboard.writeText(`Check out ${packageName} on Holidae!`);
    showToast(`🔗 Link for ${packageName} copied to clipboard!`);
}


/* --- 3. ACCESSIBILITY: ANIMATION TOGGLE --- */

let areAnimationsPaused = false;

function toggleAnimations() {
    const body = document.body;
    const btn = document.getElementById('anim-toggle');
    
    areAnimationsPaused = !areAnimationsPaused;

    if (areAnimationsPaused) {
        // Add a class that forces all transitions to 0s via CSS
        body.classList.add('reduce-motion');
        btn.innerHTML = "▶ Play Motion";
        btn.setAttribute('aria-pressed', 'true');
        
        // Inject style to kill animations
        document.documentElement.style.setProperty('--transition-speed', '0s');
    } else {
        body.classList.remove('reduce-motion');
        btn.innerHTML = "⏸ Pause Motion";
        btn.setAttribute('aria-pressed', 'false');
    }
}


/* --- 4. MOBILE MENU (Existing Logic) --- */
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    
    nav.classList.toggle('active');
    
    // Accessibility: Update ARIA attributes
    const expanded = nav.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
}
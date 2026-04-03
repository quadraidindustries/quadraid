document.addEventListener('DOMContentLoaded', () => {

    // ── Set Copyright Year ──
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    const contactYearEl = document.getElementById('contact-year');
    if (contactYearEl) {
        contactYearEl.textContent = new Date().getFullYear();
    }

    // ── Scroll-aware header ──
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ── Background slideshow (Index) ──
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        const bgImages = ['assets/product_1.png', 'assets/product_2.png'];
        let bgIndex = 0;
        bgImages.forEach(src => { 
            const img = new Image(); 
            img.src = src; 
        });
        heroBg.style.backgroundImage = `url('${bgImages[0]}')`;
        heroBg.style.opacity = '1';
        setInterval(() => {
            heroBg.style.opacity = '0';
            setTimeout(() => {
                bgIndex = (bgIndex + 1) % bgImages.length;
                heroBg.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
                heroBg.style.opacity = '1';
            }, 1200);
        }, 6000);
    }

    // ── Scroll-reveal observer ──
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    const line = entry.target.nextElementSibling;
                    if (line && line.classList.contains('animated-line')) {
                        line.style.width = '60px';
                    }
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => revealObs.observe(el));
    }

    // ── Smooth scroll for anchor links (Index) ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const targetId = a.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) { 
                    e.preventDefault(); 
                    target.scrollIntoView({ behavior: 'smooth' }); 
                }
            }
        });
    });

    // ── Input focus/blur effects (Contact) ──
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    if (formInputs.length > 0) {
        formInputs.forEach(el => {
            el.addEventListener('focus', () => { el.style.borderColor = '#C0A062'; });
            el.addEventListener('blur', () => { el.style.borderColor = 'rgba(255, 255, 255, 0.1)'; });
        });
    }

    // ── Form submission (Contact Automation) ──
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-msg');
    const submitBtn = document.getElementById('submit-btn');
    const btnLoader = document.getElementById('btn-loader');
    
    if (form && successMsg) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Basic validation
            const nameEl = document.getElementById('name');
            const name = nameEl ? nameEl.value.trim() : '';
            
            if (!name) {
                alert('Please enter your full name.');
                return;
            }

            // 2. UI Loading State
            submitBtn.disabled = true;
            if (btnLoader) btnLoader.style.display = 'inline-block';
            submitBtn.querySelector('span').textContent = 'Sending...';

            // 3. Prepare data
            const formData = new FormData(form);
            const scriptURL = 'https://script.google.com/macros/s/AKfycbzCOlo59YXT4tb7487oLJNk0NVdovUrTNLA7dp1HtsdIpm195jjwTDAIyDVkwnJJ4HSqw/exec';

            // 4. Send to Google Apps Script
            fetch(scriptURL, { 
                method: 'POST', 
                body: formData 
            })
            .then(response => {
                console.log('Success!', response);
                // Switch UI to success state
                form.style.display = 'none';
                successMsg.style.display = 'block';
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('There was an error sending your message. Please try again or email us directly at contact@quadraid.com');
                
                // Re-enable button on error
                submitBtn.disabled = false;
                if (btnLoader) btnLoader.style.display = 'none';
                submitBtn.querySelector('span').textContent = 'Submit Request';
            });
        });
    }

});

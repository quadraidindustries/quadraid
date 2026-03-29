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

    // ── Form submission (Contact) ──
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-msg');
    
    if (form && successMsg) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameEl = document.getElementById('name');
            const orgEl = document.getElementById('organization');
            const typeEl = document.getElementById('project-type');
            const msgEl = document.getElementById('message');

            const name = nameEl ? nameEl.value.trim() : '';
            const org = orgEl ? orgEl.value.trim() : '';
            
            if (!name) {
                alert('Please enter your full name.');
                return;
            }

            // Show the popup requested by the client
            alert("Please mail your details to contact@quadraid.com");

            // Prepare an automatic email draft to make it easy for them
            const subject = encodeURIComponent("Project Inquiry");
            const body = encodeURIComponent(`Name: ${name}\nOrganization: ${org}\nProject Type: ${typeEl ? typeEl.value : ''}\n\nMessage:\n${msgEl ? msgEl.value : ''}`);
            window.location.href = `mailto:contact@quadraid.com?subject=${subject}&body=${body}`;

            form.style.display = 'none';
            successMsg.style.display = 'block';
        });
    }

});

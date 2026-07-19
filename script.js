/* =========================================
   EK DOORDARSHI — SCRIPT.JS
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // Year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Progress Bar
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrollTop / docHeight * 100) + '%';
    });
    
    // Category Filter
    const catBtns = document.querySelectorAll('.categories button');
    const cards = document.querySelectorAll('.card');
    
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.textContent;
            cards.forEach(card => {
                const tag = card.querySelector('.tag').textContent;
                if (category === 'All' || tag === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? '' : 'none';
        });
    });
    
    // Copy UPI
    window.copyUPI = function() {
        const upiId = document.getElementById('upiId').textContent;
        const icon = document.getElementById('copyIcon');
        const toast = document.getElementById('toast');
        
        navigator.clipboard.writeText(upiId).then(() => {
            icon.className = 'fa-solid fa-check';
            toast.classList.add('show');
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
                toast.classList.remove('show');
            }, 2000);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = upiId;
            ta.style.cssText = 'position:fixed;opacity:0;';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        });
    };
    
    console.log('✨ Ek Doordarshi loaded');
});
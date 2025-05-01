// Smooth scroll için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form gönderimi için
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Burada form verilerini işleyebilir veya bir API'ye gönderebilirsiniz
        console.log('Form verileri:', formObject);
        
        // Başarılı gönderim mesajı
        alert('Mesajınız başarıyla gönderildi!');
        this.reset();
    });
}

// Scroll olayında header'ı şeffaf yapma
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = '#fff';
    }
});

// Sayfa yüklendiğinde animasyonlar
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Hizmet kartları için detay gösterme işlemleri
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const details = this.querySelector('.service-details');
            if (details) {
                // Diğer tüm detayları kapat
                serviceCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        const otherDetails = otherCard.querySelector('.service-details');
                        if (otherDetails) {
                            otherDetails.style.display = 'none';
                            otherCard.style.height = 'auto';
                        }
                    }
                });
                
                // Tıklanan kartın detaylarını aç/kapat
                if (details.style.display === 'block') {
                    details.style.display = 'none';
                    this.style.height = 'auto';
                } else {
                    details.style.display = 'block';
                    this.style.height = 'auto';
                }
            }
        });
    });

    // Sayfa dışına tıklandığında tüm detayları kapat
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-card')) {
            serviceCards.forEach(card => {
                const details = card.querySelector('.service-details');
                if (details) {
                    details.style.display = 'none';
                    card.style.height = 'auto';
                }
            });
        }
    });

    // Proje kartları için detay gösterme işlemleri
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const btn = card.querySelector('.project-detail-btn');
        const details = card.querySelector('.project-details');
        if (btn && details) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Diğer tüm detayları kapat
                projectCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherDetails = otherCard.querySelector('.project-details');
                        if (otherDetails) {
                            otherDetails.style.display = 'none';
                        }
                    }
                });
                // Tıklanan kartın detayını aç/kapat
                if (details.style.display === 'block') {
                    details.style.display = 'none';
                } else {
                    details.style.display = 'block';
                }
            });
        }
    });

    // Sayfa dışına tıklanınca proje detaylarını kapat
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.project-card')) {
            projectCards.forEach(card => {
                const details = card.querySelector('.project-details');
                if (details) {
                    details.style.display = 'none';
                }
            });
        }
    });

    // Slider işlemleri
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    // İlk slide'ı göster
    updateSlider();

    // Otomatik geçiş
    setInterval(nextSlide, 5000);

    // Dot'lara tıklama
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
});

// Mobil menü fonksiyonları
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuLinks = document.querySelectorAll('.nav-links a');

// Menü açma/kapama fonksiyonu
function toggleMenu() {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuBtn.innerHTML = isOpen 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Menü açıkken scroll'u engelle
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Menü butonuna tıklama olayı
mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Menü linklerine tıklama olayı
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Sayfa dışına tıklama olayı
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        toggleMenu();
    }
});

// Sayfa yeniden boyutlandırıldığında menüyü kapat
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Menü açma/kapama fonksiyonu
function toggleMenu() {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuBtn.innerHTML = isOpen 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Menü açıkken scroll'u engelle
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Menü butonunun ilk görünümünü hamburger olarak ayarla
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'; 
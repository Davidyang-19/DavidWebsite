document.addEventListener('DOMContentLoaded', () => {
    // 滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // 观察所有时间轴项目
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // 返回顶部按钮
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 图片轮播
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        const items = gallery.querySelectorAll('.gallery-item');
        const itemsContainer = gallery.querySelector('.gallery-items');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        let currentIndex = 0;

        function showSlide(index) {
            // 处理循环
            if (index >= items.length) {
                currentIndex = 0;
                index = 0;
            } else if (index < 0) {
                currentIndex = items.length - 1;
                index = items.length - 1;
            }

            const offset = -index * (items[0].offsetWidth + 32); // 32px is the gap
            itemsContainer.style.transform = `translateX(${offset}px)`;
            currentIndex = index;
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }

        // 自动播放
        setInterval(nextSlide, 5000);

        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;

        itemsContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        itemsContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX) {
                nextSlide();
            } else if (touchEndX > touchStartX) {
                prevSlide();
            }
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 
// 导航栏交互
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // 汉堡菜单点击事件
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

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

    // 页面切换动画
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 页面淡入动画
    document.body.classList.add('fade-in');

    // 联系卡片点击展开/收起动画
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // 如果当前已激活，再次点击则收起
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                return;
            }
            // 先移除所有active
            contactItems.forEach(i => i.classList.remove('active'));
            // 激活当前
            item.classList.add('active');
            // 阻止事件冒泡，避免body点击立即收起
            e.stopPropagation();
        });
    });
    // 点击空白处收起所有卡片
    document.body.addEventListener('click', function (e) {
        contactItems.forEach(i => i.classList.remove('active'));
    });

    // 页面跳转时淡出
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        // 仅处理站内链接
        if (link.hostname === window.location.hostname && !link.hasAttribute('target')) {
            link.addEventListener('click', function (e) {
                // 允许右键/新标签等
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                // 锚点跳转不处理
                if (link.getAttribute('href').startsWith('#')) return;
                e.preventDefault();
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location = link.href;
                }, 500);
            });
        }
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // 向下滚动
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // 向上滚动
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// 图片查看功能
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('modal-close')[0];
    
    // 为所有图片添加点击事件
    const galleryImages = document.querySelectorAll('.gallery-main img, .gallery-thumbnails img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});

// 点赞功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化点赞数据
    const likesData = JSON.parse(localStorage.getItem('postLikes')) || {};
    
    // 为所有点赞按钮添加事件监听
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        const postId = button.closest('.feed-item').dataset.postId;
        const likeCount = button.querySelector('.like-count');
        
        // 设置初始状态
        if (likesData[postId]) {
            button.classList.add('liked');
            likeCount.textContent = likesData[postId].count;
        }
        
        button.addEventListener('click', function() {
            const postId = this.closest('.feed-item').dataset.postId;
            const likeCount = this.querySelector('.like-count');
            
            // 切换点赞状态
            if (!likesData[postId]) {
                likesData[postId] = { count: 1, liked: true };
                this.classList.add('liked');
                likeCount.textContent = '1';
            } else {
                if (likesData[postId].liked) {
                    likesData[postId].count--;
                    likesData[postId].liked = false;
                    this.classList.remove('liked');
                } else {
                    likesData[postId].count++;
                    likesData[postId].liked = true;
                    this.classList.add('liked');
                }
                likeCount.textContent = likesData[postId].count;
            }
            
            // 添加动画效果
            likeCount.classList.add('increased');
            setTimeout(() => {
                likeCount.classList.remove('increased');
            }, 500);
            
            // 保存到本地存储
            localStorage.setItem('postLikes', JSON.stringify(likesData));
        });
    });
}); 
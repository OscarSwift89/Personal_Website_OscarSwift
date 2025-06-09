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

// 视频播放功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化视频播放器
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // 当开始播放一个视频时，暂停其他视频
        video.addEventListener('play', function() {
            videos.forEach(otherVideo => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });
        });
    });

    // 点赞按钮功能
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const text = this.querySelector('span');
            
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                text.textContent = 'Like';
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                text.textContent = 'Liked';
            }
        });
    });

    // 分享按钮功能
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 检查是否支持 Web Share API
            if (navigator.share) {
                navigator.share({
                    title: 'Check out this amazing performance!',
                    text: 'Watch this incredible singing performance shared by Oscar Swift',
                    url: window.location.href
                })
                .catch(error => console.log('Error sharing:', error));
            } else {
                // 不支持 Web Share API 时的后备方案
                const tempInput = document.createElement('input');
                tempInput.value = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // 显示反馈
                const originalText = this.querySelector('span').textContent;
                this.querySelector('span').textContent = '已复制链接！';
                setTimeout(() => {
                    this.querySelector('span').textContent = originalText;
                }, 2000);
            }
        });
    });
});

// Contact Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const copyBtn = document.getElementById('copyBtn');
    const closeBtn = document.querySelector('.close-modal');
    const contactItems = document.querySelectorAll('.contact-item');

    // 打开弹窗
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            const value = item.getAttribute('data-value');
            
            modalTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            modalContent.textContent = value;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭弹窗
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 点击弹窗外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 复制功能
    copyBtn.addEventListener('click', async () => {
        const textToCopy = modalContent.textContent;
        try {
            await navigator.clipboard.writeText(textToCopy);
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            copyBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        }
    });
}); 
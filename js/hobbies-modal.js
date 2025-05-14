// hobbies-modal.js
// 点击兴趣卡片弹出图片库弹窗，支持动画

document.addEventListener('DOMContentLoaded', function () {
    // 1. 获取所有兴趣卡片
    const hobbyCards = document.querySelectorAll('.hobby-card');
    // 2. 弹窗和关闭按钮
    const modal = document.getElementById('hobby-modal');
    const modalImgBox = document.getElementById('hobby-modal-imgs');
    const modalTitle = document.getElementById('hobby-modal-title');
    const modalClose = document.getElementById('hobby-modal-close');

    // 3. 每个兴趣卡片绑定点击事件
    hobbyCards.forEach((card, idx) => {
        card.addEventListener('click', function () {
            // 取卡片标题作为图片库key
            const hobby = card.querySelector('h3').innerText.trim();
            showModalForHobby(hobby);
        });
    });

    // 4. 关闭按钮和遮罩
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    function showModalForHobby(hobby) {
        // 自动拼接本地图片路径，假设每个hobby文件夹下有1.jpg~16.jpg
        const folder = hobby;
        const imgCount = 16; // 每个兴趣最多16张图
        modalTitle.innerText = hobby;
        modalImgBox.innerHTML = '';
        for (let i = 1; i <= imgCount; i++) {
            const url = `images/hobbies/${folder}/${i}.jpg`;
            const img = document.createElement('img');
            img.src = url;
            img.alt = hobby + ' image';
            img.className = 'hobby-modal-img';
            // 若图片不存在则隐藏
            img.onerror = function() { this.style.display = 'none'; };
            // 增加点击放大功能
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleZoomOnImg(this);
            });
            // 增加滚轮缩放功能
            img.addEventListener('wheel', function(e) {
                e.preventDefault();
                handleWheelZoom(this, e);
            }, { passive: false });
            modalImgBox.appendChild(img);
        }
        modal.classList.add('show');
        setTimeout(() => modal.classList.add('show-anim'), 10);
    }

    // 放大/还原图片，放大倍数更大
    function toggleZoomOnImg(img) {
        if (img.classList.contains('zoomed')) {
            img.classList.remove('zoomed');
            img.style.transform = '';
            img.style.zIndex = '';
        } else {
            // 放大到2.2倍，并置于最上层
            img.classList.add('zoomed');
            img.style.transform = 'scale(2.2)';
            img.style.zIndex = '10';
        }
    }

    // 滚轮缩放图片
    function handleWheelZoom(img, event) {
        let scale = parseFloat(img.getAttribute('data-scale')) || 1;
        const delta = event.deltaY || event.detail || event.wheelDelta;
        if (delta < 0) {
            scale *= 1.12;
        } else {
            scale /= 1.12;
        }
        // 限制缩放范围
        scale = Math.min(Math.max(scale, 0.3), 6);
        img.style.transform = `scale(${scale})`;
        img.setAttribute('data-scale', scale);
        img.classList.add('zoomed');
        img.style.zIndex = '10';
    }
    function closeModal() {
        modal.classList.remove('show-anim');
        setTimeout(() => {
            modal.classList.remove('show');
            modalImgBox.innerHTML = '';
        }, 350);
    }
});

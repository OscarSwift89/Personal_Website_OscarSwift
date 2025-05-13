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
        // 你可以在这里自定义每个兴趣的图片集
        const hobbyImages = {
            'Reading': [
                'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600',
                'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600'
            ],
            'Music': [
                'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600'
            ],
            'Photography': [
                'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600',
                'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600'
            ],
            'Hiking': [
                'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600',
                'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=600'
            ],
            'Origami': [
                'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600',
                'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600'
            ],
            'Gaming': [
                'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600',
                'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600'
            ],
            'Cooking': [
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
                'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600'
            ],
            'Bakery': [
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
                'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600'
            ],
        };
        modalTitle.innerText = hobby;
        modalImgBox.innerHTML = '';
        (hobbyImages[hobby] || []).forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = hobby + ' image';
            img.className = 'hobby-modal-img';
            modalImgBox.appendChild(img);
        });
        modal.classList.add('show');
        setTimeout(() => modal.classList.add('show-anim'), 10);
    }
    function closeModal() {
        modal.classList.remove('show-anim');
        setTimeout(() => {
            modal.classList.remove('show');
            modalImgBox.innerHTML = '';
        }, 350);
    }
});

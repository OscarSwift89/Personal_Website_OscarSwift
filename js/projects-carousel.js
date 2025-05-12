// 横向coverflow堆叠轮播动画，带滚动惯性

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.projects-carousel .project-card');
  const prevBtn = document.querySelector('.projects-carousel-btn.prev');
  const nextBtn = document.querySelector('.projects-carousel-btn.next');
  let current = 0;
  let inertia = 0; // 惯性速度
  let animating = false;

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.classList.remove('active', 'next', 'prev', 'far-next', 'far-prev');
      if (i === current) {
        card.classList.add('active');
      } else if (i === current + 1) {
        card.classList.add('next');
      } else if (i === current - 1) {
        card.classList.add('prev');
      } else if (i === current + 2) {
        card.classList.add('far-next');
      } else if (i === current - 2) {
        card.classList.add('far-prev');
      }
    });
  }

  function goto(index, withInertia = false) {
    if (animating) return;
    // 无限循环
    if (index < 0) index = cards.length - 1;
    if (index > cards.length - 1) index = 0;
    if (index === current) return;
    animating = true;
    current = index;
    updateCarousel();
    setTimeout(() => { animating = false; }, withInertia ? 400 : 250);
  }

  function gotoPrev() { goto(current - 1); }
  function gotoNext() { goto(current + 1); }

  prevBtn.addEventListener('click', gotoPrev);
  nextBtn.addEventListener('click', gotoNext);

  // 支持左右方向键
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') gotoPrev();
    if (e.key === 'ArrowRight') gotoNext();
  });

  // 鼠标拖动/触摸滑动
  let startX = 0, lastX = 0, dragging = false, velocity = 0, frame;
  const container = document.querySelector('.projects-carousel');

  function onDragStart(e) {
    dragging = true;
    startX = lastX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    velocity = 0;
    cancelAnimationFrame(frame);
  }
  function onDragMove(e) {
    if (!dragging) return;
    const x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    velocity = x - lastX;
    if (Math.abs(x - startX) > 40) {
      if (x < lastX) gotoNext();
      else gotoPrev();
      dragging = false;
    }
    lastX = x;
  }
  function onDragEnd() {
    dragging = false;
    // 惯性滚动
    if (Math.abs(velocity) > 10) {
      let steps = Math.round(velocity / 30);
      if (steps !== 0) {
        goto(current + steps, true);
      }
    }
    velocity = 0;
  }
  container.addEventListener('mousedown', onDragStart);
  container.addEventListener('mousemove', onDragMove);
  container.addEventListener('mouseup', onDragEnd);
  container.addEventListener('mouseleave', onDragEnd);
  container.addEventListener('touchstart', onDragStart, {passive:true});
  container.addEventListener('touchmove', onDragMove, {passive:true});
  container.addEventListener('touchend', onDragEnd);

  // 初始化
  updateCarousel();
});

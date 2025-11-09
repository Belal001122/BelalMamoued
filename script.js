document.addEventListener('DOMContentLoaded', () => {

    const links = document.querySelectorAll('.magnetic-link');

    // قوة الجذب (كل ما الرقم قل، القوة زادت)
    const attractionForce = 0.3; 
    // المسافة اللي بيبدأ عندها التأثير
    const proximityThreshold = 120; 

    links.forEach(link => {
        const text = link.querySelector('span');

        link.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = link.getBoundingClientRect();
            
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            // حساب المسافة
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // لو الماوس قريب
            if (distance < proximityThreshold) {
                // حرك النص ناحية الماوس
                const moveX = deltaX * attractionForce;
                const moveY = deltaY * attractionForce;
                text.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                // لو الماوس بعيد، رجع النص مكانه
                text.style.transform = 'translate(0, 0)';
            }
        });

        // رجع النص مكانه لما الماوس يبعد خالص
        link.addEventListener('mouseleave', () => {
            text.style.transform = 'translate(0, 0)';
        });
    });
});
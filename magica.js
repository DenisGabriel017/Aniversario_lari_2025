document.addEventListener('DOMContentLoaded', () => {

    const releaseDate = new Date('2025-10-01T00:00:00');
    const currentDate = new Date();

    const lockScreen = document.getElementById('lock-screen');
    const startScreen = document.getElementById('start-screen');
    const mainContainer = document.getElementById('main-container');


    if (currentDate < releaseDate) {
    
        function updateCountdown() {
            const now = new Date();
            const diff = releaseDate - now;

            if (diff <= 0) {
                location.reload();
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();

    } else {
    
        lockScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        startScreen.addEventListener('click', startSurprise, { once: true });
    }


    function startSurprise() {
        startScreen.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        setTimeout(() => mainContainer.classList.add('visible'), 50);

        const memories = [
            { 
                photo: 'imagens/foto1.jpg', 
                title: 'Nosso primeiro congresso', 
                subtitle: 'O começo de tudo, onde nossos caminhos se cruzaram.',
                position: 'center top'
            },
            { 
                photo: 'imagens/foto2.jpg', 
                title: 'Nossa primeira confra', 
                subtitle: 'Celebrando juntos e criando nossas primeiras memórias.',
                position: 'center top'
            },
            { 
                photo: 'imagens/foto3.jpg', 
                title: 'Nossa primeira virada', 
                subtitle: 'Entrando em um novo ano com a melhor companhia do mundo.',
                position: 'center 30%'
            },
            { 
                photo: 'imagens/foto4.jpg', 
                title: 'Sempre Juntos', 
                subtitle: 'Na cumplicidade de cada olhar e em todos os nossos rolês.',
                position: 'center top'
            },
            { 
                photo: 'imagens/foto5.jpg', 
                title: 'Dia Especial', 
                subtitle: 'Cada jantar com você se torna uma celebração do nosso amor.',
                position: 'center top'
            },
            { 
                photo: 'imagens/foto6.jpg', 
                title: 'Nosso Futuro!', 
                subtitle: 'Que seja sempre assim: leve, ensolarado e com você.',
                position: 'center 25%'
            },
        ];

        const slots = document.querySelectorAll('.memory-slot');
        const finalTitle = document.getElementById('final-title');
        const fireworkSound = document.getElementById('som-fogos');
        let currentSlotIndex = 0;

        function revealNextMemory() {
            if (currentSlotIndex < memories.length) {
                const slot = slots[currentSlotIndex];
                const memory = memories[currentSlotIndex];
                slot.innerHTML = `<img src="${memory.photo}" alt="${memory.title}"><p class="title">${memory.title}</p><p class="subtitle">${memory.subtitle}</p>`;
                if (memory.position) {
                    slot.querySelector('img').style.objectPosition = memory.position;
                }
                slot.classList.add('visible');
                currentSlotIndex++;
            } else {
                clearInterval(revealInterval);
                setTimeout(launchFireworks, 1500);
            }
        }

        const revealInterval = setInterval(revealNextMemory, 2000);

        function launchFireworks() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (fireworkSound) { fireworkSound.play(); }
            finalTitle.textContent = 'Feliz Aniversário, Meu Amor!';
            finalTitle.classList.add('visible');

            var duration = 8 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
            function randomInRange(min, max) { return Math.random() * (max - min) + min; }
            var interval = setInterval(function() {
                var timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) { return clearInterval(interval); }
                var particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
    }
});
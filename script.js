const container = document.querySelector('.contrainer');
const btn = document.querySelector('.start_btn');
const scoreContainer = document.querySelector('.score');
const timeContainer = document.querySelector('.time');

btn.onclick = function () {
    let score = 0;
    let time = 50; 

    scoreContainer.textContent = "Score : 0";
    timeContainer.textContent = "Temps : " + time;
    container.innerHTML = ""; 
    //Dimension
    const containerWidth = container.clientWidth;   // 500
    const containerHeight = container.clientHeight; // 400
    const targetW = 60;
    const targetH = 50;
    // active le bouton à la fin du jeu
    const endGame = () => {
        clearInterval(gameInterval);
        gameInterval = null;
        container.innerHTML = "<div>Le jeu est terminé</div>";
        timeContainer.textContent = "Temps : 0"; 
    };

    // Boucle principale 
    gameInterval = setInterval(() => {
        if (time <= 0) {
            endGame();
            return;
        }
        const isGood = Math.random() < 0.55; 
        const elt = document.createElement('img');

        if (isGood) {
            elt.id = "alien";       
            elt.src = "alien.png";
        } else {
            elt.className = "person"; 
            elt.src = "person.png"; 
        }
        container.appendChild(elt);

        // Position aléatoire 
        const maxLeft = containerWidth - targetW;
        const maxTop  = containerHeight - targetH;
        elt.style.left = Math.floor(Math.random() * maxLeft) + "px";
        elt.style.top  = Math.floor(Math.random() * maxTop)  + "px";
        elt.style.position = "absolute";
        elt.style.width = targetW + "px";
        elt.style.height = targetH + "px";

        // Disparition après 2s si non cliqué
        const vanish = setTimeout(() => {
            if (elt && elt.parentNode) elt.remove();
        }, 2000);

        // Clic sur l’élément
        elt.onclick = () => {
            clearTimeout(vanish);
            if (elt.parentNode){
                elt.remove();
            }
            if (isGood) {
                score++;
            } else {
                score = Math.max(0, score - 1);
            }
            scoreContainer.textContent = "Score : " + score;
        };

        // Temps
        time--;
        timeContainer.textContent = "Temps : " + time;

        if (time <= 0) {
            setTimeout(endGame, 0);
        }
    }, 650);
};

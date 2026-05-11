function updateClock() {
      const now = new Date(); // récupère la date actuelle

      const hours = String(now.getHours()).padStart(2, '0');  // récupère les heures
      const minutes = String(now.getMinutes()).padStart(2, '0'); // récupère les minutes
      const seconds = String(now.getSeconds()).padStart(2, '0'); // récupère les secondes

      document.getElementById('clock').textContent =
        `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);  // mise à jour toute les secondes
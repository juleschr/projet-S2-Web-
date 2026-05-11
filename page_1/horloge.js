
    function mettreAJourHorloge() {

      // On récupère la date et l'heure actuelles
      var maintenant = new Date();

      // Heures, minutes, secondes
      var heures   = maintenant.getHours();
      var minutes  = maintenant.getMinutes();
      var secondes = maintenant.getSeconds();

      // Jour, mois, année
      var jour  = maintenant.getDate();
      var mois  = maintenant.getMonth() + 1; // +1 car janvier = 0
      var annee = maintenant.getFullYear();

      // On ajoute un "0" devant si le chiffre est inférieur à 10
      if (heures   < 10) { heures   = "0" + heures;   }
      if (minutes  < 10) { minutes  = "0" + minutes;  }
      if (secondes < 10) { secondes = "0" + secondes; }
      if (jour     < 10) { jour     = "0" + jour;     }
      if (mois     < 10) { mois     = "0" + mois;     }

      // On affiche dans le HTML
      document.getElementById("heure").textContent = "il est " + heures + ":" + minutes + ":" + secondes;
      document.getElementById("date").textContent  = jour + "/" + mois + "/" + annee;
    }

    // On lance la fonction une première fois
    mettreAJourHorloge();

    // Puis toutes les secondes (1000 millisecondes)
    setInterval(mettreAJourHorloge, 1000);

  
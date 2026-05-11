// =============================================
// GRATTAGE — cache argenté sur les photos
// =============================================
function grattage() {
  const canvases = document.querySelectorAll(".grattage-canvas");

  canvases.forEach((canvas) => {
    const img = canvas.previousElementSibling;
    const width = img.offsetWidth;
    const height = img.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    // Dessin du cache argenté circulaire
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#d4d4d4");
    gradient.addColorStop(0.3, "#c0c0c0");
    gradient.addColorStop(0.6, "#a9a9a9");
    gradient.addColorStop(1, "#d4d4d4");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
    ctx.fill();

    let isDrawing = false;

    // Gratter seulement quand le clic est maintenu
    canvas.parentElement.addEventListener("mousedown", () => { isDrawing = true; });
    canvas.parentElement.addEventListener("mouseup",   () => { isDrawing = false; });
    canvas.parentElement.addEventListener("mouseleave",() => { isDrawing = false; });

    canvas.parentElement.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // "destination-out" efface le cache pour révéler la photo
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    });
  });
}

// =============================================
// MODE ÉDITION
// =============================================
let isEditMode = false;

function verif_modeedition() {
  const resultat_user = window.prompt("Enter user :");
  if (resultat_user !== "admin") {
    console.log("Admin non connecté");
    return;
  }

  const resultat_pwd = window.prompt("Enter password :");
  if (resultat_pwd === "admin_pwd") {
    console.log("Admin connecté");
    modeedition();
  } else {
    console.log("Mot de passe incorrect");
  }
}

function modeedition() {
  if (!isEditMode) {
    isEditMode = true;
    document.querySelector(".boutton_modeedition").value = "Mode Edition (Activé)";
    document.getElementById("quitEditMode").style.display = "block";
    ajouterMembre();
  }
}

function ajouterMembre() {
  const nom = prompt("Entrez le nom du nouveau membre :", "");
  if (nom === null) return;

  const poste = prompt("Entrez le poste du nouveau membre :", "");
  if (poste === null) return;

  const bioText = prompt("Entrez la biographie du nouveau membre :", "");
  if (bioText === null) return;

  const imageSrc = prompt("Entrez le chemin de l'image (ex. ../img/image.png) :", "");
  if (imageSrc === null) return;

  // Ajout de la photo dans image-row
  const imageRow = document.querySelector(".image-row");
  const newImageBlock = document.createElement("div");
  newImageBlock.className = "image-block";
  newImageBlock.innerHTML = `
    <div class="image-container">
      <img src="${imageSrc}" alt="photo ${nom}" class="photo" />
      <canvas class="grattage-canvas"></canvas>
    </div>
    <p class="name">${nom}</p>
    <p class="job">${poste}</p>
  `;
  imageRow.appendChild(newImageBlock);

  // Relancer le grattage sur le nouveau canvas
  grattage();

  // Ajout de la biographie dans bio-row
  const bioRow = document.querySelector(".bio-row");
  const newBio = document.createElement("div");
  newBio.className = "bio";
  newBio.innerHTML = `
    <h2 style="color: #3241c2">Biographie de ${nom}</h2>
    <p>${bioText}</p>
  `;
  bioRow.appendChild(newBio);

  // Proposer d'ajouter un autre membre
  if (isEditMode) {
    const continuer = confirm("Voulez-vous ajouter un autre membre ?");
    if (continuer) ajouterMembre();
  }
}

function quitterModeEdition() {
  isEditMode = false;
  document.querySelector(".boutton_modeedition").value = "Mode Edition";
  document.getElementById("quitEditMode").style.display = "none";
}

// =============================================
// INITIALISATION — attend que le DOM soit prêt
// =============================================
window.addEventListener("DOMContentLoaded", function () {
  // Lance le grattage sur les photos existantes
  grattage();

  // Attache les boutons APRÈS que le DOM existe
  document.querySelector(".boutton_modeedition").addEventListener("click", verif_modeedition);
  document.getElementById("quitEditMode").addEventListener("click", quitterModeEdition);
});
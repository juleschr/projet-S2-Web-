// Bandeau "Acheter"
function acheter(){
    const bandeau = document.getElementById("bandeau");
    bandeau.style.display = "block";

    setTimeout(() => {
        bandeau.style.display = "none";
    },2000);
}

// Flèche permettant de remonter vers le haut
document.getElementById("topBtn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Changement des images lors du click
function changerImage(img, img1, img2) {
    if (img.src.includes(img1)) {
        img.src = img2;
    } else {
        img.src = img1;
    }
}

// Produits
function filtrer(){
    const nom = document.getElementById("filtreNom").ariaValueMax.toLowerCase();
    const produits = document.querySelctorAll (".produit");

    produits.forEach(produit => {
        const titre = produit.querySelector("h3").textContent.toLowerCase();
        
        if (titre.includes(nom)) {
            produit.style.display = "block";
        } else {
            produit.style.display = "none";
        }
    });
}

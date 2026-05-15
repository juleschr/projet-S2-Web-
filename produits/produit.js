/* HORLOGE */
function updateClock() {
    const now = new Date();
    const heure = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    document.getElementById("heure")
        .innerText = heure;
    document.getElementById("date")
        .innerText = date;
}
updateClock();
setInterval(updateClock, 1000);


/* CHANGEMENT IMAGE */
function changerImage(img){
  let temp = img.src;
  img.src = img.dataset.alt;
  img.dataset.alt = temp;
}

/* ACHAT */
function acheter(){
  let box = document.getElementById("achat");
  box.style.display="block";
  setTimeout(()=>box.style.display="none",2000);
}

/* REMONTER */
function remonter(){
  window.scrollTo({top:0,behavior:"smooth"});
}
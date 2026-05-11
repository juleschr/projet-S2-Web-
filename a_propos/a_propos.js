function updateClock() {

    const now = new Date();

    const heure = now.toLocaleTimeString();

    const date = now.toLocaleDateString();

    document.getElementById("heure")
        .innerText = heure;

    document.getElementById("date")
        .innerText = date;
}

setInterval(updateClock, 1000);

updateClock();
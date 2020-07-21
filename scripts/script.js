const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function(){
        const challengeId = card.getAttribute("id")
        window.location.href = `/challenge?id=${challengeId}`
    })
}
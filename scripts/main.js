document.addEventListener("DOMContentLoaded", () => {
    const card_value = [
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T']

    const cardContainer = document.querySelector(".card-container");
    const dropZones = document.querySelectorAll(".square");
    let droppedCardCount = 0;
    let cards = Array.from(document.querySelectorAll(".card"));

    cards.forEach(card => {
        card.addEventListener("dragstart", (event) => {
            // Store the card's id in the dataTransfer object
            event.dataTransfer.setData("text/plain", card.id);
        });
    });

    dropZones.forEach(dropZone => {
        dropZone.addEventListener("dragover", (event) => {
            // Prevent the default behavior to enable dropping
            event.preventDefault();
        });

        dropZone.addEventListener("drop", (event) => {
            // Prevent the default behavior
            event.preventDefault();

            // Get the card id from the dataTransfer object
            const cardId = event.dataTransfer.getData("text/plain");

            // Find the dragged card by ID
            const draggedCard = document.getElementById(cardId);

            // Get the current card count for the drop zone
            const cardCount = parseInt(dropZone.getAttribute("data-card-count"));

            // Check if the card count is less than 5
            if (cardCount < 4) {
                // Increment the card count
                dropZone.setAttribute("data-card-count", cardCount + 1);

                // Append the card to the drop zone
                dropZone.appendChild(draggedCard);
                 // Increment the dropped card count
                draggedCard.id = draggedCard.id +  dropZone.id;

                console.log(draggedCard.id)
                droppedCardCount++;
            }
            
            // Check if the limit has been reached, and generate new cards if needed
            if (cardContainer.childElementCount == 0 && droppedCardCount < 20) {
                generateNewCards();
            }
            else if(droppedCardCount == 20){
                let finish = confirmAction()
                if(finish){
                    res = generateResult();
                    displayResult(res);
                }
            }
        });
    });

    function generateNewCards() {
        // Create new card elements and add them to the card container
        for (let i = 1; i <= 4; i++) {
            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.draggable = true;
            newCard.textContent = `New Card ${i}`;
            newCard.id = card_value[i + droppedCardCount - 1];
            cardContainer.appendChild(newCard);
            newCard.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text/plain", newCard.id);
            });
        }
    }
    function generateResult() {
        let cards = Array.from(document.querySelectorAll(".card"));
        let A = 0, B = 1, C = 2, D = 3, E = 4, F = 5, G = 6, H = 7, I = 8, J = 9, K = 10, L = 11, M = 12, N = 13, O = 14, P = 15, Q = 16, R = 17, S = 18, T = 19;

        let achievement = (parseInt(cards[A].id[1]) + parseInt(cards[F].id[1])) * 3;
        let independence = (parseInt(cards[I].id[1]) + parseInt(cards[M].id[1]) + parseInt(cards[T].id[1])) * 2;
        let recognition = (parseInt(cards[D].id[1]) + parseInt(cards[E].id[1]) + parseInt(cards[L].id[1])) * 2;
        let relationships = (parseInt(cards[H].id[1]) + parseInt(cards[K].id[1]) + parseInt(cards[O].id[1])) * 2;
        let support = (parseInt(cards[B].id[1]) + parseInt(cards[P].id[1]) + parseInt(cards[Q].id[1])) * 2;
        let working_conditions = parseInt(cards[C].id[1]) + parseInt(cards[G].id[1]) + parseInt(cards[J].id[1]) + parseInt(cards[N].id[1]) + parseInt(cards[R].id[1]) + parseInt(cards[S].id[1]);

        let dict = {
            'achievement': achievement, 
            "independence" : independence,
            "recognition": recognition,
            "relationships" :relationships,
            "support" : support,
            "working_conditions": working_conditions,};

        
        dict = Object.entries(dict);
        dict.sort((x,y) => x[1] - y[1]);
        console.log(dict);
        return dict;
    }
    function displayResult(res) {
        document.getElementById("result")
                .innerHTML +=
        `
        <div>
            <p> YOUR HIGHEST SCORE:`+ res[res.length-1][1] +` NAME OF WORK VALUE: `+ res[res.length - 1][0]+` <p>
            <p> YOUR NEXT HIGHEST SCORE:`+ res[res.length-2][1] +` NAME OF WORK VALUE: `+ res[res.length-2][0]+` <p>
        </div>
        `;
        
        
    }
    function confirmAction (){
        const response = confirm("Are you finish?");

        if (response)
            return true;
        else
            return false;
    }
    
});
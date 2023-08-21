document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.querySelector(".card-container");
    const dropZones = document.querySelectorAll(".square");
    let droppedCardCount = 0;
    const cards = Array.from(document.querySelectorAll(".card"));

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
            if (cardCount < 5) {
                // Increment the card count
                dropZone.setAttribute("data-card-count", cardCount + 1);

                // Append the card to the drop zone
                dropZone.appendChild(draggedCard);
                 // Increment the dropped card count
                droppedCardCount++;
            }

            // Check if the limit has been reached, and generate new cards if needed
            if (cardContainer.childElementCount == 0) {
                generateNewCards();
            }
        });
    });

    function generateNewCards() {
        // Create new card elements and add them to the card container
        for (let i = 1; i <= 5; i++) {
            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.draggable = true;
            newCard.textContent = `New Card ${i}`;
            newCard.id = i + droppedCardCount;
            cardContainer.appendChild(newCard);
            newCard.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text/plain", newCard.id);
            });
        }
    }
});
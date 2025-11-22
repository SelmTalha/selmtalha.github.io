document.addEventListener('DOMContentLoaded', function() {
    const participantCountInput = document.getElementById('participantCount');
    const generateInputsButton = document.getElementById('generateInputs');
    const participantInputsContainer = document.getElementById('participantInputs');
    const winnerCountInput = document.getElementById('winnerCount');
    const drawLotteryButton = document.getElementById('drawLottery');
    const resultsContainer = document.getElementById('results');

    generateInputsButton.addEventListener('click', function() {
        const participantCount = parseInt(participantCountInput.value, 10);
        if (isNaN(participantCount) || participantCount < 1) {
            alert('Lütfen geçerli bir sayı girin.');
            return;
        }

        participantInputsContainer.innerHTML = '';

        for (let i = 1; i <= participantCount; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'participant-row';  // <<< BURASI ÖNEMLİ

            inputGroup.innerHTML = `
                <label for="participant${i}">Katılımcı ${i}:</label>
                <input type="text" id="participant${i}" required>
            `;

            participantInputsContainer.appendChild(inputGroup);
        }
    });

    drawLotteryButton.addEventListener('click', function() {
        const winnerCount = parseInt(winnerCountInput.value, 10);
        if (isNaN(winnerCount) || winnerCount < 1) {
            alert('Lütfen geçerli bir sayı girin.');
            return;
        }

        const participants = [];

        for (let i = 1; i <= participantCountInput.value; i++) {
            const participantInput = document.getElementById(`participant${i}`);
            if (participantInput) {
                participants.push(participantInput.value);
            }
        }

        if (participants.length < winnerCount) {
            alert('Katılımcı sayısı kazanan sayısından az olamaz.');
            return;
        }

        const winners = [];
        while (winners.length < winnerCount) {
            const randomIndex = Math.floor(Math.random() * participants.length);
            const winner = participants[randomIndex];
            if (!winners.includes(winner)) {
                winners.push(winner);
            }
        }

        resultsContainer.innerHTML = `
            <h2>Kazananlar:</h2>
            <ul>
                ${winners.map((winner, index) => `<li>${index + 1}. ${winner}</li>`).join('')}
            </ul>
        `;
    });
});

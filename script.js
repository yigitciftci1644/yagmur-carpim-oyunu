const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const stitchImg = document.getElementById("stitch-img");

let score = 0;

// Soru üret
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 * num2;

    questionElement.textContent = `${num1} x ${num2} = ?`;

    // 1 doğru + 3 yanlış cevap
    const answers = [correctAnswer];
    while (answers.length < 4) {
        const wrong = Math.floor(Math.random() * 100) + 1;
        if (!answers.includes(wrong)) answers.push(wrong);
    }

    // Karıştır
    answers.sort(() => Math.random() - 0.5);

    // Şıkları ekle
    optionsElement.innerHTML = "";
    answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, correctAnswer);
        optionsElement.appendChild(button);
    });
}

// Cevap kontrol
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        scoreElement.textContent = `Skor: ${score}`;
        stitchImg.src = "stitch_correct.gif"; // ✅ doğru cevap animasyonu
    } else {
        score = Math.max(0, score - 1); // yanlışta skor düşer ama 0’ın altına inmez
        scoreElement.textContent = `Skor: ${score}`;
        stitchImg.src = "stitch_wrong.gif"; // ❌ yanlış cevap animasyonu
    }

    // 1.5 saniye sonra yeni soru gelsin
    setTimeout(() => {
        stitchImg.src = "stitch_idle.gif";
        generateQuestion();
    }, 1500);
}

// İlk soruyu başlat
generateQuestion();

document.addEventListener('DOMContentLoaded', () => {
    // Lógica existente para os corações clicáveis
    const hearts = document.querySelectorAll('.clickable-heart');
    const popup = document.getElementById('heart-popup');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.querySelector('.close-button'); // Este é o botão de fechar do popup dos corações

    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            const message = heart.getAttribute('data-message');
            popupMessage.textContent = message;
            popup.style.display = 'flex'; // Show the pop-up
        });
    });

    closeButton.addEventListener('click', () => {
        popup.style.display = 'none'; // Hide the pop-up
    });

    popup.addEventListener('click', (event) => {
        // Certifique-se de que o clique foi no overlay do popup, não dentro do conteúdo
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // --- Lógica do Quiz ---
    const quizIntroSection = document.querySelector('.quiz-intro-section');
    const quizQuestionsSection = document.getElementById('quizQuestions'); // Este é o overlay do quiz
    const quizContainer = quizQuestionsSection.querySelector('.quiz-container'); // A caixa branca do quiz
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.querySelector('.options-container');
    const feedbackMessage = document.getElementById('feedback');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const closeQuizBtn = document.getElementById('closeQuizBtn'); // Novo: botão de fechar do quiz

    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        // ... (suas perguntas existentes) ...
        {
            question: "Onde demos o primeiro beijo?",
            options: {
                a: "Escola",
                b: "Cinema",
                c: "Praça Rippa",
                d: "Praia"
            },
            correctAnswer: "b"
        },
        {
            question: "Quando demos o primeiro beijo?",
            options: {
                a: "21 de Junho",
                b: "12 de Junho",
                c: "20 de Junho",
                d: "12 de Julho"
            },
            correctAnswer: "c"
        },
        {
            question: "Sobre o que foi nossa primeira conversa? (2023)",
            options: {
                a: "Grupo de estudos",
                b: "Notas",
                c: "Viagens",
                d: "Transporte"
            },
            correctAnswer: "a"
        },
        {
            question: "Qual foi o primeiro filme que assistimos juntos??",
            options: {
                a: "Mamma Mia",
                b: "Wicked",
                c: "Tinker Bell",
                d: "Divertidamente"
            },
            correctAnswer: "d"
        },
        {
            question: "O que gostamos em comum?",
            options: {
                a: "Mamma Mia, Tinker Bell, Jurassic, Harry Potter",
                b: "Esporte, Mamma Mia, Carros, Corinthians",
                c: "Palmeiras, ABBA, programação, Harry Potter",
                d: "Disney, escola, natureza, café"
            },
            correctAnswer: "a"
        },
        {
            question: "Quais são nossas cores favoritas?",
            options: {
                a: "Verde e vermelho",
                b: "Preto e lilás",
                c: "Roxo e verde",
                d: "Roxo e preto"
            },
            correctAnswer: "c"
        },
        {
            question: "Qual foi o primeiro presente que você me deu?",
            options: {
                a: "4 KitKats",
                b: "Chocolate da Kopenhagen",
                c: "Bala fini",
                d: "Chocolate Cacau Show"
            },
            correctAnswer: "a"
        },
        {
            question: "Qual foi o primeiro presente que eu te dei (vale comida)?",
            options: {
                a: "Bola que pula",
                b: "Chocolate e salgadinho",
                c: "Bala fini",
                d: "Carrinho de brinquedo"
            },
            correctAnswer: "b"
        },
        {
            question: "Quando eu fui na sua casa pela primeira vez?",
            options: {
                a: "Janeiro",
                b: "Dezembro",
                c: "Novembro",
                d: "Outubro"
            },
            correctAnswer: "d"
        },
        {
            question: "Onde saímos pela primeira vez?",
            options: {
                a: "Churrascaria",
                b: "Shopping",
                c: "Praça Rippa",
                d: "Praia"
            },
            correctAnswer: "a"
        }
    ];

    // Função para iniciar o quiz
    window.iniciarQuiz = () => {
        quizIntroSection.style.display = 'none'; // Oculta a tela de introdução
        quizQuestionsSection.style.display = 'flex'; // Mostra a seção de perguntas (o overlay)
        currentQuestionIndex = 0; // Reinicia o índice da pergunta
        score = 0; // Reinicia a pontuação
        loadQuestion();
    };

    // Função para fechar o quiz
    window.closeQuiz = () => {
        quizQuestionsSection.style.display = 'none'; // Esconde o overlay do quiz
        quizIntroSection.style.display = 'flex'; // Volta para a tela de introdução
    };

    // Adiciona event listener para o botão de fechar do quiz
    closeQuizBtn.addEventListener('click', () => {
        closeQuiz();
    });

    // Adiciona event listener para fechar o quiz ao clicar fora do quiz-container
    quizQuestionsSection.addEventListener('click', (event) => {
        // Se o clique foi no overlay (quizQuestionsSection) mas não dentro do quizContainer
        if (event.target === quizQuestionsSection) {
            closeQuiz();
        }
    });

    function loadQuestion() {
        // ... (sua função loadQuestion existente) ...
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = `Questão ${currentQuestionIndex + 1}- ${currentQuestion.question}`;
        optionsContainer.innerHTML = ''; // Limpa as opções anteriores
        feedbackMessage.textContent = ''; // Limpa a mensagem de feedback
        nextQuestionBtn.style.display = 'none'; // Oculta o botão de próxima pergunta

        for (const optionKey in currentQuestion.options) {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.setAttribute('data-option', optionKey);
            button.textContent = `${optionKey}) ${currentQuestion.options[optionKey]}`;
            button.addEventListener('click', checkAnswer);
            optionsContainer.appendChild(button);
        }
    }

    function checkAnswer(event) {
        // ... (sua função checkAnswer existente) ...
        const selectedOption = event.target;
        const selectedAnswer = selectedOption.getAttribute('data-option');
        const currentQuestion = questions[currentQuestionIndex];

        const allOptionButtons = optionsContainer.querySelectorAll('.option-button');
        allOptionButtons.forEach(button => {
            button.removeEventListener('click', checkAnswer);
            button.disabled = true;
        });

        if (selectedAnswer === currentQuestion.correctAnswer) {
            selectedOption.classList.add('correct');
            feedbackMessage.textContent = "Certa resposta!";
            feedbackMessage.style.color = "#00FF7F"; // Verde claro
            score++;
        } else {
            selectedOption.classList.add('wrong');
            feedbackMessage.textContent = "Resposta errada. A resposta correta era: " + currentQuestion.options[currentQuestion.correctAnswer];
            feedbackMessage.style.color = "#f44336"; // Vermelho
            allOptionButtons.forEach(button => {
                if (button.getAttribute('data-option') === currentQuestion.correctAnswer) {
                    button.classList.add('correct');
                }
            });
        }

        nextQuestionBtn.style.display = 'block';
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        quizQuestionsSection.innerHTML = `
            <div class="quiz-container">
                <button id="closeQuizBtnResults" class="close-button" style="top: 10px; right: 15px;">&times;</button>
                <h2>Quiz Concluído!</h2>
                <p>Você acertou ${score} de ${questions.length} perguntas.</p>
                <button onclick="restartQuiz()" class="next-button">Refazer Quiz</button>
            </div>
        `;
        // Adiciona o event listener para o botão de fechar na tela de resultados
        document.getElementById('closeQuizBtnResults').addEventListener('click', () => {
            closeQuiz();
        });
    }

    window.restartQuiz = () => {
        // Esta função agora apenas esconde a tela de resultados e mostra a introdução novamente
        quizQuestionsSection.innerHTML = ''; // Limpa os resultados
        quizIntroSection.style.display = 'flex'; // Volta para a tela inicial do quiz
        // A função iniciarQuiz será chamada novamente ao clicar no botão "Começar"
        // no quiz-intro-section
    };

});
const hangmanSvg = document.querySelector("#hangman");
const wordContainer = document.querySelector("#word");
const letters = document.querySelector("#letters");
const guessInput = document.querySelector("#guessInput");
const guessButton = document.querySelector("#guessButton");
const attemptsText = document.querySelector("#attempts");
const remainingAttemptsSpan = document.querySelector("#remainingAttempts");
const category = document.querySelector("#category");
const hangman = document.querySelector(".hangman-container");
const restartButton = document.querySelector("#restartButton");

const wordArr = {
  FRUTAS: [
    "abacate",
    "abacaxi",
    "ameixa",
    "banana",
    "cereja",
    "caju",
    "carambola",
    "côco",
    "damasco",
    "figo",
    "framboesa",
    "goiaba",
    "kiwi",
    "laranja",
    "limão",
    "manga",
    "maracujá",
    "maçã",
    "melancia",
    "melão",
    "mirtilo",
    "morango",
    "pera",
    "pêssego",
    "pitanga",
    "pomelo",
    "tangerina",
    "uva",
  ],
  ANIMAIS: [
    "avestruz",
    "alce",
    "anaconda",
    "albatroz",
    "arraia",
    "atum",
    "cachorro",
    "camelo",
    "cavalo",
    "coala",
    "coruja",
    "crocodilo",
    "elefante",
    "gato",
    "girafa",
    "golfinho",
    "hiena",
    "hipopótamo",
    "leão",
    "lobo",
    "lontra",
    "macaco",
    "panda",
    "peixe",
    "puma",
    "rinoceronte",
    "serpente",
    "tartaruga",
    "tigre",
    "urso",
    "vaca",
    "veado",
    "zebra",
  ],
  CORES: [
    "amarelo",
    "azul",
    "branco",
    "laranja",
    "preto",
    "roxo",
    "rosa",
    "verde",
    "vermelho",
  ],
  // Adicione mais listas de arrays, se desejar...
};

const categories = Object.keys(wordArr);
const chooseRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomCategory = chooseRandomItem(categories);
const randomWord = chooseRandomItem(wordArr[randomCategory]);

let selectedWord = randomWord;
let guessedLetters = [];
let remainingAttempts = 6;

// Escolher uma categoria aleatória e uma palavra aleatória da categoria
const chooseRandomCategoryAndWord = () => {
  selectedCategory = chooseRandomItem(categories);
  category.textContent = selectedCategory;
  selectedWord = chooseRandomItem(wordArr[selectedCategory]);
};

// Initialize the word display
const initializeWordDisplay = () => {
  let display = "";
  for (const letter of selectedWord) {
    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "💣";
    }
  }
  wordContainer.textContent = display;
};

// Lista de URLs das imagens da forca
const hangmanImages = [
  `assets/img/0.png`,
  `assets/img/1.png`,
  `assets/img/2.png`,
  `assets/img/3.png`,
  `assets/img/4.png`,
  `assets/img/5.png`,
  `assets/img/6.png`,
];

// Função para atualizar a imagem da forca com base nas tentativas restantes
const updateHangmanSvg = () => {
  // Obtém o índice da imagem com base nas tentativas restantes
  const imageIndex = 6 - remainingAttempts;

  if (imageIndex >= 0 && imageIndex < hangmanImages.length) {
    const imageUrl = hangmanImages[imageIndex];
    const img = new Image();
    img.src = imageUrl;
    img.alt = `imagem de forca`;
    img.className = `forcaImg`;
    // Remove a imagem anterior (se houver)
    while (hangman.firstChild) {
      hangman.removeChild(hangman.firstChild);
    }
    // Adiciona a nova imagem
    hangman.appendChild(img);
  }
};

// Função para atualizar a lista de letras usadas
const updateUsedLetters = () => {
  letters.textContent = `${guessedLetters.join(" , ")}`;
};

// criar alert
function criarEAdicionarElemento(tag, atributos, texto) {
  var elemento = document.createElement(tag);

  if (atributos) {
    for (var chave in atributos) {
      if (atributos.hasOwnProperty(chave)) {
        elemento.setAttribute(chave, atributos[chave]);
      }
    }
  }

  if (texto) {
    var textoNode = document.createTextNode(texto);
    elemento.appendChild(textoNode);
  }

  // Adicione o elemento ao corpo do documento (ou a qualquer outro elemento pai desejado)

  document.querySelector(".sectionCont").appendChild(elemento);

  // Retorne o elemento criado para que você possa usá-lo posteriormente, se necessário
  return elemento;
}

function removerElemento(elemento) {
  // Verifique se o elemento possui um pai antes de tentar removê-lo
  if (elemento && elemento.parentNode) {
    elemento.parentNode.removeChild(elemento);
  }
}

// Lidar com o clique no botão de adivinhar
guessButton.addEventListener("click", () => {
  const guess = guessInput.value.toLowerCase();
  if (guess && !guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
    updateUsedLetters(); // Atualiza a lista de letras usadas
    if (!selectedWord.includes(guess)) {
      remainingAttempts--;
      var meuElemento = criarEAdicionarElemento(
        "div",
        { class: "alertCont", id: "error" },
        `Errou: ${guess} não está na palavra.`
      );
      setTimeout(() => {
        removerElemento(meuElemento);
      }, 2000);
      updateHangmanSvg();
      if (remainingAttempts === 0) {
        setTimeout(() => {
          var meuElemento = criarEAdicionarElemento(
            "div",
            { class: "alertCont", id: "defeat" },
            `Você perdeu! 
             A palavra era: ${selectedWord}`
          );
          setTimeout(() => {
            removerElemento(meuElemento);
            restartGame();
          }, 3000);
        }, 1000);
      }
      remainingAttemptsSpan.textContent = remainingAttempts;
    }
    initializeWordDisplay();
    if (isGameWon()) {
      // Lidar com a vitória
      setTimeout(() => {
        var meuElemento = criarEAdicionarElemento(
          "div",
          { class: "alertCont", id: "victory" },
          `Você venceu 🥳🎉 !!`
        );
        setTimeout(() => {
          removerElemento(meuElemento);
          restartGame();
        }, 2000);
      }, 1000);
    }
  }
  guessInput.value = "";
});

//Verifica se o jogo foi ganho
const isGameWon = () => {
  return selectedWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
};

// Reiniciar o jogo
const restartGame = () => {
  chooseRandomCategoryAndWord();
  guessedLetters = []; // Zera a lista de letras usadas
  remainingAttempts = 6;
  initializeWordDisplay();
  updateHangmanSvg();
  remainingAttemptsSpan.textContent = remainingAttempts;
  updateUsedLetters(); // Atualiza a lista de letras usadas para ficar vazia
};
// Lidar com o clique no botão de reiniciar
restartButton.addEventListener("click", () => {
  restartGame();
});

// Inicializar o jogo
const startGame = () => {
  chooseRandomCategoryAndWord();
  initializeWordDisplay();
  updateHangmanSvg();
  remainingAttemptsSpan.textContent = remainingAttempts;
  updateUsedLetters(); // Certifica-se de que a lista de letras usadas está vazia no início do jogo
};

startGame();

const wordArr = {
  Fruta: [
    "abacaxi",
    "banana",
    "caju",
    "damasco",
    "figo",
    "goiaba",
    "kiwi",
    "laranja",
    "maça",
    "melancia",
    "melao",
    "manga",
    "morango",
    "pessego",
    "uva",
    "pera",
    "ameixa",
    "coco",
    "limao",
    "tangerina",
    "papaya",
    "abobora",
    "pitanga",
    "açai",
    "bacaba",
    "cereja",
    "amora",
    "framboesa",
    "groselha",
    "maracuja",
    "uvaia",
    "grapefruit",
    "guarana",
    "jabuticaba",
    "tamarindo",
    "tâmara",
    "roma",
    "jaca",
    "caqui",
    "pomelo",
    "lichia",
    "nectarina",
    "carambola",
    "acerola",
    "mirtilo",
    "pitaya",
    "avela",
    "castanha",
    "noz",
    "amendoa",
    "caja",
    "atemoia",
    "azarole",
    "bergamota",
    "cajui",
    "canistel",
    "cupuaçu",
    "custard",
    "embaúba",
    "feijoa",
    "gaba",
    "jaca",
    "jambolao",
    "jamelao",
    "jatoba",
    "jenipapo",
    "kinkan",
    "lima",
    "mamei",
    "mangaba",
    "marmelo",
    "miranha",
    "murici",
    "nespera",
    "pequi",
    "pitomba",
    "pomelo",
    "rambutan",
    "romena",
    "rubra",
    "santal",
    "santol",
    "sapoti",
    "seriguela",
    "sorveira",
    "tamarindo",
    "toranja",
    "tucuma",
    "umbu",
  ],
  Animal: [
    "leao",
    "tigre",
    "urso",
    "cachorro",
    "gato",
    "pato",
    "passaro",
    "elefante",
    "rato",
    "cobra",
    "tartaruga",
    "zebra",
    "foca",
    "lobo",
    "camelo",
    "jacare",
    "hiena",
    "gnu",
    "coiote",
    "pinguim",
    "gorila",
    "rinoceronte",
    "caranguejo",
    "cavalo",
    "galinha",
    "pavao",
    "borboleta",
    "raposa",
    "aguia",
    "tubarao",
    "golfinho",
    "girafa",
    "esquilo",
    "hiena",
    "morcego",
    "tatu",
    "gaviao",
    "cisne",
    "arara",
    "sapo",
    "anta",
    "morcego",
    "alce",
    "polvo",
    "ouriço",
    "aguia",
    "castor",
    "garça",
    "panda",
    "quokka",
    "peixe",
    "ra",
    "tartaruga",
    "falcao",
    "aguia",
    "suricata",
    "faisao",
    "dromedario",
    "mariposa",
    "ra",
    "formiga",
    "lince",
    "suricate",
    "antilope",
    "lontra",
    "foca",
    "iguana",
    "tartaruga",
    "marreco",
    "gazela",
    "canguru",
    "borboleta",
    "lhama",
    "peixinho",
    "tubarao",
    "salmao",
    "aranha",
    "cobra",
    "pardal",
    "periquito",
    "pomba",
    "aguia",
    "orca",
    "leopardo",
    "camarao",
    "tatu",
    "lagartixa",
    "galo",
    "carpa",
    "carneiro",
    "caranguejo",
    "garoupa",
    "camaleao",
    "chinchila",
  ],
  Cor: [
    "vermelho",
    "azul",
    "verde",
    "amarelo",
    "rosa",
    "roxo",
    "laranja",
    "marrom",
    "preto",
    "branco",
    "cinza",
    "bege",
    "dourado",
    "prateado",
    "turquesa",
    "violeta",
    "ciano",
    "magenta",
    "aqua",
    "indigo",
    "oliveira",
    "coral",
    "rubi",
    "tangerina",
    "lavanda",
    "bordo",
    "terracota",
    "marmore",
  ],
  // Adicione mais listas de arrays, se desejar...
};

let selectedCategory = "frutas";
let selectedWord = "";
let guessedLetters = [];
let remainingAttempts = 6;

const hangmanSvg = document.querySelector("#hangman");
const hangman = document.querySelector(".hangman-container");
const wordContainer = document.querySelector("#word");
const guessInput = document.querySelector("#guessInput");
const guessButton = document.querySelector("#guessButton");
const restartButton = document.querySelector("#restartButton");
const attemptsText = document.querySelector("#attempts");
const remainingAttemptsSpan = document.querySelector("#remainingAttempts");
const categorySpan = document.querySelector("#category");
const keyboard = document.querySelector("#keyboard");

// Array com as letras do alfabeto
const alphabet = "abcçdefghijklmnopqrstuvwxyz".split("");

// Função para escolher um item aleatorio de um array
const chooseRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Corrija a função chooseRandomCategoryAndWord
const chooseRandomCategoryAndWord = () => {
  const categories = Object.keys(wordArr);
  selectedCategory = chooseRandomItem(categories);
  const categoryWords = wordArr[selectedCategory];
  selectedWord = chooseRandomItem(categoryWords);
  categorySpan.textContent = selectedCategory;
};

// Função para atualizar a imagem da forca com base nas tentativas restantes
const updateHangmanSvg = () => {
  const hangmanImages = [
    `assets/img/0.png`,
    `assets/img/1.png`,
    `assets/img/2.png`,
    `assets/img/3.png`,
    `assets/img/4.png`,
    `assets/img/5.png`,
    `assets/img/6.png`,
  ];

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
// Função para criar e adicionar botões do teclado
const createKeyboardButtons = () => {
  alphabet.forEach((letter) => {
    const button = document.createElement("button");
    button.classList.add("key");
    button.textContent = letter.toUpperCase();
    keyboard.appendChild(button);

    // Adicionar um evento de clique ao botão gerado
    button.addEventListener("click", () => {
      if (!button.disabled) {
        handleGuess(letter);
        button.disabled = true;
      }
    });
  });
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
  // Retorne o elemento criado para que voce possa usa-lo posteriormente, se necessario
  return elemento;
}

function removerElemento(elemento) {
  // Verifique se o elemento possui um pai antes de tentar removê-lo
  if (elemento && elemento.parentNode) {
    elemento.parentNode.removeChild(elemento);
  }
}

// Função para lidar com a adivinhação
const handleGuess = (guess) => {
  guess = guess.toLowerCase(); // Certifica-se de que a letra seja minúscula

  if (!guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
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
      // console.log(`Erro: Letra ${guess} não está na palavra.`);
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
  } else {
    console.log("Erro: Você já adivinhou esta letra antes.");
  }
};

// Lidar com o clique no botão de reiniciar
restartButton.addEventListener("click", () => {
  restartGame();
});

// Função para habilitar todos os botões do teclado
const enableAllKeyboardButtons = () => {
  const keyboardButtons = document.querySelectorAll(".key");
  keyboardButtons.forEach((button) => {
    button.disabled = false;
  });
};

// Função para reiniciar o jogo
const restartGame = () => {
  chooseRandomCategoryAndWord();
  guessedLetters = [];
  remainingAttempts = 6;
  initializeWordDisplay();
  updateHangmanSvg();
  remainingAttemptsSpan.textContent = remainingAttempts;
  // Habilitar todos os botões do teclado
  enableAllKeyboardButtons();
};

// Função para inicializar a exibição da palavra oculta
const initializeWordDisplay = () => {
  const wordDisplay = [];
  for (const letter of selectedWord) {
    if (guessedLetters.includes(letter)) {
      wordDisplay.push(letter);
    } else {
      wordDisplay.push("_");
    }
  }
  wordContainer.textContent = wordDisplay.join(" ");
};

// Função para verificar se o jogador ganhou o jogo
const isGameWon = () => {
  return selectedWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
};

// Inicializar o jogo
const startGame = () => {
  createKeyboardButtons();
  chooseRandomCategoryAndWord();
  initializeWordDisplay();
  updateHangmanSvg();
  remainingAttemptsSpan.textContent = remainingAttempts;
  // updateUsedLetters();
};
startGame();

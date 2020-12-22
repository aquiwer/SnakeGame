let closeSuccess = document.getElementById ( "closeSuccess" );
let successFinish = document.querySelector ( ".success-finish" );
let loseFinish = document.querySelector ( ".lose-finish" )
let finalScore = document.querySelector ( "#finalScore" )
let reset = document.querySelector("#reset")
let start = document.querySelector("#startGame");
let info = document.querySelector(".info-container")
let close = () => {
    successFinish.style.display = "none"
}

let sucFinishGame = () => {
    successFinish.style.display = "grid";
    clearInterval ( game )
}

let loseFinishGame = () => {
    loseFinish.style.display = "grid";
    finalScore.innerHTML = score;
}
let resetGame = () =>{
    location.reload()

}
reset.addEventListener("click", resetGame)
closeSuccess.addEventListener ( "click", close )

const canvas = document.getElementById ( "snake" );
const ctx = canvas.getContext ( "2d" );// задаём канвасу настройки для 2д игры

// через глобальный класс создаём картинки

const field = new Image ();
field.src = 'field.png';

const apple = new Image ();
apple.src = 'apple.png';

const goldenApple = new Image();
goldenApple.src = 'goldapple.png'

const diamondApple = new Image();
diamondApple.src  = 'diamondapple.png';

let box = 32; // стандартное значение поля

let score = 0; // счёт
// координаты еды

let appleObj = {
    x: Math.floor ( (Math.random () * 17 + 1) ) * box,
    y: Math.floor ( (Math.random () * 15 + 3) ) * box
}

let goldAppleObj = {
    x: Math.floor ( (Math.random () * 17 + 1) ) * box,
    y: Math.floor ( (Math.random () * 15 + 3) ) * box
}

let diamondAppleObj = {
    x: Math.floor ( (Math.random () * 17 + 1) ) * box,
    y: Math.floor ( (Math.random () * 15 + 3) ) * box
}
// координаты головы змейки

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};


let dir; // пемеренная, которая хранит значение клавиши

// функция которая при нажатии на клавишу задаёт направление

let direction = (event) => {
    if ( event.keyCode == 37 && dir != "right" ) {
        dir = 'left'
    }
    else if ( event.keyCode == 38 && dir != "down" ) {
        dir = "up"
    }
    else if ( event.keyCode == 39 && dir != "left" ) {
        dir = "right"
    }
    else if ( event.keyCode == 40 && dir != "up" ) {
        dir = "down"
    }
}

document.addEventListener ( "keydown", direction )

// функция, которая отвечает за то, что когда змейка съедает сама себя - игра завершается

let eatSnake = (head, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if ( head.x === arr[i].x && head.y === arr[i].y ) {
            loseFinishGame();
            clearInterval ( game )
        }
    }
}

// главная функция, которая рисует всю игру

let drawGame = () => {
    ctx.drawImage ( field, 0, 0 ); // отрисовка картинки через канвас
    ctx.drawImage ( apple, appleObj.x, appleObj.y ); // рисуем картинку в рандомном месте, передаём картинку и её координаты, дабы отрисовать
    ctx.drawImage ( goldenApple, goldAppleObj.x, goldAppleObj.y )
    ctx.drawImage(diamondApple, diamondAppleObj.x, diamondAppleObj.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "darkgreen" : "green";
        ctx.fillRect ( snake[i].x, snake[i].y, box, box )
    } // цикл отвечает за то, чтобы только голова была синей, а всё остальное другим цветом

    if ( score > 1000 ) {
        sucFinishGame ();
        clearInterval ( game )
    }

    // стилизация текста
    ctx.fillStyle = "white"; // цвет
    ctx.font = "50px Arial"; // шрифт
    ctx.fillText ( `Счёт: ${score}`, box * 2.5, box * 1.7 ) // расположение текста

    // берём координаты змейки

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // проверяем, если змейк съела еду, то спавним еду в другом месте и увеличиваем счёт на 1

    if ( snakeX === appleObj.x && snakeY === appleObj.y ) {
        score++;
        appleObj = {
            x: Math.floor ( (Math.random () * 17 + 1) ) * box,
            y: Math.floor ( (Math.random () * 15 + 3) ) * box
        }
    }

    else if(snakeX === goldAppleObj.x && snakeY === goldAppleObj.y){
        score += 10;
        goldAppleObj = {
            x: Math.floor ( (Math.random () * 17 + 1) ) * box,
            y: Math.floor ( (Math.random () * 15 + 3) ) * box
        }
    }
    else if(snakeX === diamondAppleObj.x && snakeY === diamondAppleObj.y){
        score += 100;
        diamondAppleObj = {
            x: Math.floor ( (Math.random () * 17 + 1) ) * box,
            y: Math.floor ( (Math.random () * 15 + 3) ) * box
        }
    }
    else {
        snake.pop ();
    }


    // если змейка вне поля, то игра завершается

    if ( snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17 ) {
        clearInterval ( game );
        loseFinishGame();
    }


    // условие для функции direction ( 58 строка )

    switch (dir) {
        case "left":
            snakeX -= box;
            break;
        case "right":
            snakeX += box;
            break;
        case  "up":
            snakeY -= box;
            break;
        case "down":
            snakeY += box;
            break;
    }

    // координаты головы змейки

    let newHead = {
        x: snakeX,
        y: snakeY

    };
    eatSnake ( newHead, snake )
    snake.unshift ( newHead )
}
let game = setInterval ( drawGame, 100 ) // запускаем нашу игру через таймаут, ибо канвас динамичен и поэтому надо задать 100 мс, например.
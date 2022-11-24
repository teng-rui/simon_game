let buttonColors=['green','red','yellow','blue'];
let buttons=document.getElementsByClassName('btn');
let gamePatterns=[];
let userClickedPatterns=[];
let gameStart=false;
let userStart=false;
let level=1;

function buttonAnimation(order){
    // buttons[order].classList.add('pressed');
    // setTimeout(function(){
    //     buttons[order].classList.remove('pressed');
    // },100);
    if (typeof order =='string'){
        $("#" + order).fadeIn(100).fadeOut(100).fadeIn(100);
    }
    else{
        $("#" + buttonColors[order]).fadeIn(100).fadeOut(100).fadeIn(100);
    }
    
}

function makeSound(name){
    let music =new Audio('./sounds/'+name+'.mp3');
    music.play();
}

function showPatterns(order){

    makeSound(buttonColors[gamePatterns[order]]);
    buttonAnimation(gamePatterns[order]);
    order++;
    if (order<gamePatterns.length){
        setTimeout(function(){
            showPatterns(order);
        },300);
    }
    
}


function handleKeyPress(){
    if (gameStart==false){
        gameStart=true;
        startGame();
    }
}

function startGame(){
    $('h1').text('Level '+level);
    userClickedPatterns=[];
    nextSequence();
    showPatterns(0);
    userStart=true;
    level++;

    // console.log(gamePatterns);
}

function gameOver(){

    userClickedPatterns=[];
    gamePatterns=[];
    userStart=false;
    gameStart=false;
    level=1;
    makeSound("wrong");
    $('body').addClass('game-over');
    setTimeout(()=>{$('body').removeClass('game-over');},300);
    $('h1').text('Game Over. Press Any Key To Start.');
    
}

function nextSequence(){
    let randomNumber=Math.floor(Math.random() * 4 ) ;
    gamePatterns.push(randomNumber);
    // makeSound(buttonColors[randomNumber]);

}


function extendAnswer(el){
    if (userStart){
        let userChosenPattern=el.id;
        userClickedPatterns.push(userChosenPattern);
        if (userChosenPattern==buttonColors[gamePatterns[userClickedPatterns.length -1]]){
            buttonAnimation(userChosenPattern);
            makeSound(userChosenPattern);

            if (userClickedPatterns.length==gamePatterns.length){
                userStart=false;
                setTimeout(startGame,1000);
            }
        }

        else{
            userStart=false;
            gameOver();
        }
    }
    
}

for (pattern of buttons){
    pattern.addEventListener('click',function(){extendAnswer(this)})
}

document.addEventListener('keypress',handleKeyPress);




var imagemDaTorre, torre;
var porta, grupoDePortas;
var escalador;
var fantasma, imagemDoFantasma;
var blocoInvisivel, grupoDeBlocosInvisiveis;
var som;
var pontuacao;
const INICIO = 0;
const JOGANDO = 1;
const FIM = 2;
var estado = INICIO;

function preload(){
  imagemDoFantasma = loadImage("ghost-standing.png");
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
}

function setup(){
  createCanvas(600,600);    
  pontuacao = 0;

  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  
  grupoDePortas = new Group();

  fantasma = createSprite(300, 300, 50, 50);
  fantasma.scale = 0.3;
  fantasma.addImage("ghost", imagemDoFantasma);
}


function draw(){
  background('black');
  drawSprites();
  fill('white');
  text("Pontuação: "+pontuacao, 500, 50);
  if(estado == INICIO && keyDown('space')){
    estado = JOGANDO;
  }
  if (estado == INICIO){
    torre.velocityY = 0;
    fill('red');
    textSize(20);
    text("Aperte espaço para iniciar o jogo", 150, 200);
  }
  if (estado == JOGANDO){
    pontuacao = pontuacao + Math.round(getFrameRate()/ 60);
    torre.velocityY = 2;
    if(torre.y > 400){
      torre.y = 300
    }
    
    if(keyDown("left_arrow")){
      fantasma.x = fantasma.x - 3;
    }

    if(keyDown("right_arrow")){
      fantasma.x = fantasma.x + 3;
    }

    if(keyDown("space")){
      fantasma.velocityY = -10;
    }
    
    fantasma.velocityY = fantasma.velocityY + 0.8;
    gerarPortas();
  }
  if (estado == FIM){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 220,300);
  }
}

function gerarPortas(){
  if(frameCount % 300 == 0){
    porta = createSprite(200,-50);
    porta.velocityY = 2;
    porta.addImage(imagemDaPorta);
    
    porta.lifetime = 420;

    grupoDePortas.add(porta);
  }
}
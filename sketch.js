var imagemDaTorre, torre;
var porta, grupoDePortas;
var escalador;
var fantasma, imagemDoFantasma;
var blocoInvisivel, grupoDeBlocosInvisiveis;
var som;
var pontuacao;

function preload(){
  imagemDoFantasma = loadImage("ghost-standing.png");
  imagemDaTorre = loadImage("tower.png");
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
  pontuacao = pontuacao + Math.round(getFrameRate()/ 60);

  gerarPortas();
}

function gerarPortas(){
  if(frameCount % 300 == 0){
    porta = createSprite(200,-50);
    porta.velocityY = 2;

    porta.lifetime = 420;

    grupoDePortas.add(porta);
  }
}
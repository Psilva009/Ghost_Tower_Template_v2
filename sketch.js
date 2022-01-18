var imagemDaTorre, torre;
var porta;
var escalador, imagemDoEscalador, grupoDeEscaladores;
var fantasma;
var blocoInvisivel, grupoDeBlocosInvisiveis;
var som;
var pontuacao;
const INICIO = 0;
const JOGANDO = 1;
const FIM = 2;

var estado = INICIO;

function preload() {
  // carregar som
  imagemDoFantasma = loadImage("ghost-standing.png");
  imagemDaTorre = loadImage("tower.png");
  imagemDoEscalador = loadImage("climber.png");
  // carregar imagem do fantasma
  
}

function setup(){
  createCanvas(600,600);    
  pontuacao = 0;

  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  
  grupoDeEscaladores = new Group();
  grupoDeBlocosInvisiveis = new Group();

  fantasma = createSprite(300, 300, 50, 50);
}


function draw(){
  background('black');
  drawSprites();
  fill('white');
  text("Pontuação: "+pontuacao, 500, 50);
  // criar if para iniciar o jogo
  if (estado == INICIO){
    torre.velocityY = 0;
    fill('red');
    textSize(20);
    text("Aperte espaço para iniciar o jogo", 150, 200);
  }
  if (estado == JOGANDO){
    pontuacao = pontuacao + Math.round(getFrameRate()/ 60);
    // aumentar velocidade da torre
    if(torre.y > 400){
      torre.y = 300
    }
    
    if(keyDown("left_arrow")){
      fantasma.x = fantasma.x - 3;
    }

    if(keyDown("right_arrow")){
      // movimentar fantasma para direita
    }

    if(keyDown("space")){
      fantasma.velocityY = -10;
    }
    
    fantasma.velocityY = fantasma.velocityY + 0.8;
    gerarPortas();

    // if para deixar o fantasma parado na porta

    if(grupoDeBlocosInvisiveis.isTouching(fantasma) || fantasma.y > 600){
      fantasma.destroy();
      torre.destroy();
      grupoDeEscaladores.destroyEach();
      grupoDeBlocosInvisiveis.destroyEach();
      // excluir porta
      estado = FIM;
    }
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
    porta.addImage(imagemDaPorta);
    
    escalador = createSprite(200,10);
    escalador.addImage(imagemDoEscalador);
    
    blocoInvisivel = createSprite(200,25);
    blocoInvisivel.width = escalador.width;
    blocoInvisivel.height = 2;
    blocoInvisivel.visible = false;
    
    // gerar posição aleatória para a porta
    escalador.x = porta.x;
    blocoInvisivel.x = porta.x;
    
    escalador.velocityY = 2;
    porta.velocityY = 2;
    blocoInvisivel.velocityY = 2;
    
    porta.lifetime = 420;
    escalador.lifetime = 420;
    
    fantasma.depth = porta.depth;
    fantasma.depth +=1;
    
    // adicionar porta ao grupo
    grupoDeEscaladores.add(escalador);
    grupoDeBlocosInvisiveis.add(blocoInvisivel);
  }
}
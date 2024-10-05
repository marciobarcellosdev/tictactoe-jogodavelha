var jogador1jogar = false;
var jogador2jogar = false;
var temganhador = false;
var semganhador = false;
var vx = "_";
var matriz = [ [vx,vx,vx],[vx,vx,vx],[vx,vx,vx] ];
var countcheia = 0;

function GetText(cell) {
  if(!semganhador){
    if(!temganhador){
      SetPlayer();
      var tdElem = document.getElementById(cell);
      tdElem.innerHTML = ValidatePlayerText();
      var elementatual = document.getElementById('jogadoratual');
      elementatual.innerHTML = ValidatePlayerTurn();
      var elementlog = document.getElementById('log');
      elementlog.innerHTML += GenerateLog(cell);
      UpdateMatrix(cell, tdElem.innerHTML);
      ValidateEmptyMatrix(countcheia);
      ValidateWin(tdElem.innerHTML);
    }
  }
}

function SetPlayer() {
  if(!jogador1jogar && !jogador2jogar){
    jogador1jogar = true;
  }
  else if(jogador1jogar && !jogador2jogar){
    jogador2jogar = true;
    jogador1jogar = false;
  }
  else if(jogador2jogar && !jogador1jogar){
    jogador1jogar = true;
    jogador2jogar = false;
  }
}

function ValidatePlayerText() {
  if(jogador1jogar && !jogador2jogar) return '<azul>x</azul>';
  else if(jogador2jogar && !jogador1jogar) return '<vermelho>o</vermelho>';
}

function ValidatePlayerTurn() {
  if(jogador2jogar && !jogador1jogar) return '<azul>jogador 1 [X]</azul>';
  else if(jogador1jogar && !jogador2jogar) return '<vermelho>jogador 2 [O]</vermelho>';
}

function EmptyTable() {
  for (var i = 1; i < 10; i++) {
    const tdElem = document.getElementById("celula" + i);
    tdElem.innerHTML = '';
  }
  jogador1jogar = false;
  jogador2jogar = false;
    
  var elementatual = document.getElementById('jogadoratual');
  elementatual.innerHTML = '<azul>jogador 1 [X]</azul>';

  matriz = [ [vx,vx,vx],[vx,vx,vx],[vx,vx,vx] ];
  PrintEmptyMatrix();

  var elementlog = document.getElementById('log');
  elementlog.innerHTML = '';

  var elementatual = document.getElementById('ganhador');
  elementatual.innerHTML = '';

  document.getElementById("btnRestart").disabled = true;
  countcheia = 0;
  temganhador = false;
  semganhador = false;
}

function PrintEmptyMatrix() {
  var elementmatriz = document.getElementById('matriz');
  elementmatriz.innerHTML = '';
  for (var lin = 0; lin < 3; lin++) {
    elementmatriz.innerHTML += '<br>';
    for (var col = 0; col < 3; col++) {
      elementmatriz.innerHTML += matriz[lin][col] + ' ';
    }
  }
  elementmatriz.innerHTML += '<br><br>'; 
}

function GenerateLog(cell) {
  var atual;
  if(jogador2jogar && !jogador1jogar) atual = '<vermelho>jogador 2 [O]</vermelho>';
  else if(jogador1jogar && !jogador2jogar) atual = '<azul>jogador 1 [X]</azul>';
  return '<br>' + atual + ' jogou na ' + cell;
}

function ValidateEmptyMatrix(value) {
  if (value === 9){
    document.getElementById("btnRestart").disabled = false;
    semganhador = true;
  }
}

function UpdateMatrix(cell, value) {
  switch(cell) {
    case 'celula1':
      matriz[0][0] = value;
      countcheia++;
      break;
    case 'celula2':
      matriz[0][1] = value;
      countcheia++;
      break;
    case 'celula3':
      matriz[0][2] = value;
      countcheia++;
      break;
    case 'celula4':
      matriz[1][0] = value;
      countcheia++;
      break;
    case 'celula5':
      matriz[1][1] = value;
      countcheia++;
      break;
    case 'celula6':
      matriz[1][2] = value;
      countcheia++;
      break;
    case 'celula7':
      matriz[2][0] = value;
      countcheia++;
      break;
    case 'celula8':
      matriz[2][1] = value;
      countcheia++;
      break;
    case 'celula9':
      matriz[2][2] = value;
      countcheia++;
      break;
    default:
  }
  PrintEmptyMatrix();
}

function ValidateWin(value) {
  if ((matriz[0][0] === value) &&
      (matriz[0][1] === value) &&
      (matriz[0][2] === value)) {
        temganhador = true;
  }
  if ((matriz[1][0] === value) &&
      (matriz[1][1] === value) &&
      (matriz[1][2] === value)) {
        temganhador = true;
  }
  if ((matriz[2][0] === value) &&
      (matriz[2][1] === value) &&
      (matriz[2][2] === value)) {
        temganhador = true;
  }

  if ((matriz[0][0] === value) &&
      (matriz[1][0] === value) &&
      (matriz[2][0] === value)) {
        temganhador = true;
  }
  if ((matriz[0][1] === value) &&
      (matriz[1][1] === value) &&
      (matriz[2][1] === value)) {
        temganhador = true;
  }
  if ((matriz[0][2] === value) &&
      (matriz[1][2] === value) &&
      (matriz[2][2] === value)) {
        temganhador = true;
  }

  if ((matriz[0][0] === value) &&
      (matriz[1][1] === value) &&
      (matriz[2][2] === value)) {
        temganhador = true;
  }
  if ((matriz[0][2] === value) &&
      (matriz[1][1] === value) &&
      (matriz[2][0] === value)) {
        temganhador = true;
  }
  
  if(temganhador){
    document.getElementById("btnRestart").disabled = false;

    var elementganhador = document.getElementById('ganhador');
    elementganhador.innerHTML = value === '<azul>x</azul>' ? 'jogador 1 venceu' : 'jogador 2 venceu';
  }
}
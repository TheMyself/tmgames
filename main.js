var game;
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {

tabcontent[i].style.display = "none";
}
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
}
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function buyMiner(){
    var minerCost = Math.floor(10 * Math.pow(1.1,miners));
    if(metallonite >= minerCost){
        miners = miners + 1;
    	metallonite = metallonite - minerCost;

    document.getElementById('miners').innerHTML = miners;
        document.getElementById('metallonite').innerHTML = metallonite;
    }
    var nextCost = Math.floor(10 * Math.pow(1.1,miners));
    document.getElementById('minerCost').innerHTML = nextCost;
}

function people(){
  var currentFood = game.food - (game.people * 0.33) + (game.farmer * 0.5);
  game.food = currentFood <= 200 ? currentFood:200;
  currentFood = game.food;
  game.food = currentFood >= 0 ? currentFood:0;
  document.getElementById('food').innerHTML = Math.trunc(game.food);
  var currentWood = game.wood + game.lumberjack;
  game.wood = (currentWood <= 200) ? currentWood:200;
  document.getElementById('wood').innerHTML = game.wood;
}

function buyFarmer(){
  if (game.people>game.farmer && game.occupiedPeople < game.people) {
    game.farmer++;
    document.getElementById('farmer').innerHTML=game.farmer;
    game.occupiedPeople++;
  }
}

function sellFarmer(){
  if (game.farmer>0) {
    game.farmer--;
    document.getElementById('farmer').innerHTML=game.farmer;
    game.occupiedPeople--;
  }
}

function buyLumberjack(){
  if (game.people>game.lumberjack && game.occupiedPeople < game.people) {
    game.lumberjack++;
    document.getElementById('lumberjack').innerHTML=game.lumberjack;
    game.occupiedPeople++;
  }
}

function sellLumberjack(){
  if (game.lumberjack>0) {
    game.lumberjack--;
    document.getElementById('lumberjack').innerHTML=game.lumberjack;
    game.occupiedPeople--;
  }
}

function save(){
  try {
      localStorage.setItem("key",JSON.stringify(game));
  } catch (e) {
    alert("To be able to save your game, please use a modern browser");
  }
}

function check(){
  if (game.food <= 0 && game.people>0) {
    game.people--;
    document.getElementById('people').innerHTML=game.people;
  }else if (game.food > 0 && game.people<game.house * 3) {
    game.people++;
    document.getElementById('people').innerHTML=game.people;
  }
}

function load() {
    var data = JSON.parse(localStorage.getItem("key"));
    if (!data) {
      game = {
      metallonite : 0,
      food : 200,
      warehouse : 1,
      house : 1,
      people : 3,
      farmer : 0,
      wood : 0,
      lumberjack : 0,
      occupiedPeople : 0
      };
    }else game = data;
    openTab(event, 'Metallonite');
    people();
    initialize();
}

function initialize(){
  document.getElementById('people').innerHTML = game.people;
  document.getElementById('farmer').innerHTML = game.farmer;
  document.getElementById('lumberjack').innerHTML = game.lumberjack;
}

function deleteSave() {
    localStorage.removeItem("key");
}

window.setInterval(function(){
    people();
}, 1000);

window.setInterval(function(){
    check();
}, 12000);

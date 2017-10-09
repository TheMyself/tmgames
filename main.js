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
  var currentFood = game.food - game.people * 0.33;
  game.food = (currentFood >= 0) ? currentFood:0;
  document.getElementById('food').innerHTML = Math.trunc(game.food);

}

function save(){
  try {
      localStorage.setItem("key",JSON.stringify(game));
  } catch (e) {
    alert("To be able to save your game, please use a modern browser");
  }
}

function check(){
  if (game.food <= 0.11 && game.people>0) {
    game.people--;
  }else if (game.food > 0.11 && game.peopl<game.house * 3) {
    game.people++;
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
      people : 3
      };
    }else game = data;
    openTab(event, 'Metallonite');
    people();
    document.getElementById('people').innerHTML = game.people;
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

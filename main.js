var metallonite = 0;
var food= 200;
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
function metalloniteClick(number){
    metallonite = metallonite + number;
    document.getElementById("metallonite").innerHTML = metallonite;
};

var miners = 0;

function buyMiner(){
    var minerCost = Math.floor(10 * Math.pow(1.1,miners));
    if(metallonite >= minerCost){               
        miners = miners + 1;                          
    	metallonite = metallonite - minerCost;    
                    
    document.getElementById('miners').innerHTML = miners;
        document.getElementById('metallonite').innerHTML = metallonite;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,miners));      
    document.getElementById('minerCost').innerHTML = nextCost;
};

function pFoodConsume(){
food = food - document.getElementById('pAmount').innerHTML * 0.3;
document.getElementById('fAmount').innerHTML = Math.trunc(food);
}

var save = {
metallonite: metallonite,
food: food
}

function save() {
localStorage.setItem("save",JSON.stringify(save));
}

function load() {
  var savegame = JSON.parse(localStorage.getItem("save"));
  if (typeof savegame.food !== "undefined") food = savegame.food;
}

window.setInterval(function(){
    metalloniteClick(miners);
    pFoodConsume();
}, 1000);

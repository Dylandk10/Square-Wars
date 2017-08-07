/*
MUST USE CONSOLE TO SEE HITPOINTS AND ATTACK FUNCTIONS!!!

THINGS TO NOTE THE RED SQUARE IS THE PLAYER, THE BLUE SQUARE IS THE NPC OR ENEMY.
MOVING THE SQUARE TO THE ENEMY OR ENEMY COMING TO YOU STARTS COMBAT.
THIS GAME IS STRICKLY USED FOR PROGRAMMING PRACTICE, AND I MADE THE GAME BASIC AND EASY USING ONLY
TWO OBJECTS PLAYER AND ENEMY OR xyy(PLAYER) && enemy(ENEMY) AS OBJECTS. THIS PROGRAM HAS 3 MAIN FEATURES
ATTACK FUNCTION USING THE CONSOLE TO SEE WHAT YOU HIT/WHAT HIT YOU, EAT FUNCTION TO REGENERATE HEALTH AND
FIRE FUNCTION TO SHOOT AT THE ENEMY BEFORE YOU START COMBAT. !!! THIS GAME IS STILL SUPER BUGGY BUT ITS ONLY RHE BEGINING FEEL
FREE TO HELP OUT !!!

-----NEXT UPDATE----
-MAKE MORE ENEMYS AS ROUNDS PROGRESS
-MAKE STRONGER BOSSES AND ROUNDS PROGRESS
-ADD A PICKUP FOOD METHOD TO GATHER MORE FOOD AT THE END OF EACH ROUND OR KILLING CERTAIN AMOUNT OF PLAYERS

MADE BY -K377Y-

*/

let xyy, enemys, fire;
let randomY = Math.floor(Math.random() * 320);
let randomY1 = Math.floor(Math.random() * 320);
let randomNum = Math.floor(Math.random() * 70);
function startGame() {
    myGameArea.start();
    xyy = new Player("xyy", 50, 7, 10, 30, 30, 50, 268, "red", 1);
    enemys = [new Enemy("Goblin", 50, 7, 2, 30, 30, 370, randomY, "blue"),new Enemy("Goblin", 50, 7, 2, 30, 30, 370, randomY1, "blue"), new Enemy("Goblin", 50, 7, 2, 30, 30, 370, randomY1 + randomNum, "blue")];
    fire = new Fire(10, 6, xyy.x, xyy.y, "black");
}

// CREATE CANVAS AND KEY CODES
let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 320;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
        window.addEventListener("keydown", function(e){
            myGameArea.key = e.keyCode;
        })
        window.addEventListener("keyup", function(e){
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//enemy to make visible
let Enemy = function(name, hitPoints, maxHit, defense, width, height, x, y, color, dead, level) {
    this.gamearea = myGameArea;
    this.name = name;
    this.hitPoints = hitPoints;
    this.maxHit = maxHit;
    this.defense = defense;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color;
    this.dead = false;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.death = function() {
        this.x = 5000;
        this.y = 5000;
        this.dead = true;
    }

    this.level = function() {
        return this.hitPoints + this.maxHit + this.defense;
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

enemys = [new Enemy("Goblin", 50, 7, 2, 30, 30, 370, randomY, "blue"),new Enemy("Goblin", 50, 7, 2, 30, 30, 370, randomY, "blue")];
// TEST NPC FOR GAME
let npc = [{
    name: "ogre",
    hitPoints: 20,
    maxHit: 5,
    defense: 2,
    level: function(){
        return this.hitPoints + this.maxHit + this.defense; 
}
    },
    {
    name: "Goblin",
    hitPoints: 30,
    maxHit: 10,
    defense: 5
    }
];

// CREATING PLAYERS FOR GAME
let Player = function(name, hitPoints, maxHit, defense, width, height, x, y, color, special, level) {
    this.gamearea = myGameArea;
    this.name = name;
    this.hitPoints = hitPoints;
    this.maxHit = maxHit;
    this.defense = defense;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.special = special;
    this.level = function() {
        return this.hitpoints + this.maxHit + this.defense; 
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.death = function() {
        this.x = 50000;
        this.y = 50000;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
};

// TEST PLAYER FOR TRIAL
let xxx = new Player("xxx", 50, 10, 10, 30, 30, 50, 50, "red", 1);
let xyz = new Player("xyz", 50, 5, 5);

//  FIRE AKA THE BULLET THE PLAY SHOOTS --------------   on fire/shoot bullet follows player?!?!?!?!?
let Fire = function(width, height, x, y, color, shoot) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color;
    shoot = false;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x = xyy.x;
        this.y = xyy.y;
        if(shoot === true) {
            this.shoot();
        }
    }
    this.shoot = function() {
        shoot = true;
        this.speedX += 2;
        this.x += this.speedX;
        this.y = y;
        if(this.x >= 600)
        spawnFire();
        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    
};

// TO MOVE FUNCTION 
function updateGameArea(){
    for(var i = 0; i < enemys.length; i+= 1) {
    if(fire.crashWith(enemys[i])){
        enemys[i].hitPoints = enemys[i].hitPoints - 20;
        console.log("YOU HIT THE ENEMY!" + enemys[i].hitPoints);
    }
    if (xyy.crashWith(enemys[i])) {
        attack(xyy, enemys[i]);
    } 
    //  if enemy has 0 hp enemy dies... removes him from screen...
    if(enemys[i].hitPoints <= 0) {
        enemys[i].death();
        enemys[i].update();
        spawnEnemy();
    }
    // IF PLAYER DIES REMOVE FROM SCREEN...
    if(xyy.hitPoints <= 0) {
        xyy.death();
        xyy.update();
    } else {
    myGameArea.clear();
    xyy.speedX = 0;
    xyy.speedY = 0;
    enemys[i].speedX = - 0.5;
    enemys[i].speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {xyy.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {xyy.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 32) {fire.shoot();}
    if (myGameArea.key && myGameArea.key == 38) {xyy.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {xyy.speedY = 1; }
    xyy.newPos();    
    xyy.update();
    enemys[i].newPos();
    enemys[i].update();
        // FIRE AKA BULLET
        fire.newPos();
        fire.update();
    }
    }
    document.getElementById("playerX").value = xyy.x;
    document.getElementById("playerHealth").value = xyy.hitPoints;
}

// attack function
function attack(player, npc) {
    if(npc.hitPoints !== 0) {
        for(var i = npc.hitPoints; i > 0; i--) {
            // FORMULA IS PLAYER OR NPC MAXHIT - HALF OF DEFNSE OF DEFENDER....
            let hit = Math.floor(Math.random() * player.maxHit - (npc.defense / (1/2)));
            if(hit < 0){
                hit = 0;
            }
            let hitAgainst = Math.floor(Math.random() * npc.maxHit - (player.defense / (1/2)));
            if(hitAgainst < 0){
                hitAgainst = 0;
            }
            npc.hitPoints = npc.hitPoints - hit;
            console.log("you hit a " + hit)
            console.log(npc.name + " has " + npc.hitPoints + " Left.")
            player.hitPoints = player.hitPoints - hitAgainst;
            if(hitAgainst === 0) {
                console.log("you manage to block the attack.")
                player.maxHit += 1;
                console.log(player.name + " has advance a maxHit level: " + player.name + " level is now... " + player.maxHit);
            } else {
                console.log(player.name + " has been hit, you have " + player.hitPoints + " hitpoints left.")
            } if (npc.hitPoints <= 0) {
                return console.log(player.name + " has killed " + npc.name);
                player.spcial = 1;
            } if (player.hitPoints <= 0) {
                return console.log(player.name + " HAS DIED!!!!");
            }
        }
    }
}

//attack(xxx, npc[0]);
//attack(xyz, npc[1]);



// EAT FUNCTION GUNNA TRY AND WORK DIFFRENT FOOD IN
function eat(player) {
    let steak = 10;
    let steakCount = 5;
    if(steakCount !== 0) {
        steakCount = steakCount - 1;
        player.hitPoints = player.hitPoints + steak;
        console.log(xyy.name + " has eaten and now has " + xyy.hitPoints + " hitpoints left");
    } else {
        console.log("Your Out of Food!");
    }
        document.getElementById("eatCount").value = steakCount;
}


// SPECIAL ATTACK FUNCTION FORMULA == RANDOM NUMBER UPTO MAXHIT + 10
function specialAttack(player, npc) {
    if(player.special !== 0) {
        let hit = Math.floor(Math.random() * maxHit) + 10;
        player.special = 0;
        if(player.special === 0) {
            console.log("You dont have enough power to use your special attack");
        }
    }
}

function spawnEnemy() {
    let randomY = Math.floor(Math.random() * 320);
    let randomY1 = Math.floor(Math.random() * 320);
    let randomNum = Math.floor(Math.random() * 70);
    let round = 0;
    enemys = [new Enemy("Goblin", 50, 7, 2, 30, 30, 370, randomY, "blue"),new Enemy("Goblin", 50, 7, 2, 30, 30, 370, randomY1, "blue")];
    round++;
    if(round == 0) {
        enemys.push(new Enemy("Goblin", 50, 7, 2, 30, 30, 370 - 30, randomY + randomNum, "blue"));
        round++;
    }
    if(round !== 0) {
        enemys.push(new Enemy("Goblin", 50, 7, 2, 30, 30, 370 - 50, randomY + randomNum + 40, "blue"))
        round++;
    }
}

function spawnFire() {
    fire = new Fire(10, 6, xyy.x, xyy.y, "black");  
}

// EVENT LISTENERS
document.getElementById("eatBtn").addEventListener("click", eat);




















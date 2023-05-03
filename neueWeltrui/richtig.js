parseInt(localStorage.getItem("hp-spieler-1"))
parseInt(localStorage.getItem("hp-spieler-2"))

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const canvasStyles = getComputedStyle(canvas);

const canvasWidth = parseInt(canvasStyles.width, 10);
const canvasHeight = parseInt(canvasStyles.height, 10);

c.clearRect(0, 0, canvasWidth, canvasHeight);

const gravity = 0.9

class Box {                         //creating a class called Box
    constructor({position, velocity, color = "red", offset}){          //function called constructor is called when creating a box object "{}" in velocity and position makes that the order doesn't matter
        this.position = position  
        this.velocity = velocity 
        this.width = 30
        this.height = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            }, 
            offset, 
            width: 50,
            height: 20,
          };
        this.color = color
        this.isAttacking 
        this.health = 100
    }

    draw(){                         //draw function, where c.fillRect draws the box on canvas
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        const img = document.querySelector("#character")

        c.drawImage(
            img,
            this.col * this.tileSize, this.row * this.tileSize, this.tileSize, this.tileSize,
            this.x, this.y, this.tileSize, this.tileSize
          )
        


        //attackBoxzz
        if(this.isAttacking){
        c.fillStyle = "green"
        c.fillRect(
        this.attackBox.position.x, 
        this.attackBox.position.y, 
        this.attackBox.width, 
        this.attackBox.height);
        }


    }

    update (){                     //function for moving objects
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x,
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y,


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y        // same as this.position.y = this.position.y + 10
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0                  // prevent box falling down past canvas by comparing the current y position + height and velocity with canvas height
        } else this.velocity.y += gravity       // if object has not reached bottom of canvas -> gravity increased by 0.2                                                      
    }

    attack() {                                //creat-ng attack function
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

}








const player = new Box({
    position: {           // new box object with the name player and position (0,0)
    x: 10,
    y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y:0
    },
    

    

    }
)



const enemy = new Box({
    position: {           
    x: 40,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "blue",
    offset: {
        x: -20,
        y: 0,
    }, 
})      





const keys = {                              //defines object calls "keys" 
    a: {
        pressed: false                      // property a has property if pressed => false aswell as d
    },

    d: {
        pressed: false
    },

    w: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    }
}


let lastKey                                 // making sure that the last key, which is pressed, guides the direction




function rectangularCollision({rectangle1, rectangle2}){
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
      && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
      && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
      && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
}

function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector("#displayText").style.display = "flex"
    if(player.health === enemy.health){
        document.querySelector("#displayText").innerHTML = "Tie"
        window.location = "/game.html"
    } else if(player.health > enemy.health){
        document.querySelector("#displayText").innerHTML = "Player 1 Wins"
        window.location = "/game.html"
    } else if(player.health < enemy.health){
        document.querySelector("#displayText").innerHTML = "Player 2 Wins"
        window.location = "/game.html"

    }

}


let timer = 60
let timerId 
function decreaseTimer(){
    if(timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000) //infinite loop for the timer
        timer--
        document.querySelector("#timer").innerHTML = timer
    }

    if(timer ===0){
        determineWinner({player, enemy, timerId})

}

}
    
decreaseTimer()

function animate(){                         //create animate function
    window.requestAnimationFrame(animate)   //requests the animate function 
    //c.fillStyle = "black"
    c.clearRect(0, 0, canvasWidth, canvasHeight)
    player.update()                         //after deleting enemy.draw() and for player i use update because draw function is contained
    enemy.update()
    console.log("hallo")                    //"hallo" appears in console

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement

    if(keys.a.pressed && player.lastKey === "a"){                     // if key a is pressed, velocity = -1
        player.velocity.x = -4
    } else if (keys.d.pressed && player.lastKey=== "d"){
        player.velocity.x = 4              //same for d but 1
    }

    //enemy movement

    if(keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft"){                     
        enemy.velocity.x = -4
    } else if (keys.ArrowRight.pressed && enemy.lastKey=== "ArrowRight"){
        enemy.velocity.x = 4             
    }


    //detect for collision
    if(
       rectangularCollision({
           rectangle1: player,
           rectangle2: enemy
       }) &&
        player.isAttacking) {
            player.isAttacking = false
            enemy.health -= 10 //for each time we hit our enemy we subtract 10 hit points
            document.querySelector("#enemyHealth").style.width = enemy.health + "%"; //set health bar equal to the new percentage of health
        }
        
    
    if(
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
         enemy.isAttacking){
             enemy.isAttacking = false
             player.health -= 10 //for each time we hit our enemy we subtract 10 hit points
             document.querySelector("#playerHealth").style.width = player.health + "%"; //set health bar equal to the new percentage of health
      }

     //end game based on health
     if(enemy.health <= 0 || player.health <= 0){
        console.log("game over")
        determineWinner({player, enemy, timerId})   
         
     }
    }


animate()                                   //starts the animation loop

window.addEventListener('keydown', (event) => { // pressing any key and allowing me to see data properties
    switch(event.key){
        case "d" :                              // if the key i press is equal to d                
        keys.d.pressed = true                     // then velocity is set to one
        player.lastKey = "d"
        break
        
        case "a" :                              // when a is pressed, player moves left because of -1                    
        keys.a.pressed = true
        player.lastKey ="a"                 
        break

        case "w" :                                               
        player.velocity.y = -10             //jumping function: player is set to negative ten -> gravitiy pulls player down to bottom of canvas            
        break

        case " ":
        player.attack()
        break


        //KEYS FOR ENEMY (PLAYER 2) :)

        case "ArrowRight" :                                             
        keys.ArrowRight.pressed = true                     
        enemy.lastKey = "ArrowRight"
        break
        
        case "ArrowLeft" :                                                 
        keys.ArrowLeft.pressed = true
        enemy.lastKey ="ArrowLeft"                 
        break

        case "ArrowUp" :                                               
        enemy.velocity.y = -10            
        break

        case "ArrowDown" :                                               
        enemy.isAttacking = true        
        break
    }
  });


  window.addEventListener('keyup', (event) => { 
    switch(event.key){
        case "d" :                                              
        keys.d.pressed = false                  // if i do not press key "d", velocity = 0
        break    
        
        case "a" :                                              
        keys.a.pressed = false                 
        break
        
        case "w" :                                              
        keys.a.pressed = false                 
        break
        
        //ENEMY KEYS :) (PLAYER 2)

        case "ArrowRight" :                                              
        keys.ArrowRight.pressed = false                  
        break    
        
        case "ArrowLeft" :                                              
        keys.ArrowLeft.pressed = false                 
        break
        
        case "ArrowUp" :                                              
        keys.ArrowUp.pressed = false                 
        break                                  
    }
  });


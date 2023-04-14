const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const canvasStyles = getComputedStyle(canvas);

const canvasWidth = parseInt(canvasStyles.width, 10);
const canvasHeight = parseInt(canvasStyles.height, 10);

c.fillRect(0, 0, canvasWidth, canvasHeight);

const gravity = 0.9

class Box {                         //creating a class called Box
    constructor({position, velocity}){          //function called constructor is called when creating a box object "{}" in velocity and position makes that the order doesn't matter
        this.position = position  
        this.velocity = velocity 
        this.height = 50
        this.lastKey
    }

    draw(){                         //draw function, where c.fillRect draws the box on canvas
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 30, this.height);
    }

    update (){                     //function for moving objects
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y        // same as this.position.y = this.position.y + 10
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0                  // prevent box falling down past canvas by comparing the current y position + height and velocity with canvas height
        } else this.velocity.y += gravity       // if object has not reached bottom of canvas -> gravity increased by 0.2                                                      
    }
}





const player = new Box({
    position: {           // new box object with the name player and position (0,0)
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
})



const enemy = new Box({
    position: {           
    x: 40,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})      



console.log (player)

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


function animate(){                         //create animate function
    window.requestAnimationFrame(animate)   //requests the animate function 
    c.fillStyle = "black"
    c.fillRect(0, 0, canvasWidth, canvasHeight)
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
}

animate()                                   //starts the animation loop

window.addEventListener('keydown', (event) => { // pressing any key and allowing me to see data properties
    console.log(event)
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
    }
    console.log(event.key);
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
    console.log(event.key);
  });
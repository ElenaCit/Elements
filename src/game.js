import Map from "./map.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"
import TileRegistry from "./tile_registry.js"
import EventHandler from "./event_handler.js"
import { Player2 } from "./game_objects.js"


/**
 * Diese Klasse enthält die globalen Variablen für das Spiel,
 * sowie das GameLoop, welches das Spiel zeichnen soll.
 */
export default class Game {

  static map = null;
  static player = null;
  static player2 = null;
  static running = false;
  static currentFrame = 0;
  static player1InGoal = false
  static player2InGoal = false

  constructor() {
    this.tileSize = 40
    this.canvas = document.querySelector("#canvas")
    this.canvas.width =  32* this.tileSize
    this.canvas.height = 20 * this.tileSize
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false

    new EventHandler()

    Game.loadMap("maps/map-richtig.txt")

    this.camera = new Camera(this)

    Game.running = false
    window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  /**
   * Startet das Spiel.
   * 
   * Das Spiel wird gestartet indem die Animationsschleife
   * des Spiels aufgerufen wird.
   */
  static start() {
    Game.running = true
  }

  /**
   * Pausiert das Spiel.
   * 
   * Die Animationsschleife des Spiels wird unterbrochen,
   * dadurch wird das Spiel pausiert.
   * 
   * Um das Spiel weiterlaufen zu lassen, muss die Methode 
   * `start()` aufgerufen werden.
   */
  static pause() {
    Game.running = false
  }

  static loadMap(mapfile) {
      TileRegistry.clear()
      CollisionDetector.clear()
      Game.player = null
      Game.map = new Map(mapfile)

      
  }

  /**
   * Berechnet jeweils das nächste Frame für das Spiel.
   * Die Positionen der Spiel-Objekte werden neu berechnet,
   * die Kamera wird korrekt ausgerichtet und die 
   * Spiel-Objekte werden neu gezeichnet.
   */
  gameLoop() {

    Game.currentFrame++
    
    this.camera.clearScreen()
    this.camera.nextFrame()

    EventHandler.handleAllEvents()

    TileRegistry.updateAllTiles()
    CollisionDetector.checkCollision("all")

    //this.camera.centerObject(Game.player)

    TileRegistry.drawAllTiles(this.ctx)

    if (Game.running === true) {
      window.requestAnimationFrame(this.gameLoop.bind(this))
    }
  }
}


function respawn() {
  Game.player = respawnPosition.x;
  Game.player2 = respawnPosition.y;


  Game.player.health = max_health;
  Game.player2.health = max_health;
}

function checkPlayerStatus() {
  if (Game.player.isDead || Game.player.isOut) {
      respawn();
  }
}

function checkPlayerStatus2() {
  if (Game.player2.isDead || Game.player2.isOut) {
      respawn();
  }
}

setInterval(checkPlayerStatus, 1000);



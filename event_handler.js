export default class EventHandler {
  constructor() {
    this.events = new Set()
    // Setup Eventlisteners
    window.onkeydown = (ev) => {this.events.add(ev.code)}
    window.onkeyup = (ev) => {this.events.delete(ev.code)}
  }
}


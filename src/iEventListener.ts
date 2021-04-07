interface iEventListener {
   keyUp(ev: KeyboardEvent) : void,
   keyDown(ev: KeyboardEvent): void,
   bindEvents() : void,
}

export default iEventListener;
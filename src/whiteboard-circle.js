class WhiteboardCircle  extends WhiteboardCommonShape {
  constructor(name) {
    super(name);
    this.name = name;
  }

  mouseDown(pointer, whiteboard, event) {
    this.innerMouseDown(pointer, whiteboard, event);
    if (!event.e.isTrusted) return;
    this.sendMouseDownData(pointer);
  }

  innerMouseDown(pointer, whiteboard) {
    this.mousedown = true;
    this.startLeft = pointer.x;
    this.startTop = pointer.y;
    this.coreObj.left = this.startLeft;
    this.coreObj.top = this.startTop;
    this.coreObj.rx = pointer.x - this.startLet;
    this.coreObj.ry = pointer.y - this.startTop;
    this.coreObj.angle = 0;

    this[this.name] = new fabric.Ellipse(this.coreObj); // add object
    whiteboard.canvas.add(this[this.name]);
  }

  mouseMove(pointer, whiteboard) {
    this.sendMouseMoveData(pointer);
    this.innerMouseMove(pointer, whiteboard);
  }

  innerMouseMove(pointer, whiteboard) {
    let rx = Math.abs(this.startLeft - pointer.x) / 2;
    let ry = Math.abs(this.startTop - pointer.y) / 2;
    if (rx > this.circle.strokeWidth) {
      rx -= this.circle.strokeWidth / 2;
    }

    if (ry > this.circle.strokeWidth) {
      ry -= this.circle.strokeWidth / 2
    }

    this.circle.set({ rx: rx, ry: ry});
    
    if(this.startLeft > pointer.x){
        this.circle.set({originX: 'right' });
    } else {
        this.circle.set({originX: 'left' });
    }
    if(this.startTop > pointer.y){
        this.circle.set({originY: 'bottom'  });
    } else {
        this.circle.set({originY: 'top'  });
    }
    whiteboard.canvas.renderAll();
  }
}
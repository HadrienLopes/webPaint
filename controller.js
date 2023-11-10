var editingMode = { text: 0, rect: 1, line: 2, circle: 3, ellipse: 4 }; //TODO inverser

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.circle;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 1;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById('butText').onclick = (_) => this.currEditingMode = editingMode.text
	document.getElementById('butRect').onclick = (_) => this.currEditingMode = editingMode.rect
	document.getElementById('butLine').onclick = (_) => this.currEditingMode = editingMode.line
	document.getElementById('butCircle').onclick = (_) => this.currEditingMode = editingMode.circle
	document.getElementById('butEllipse').onclick = (_) => this.currEditingMode = editingMode.ellipse
	document.getElementById('spinnerWidth').onchange = (e) => this.currLineWidth = e.target.value
	document.getElementById('colour').onchange = (e) => this.currColour = e.target.value
	new DnD(canvas, this);


	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(dnd){
		this.currentShape = new Shape();
	}.bind(this);

	this.onInteractionUpdate = function(dnd){
		if (this.currEditingMode === editingMode.text) {
			this.currentShape = new Text(dnd.initX, dnd.initY, dnd.text, this.currLineWidth, this.currColour);
		} else if (this.currEditingMode === editingMode.rect) {
			this.currentShape = new Rectangle(dnd.initX, dnd.initY, this.currLineWidth, this.currColour, dnd.finalY - dnd.initY, dnd.finalX - dnd.initX);
		} else if (this.currEditingMode === editingMode.line) {
			this.currentShape = new Line(dnd.initX, dnd.initY, this.currLineWidth, this.currColour, dnd.finalX, dnd.finalY);
		} else if (this.currEditingMode === editingMode.circle) {
			this.currentShape = new Circle(dnd.initX, dnd.initY, dnd.finalX, dnd.finalY, this.currLineWidth, this.currColour);
		} else if (this.currEditingMode === editingMode.ellipse) {
			this.currentShape = new Ellipse(dnd.initX, dnd.initY, dnd.finalX, dnd.finalY, this.currLineWidth, this.currColour);
		}
		drawing.paint(ctx, canvas);
		this.currentShape.paint(ctx);
	}.bind(this);

	this.onInteractionEnd = function(dnd){
		var uuid = generateUUID();
		drawing.shapeArray.set(uuid, this.currentShape);
		drawing.paint(ctx, canvas);
		console.log(dnd.initX);
		updateShapeList(uuid, this.currentShape, dnd.initX, dnd.initY)
		document.getElementById("remove" + uuid).onclick = (event) => remove(drawing, event.currentTarget.id.substring(6), ctx, canvas)
	}.bind(this);
};

function remove(drawing, index, ctx, canvas) {
	drawing.shapeArray.delete(index)
	document.getElementById('liRemove' + index).remove()
	drawing.paint(ctx, canvas)
}

function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
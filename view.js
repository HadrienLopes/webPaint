// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Ellipse.prototype.paint = function (ctx) {
	ctx.strokeStyle = this.color
	ctx.lineWidth = this.thickness

	ctx.strokeStyle = this.color
	ctx.lineWidth = this.thickness
	ctx.beginPath();
	ctx.ellipse(this.startX, this.startY, this.endX, this.endY, 0, 0, 2 * Math.PI);
	ctx.stroke();
}

Circle.prototype.paint = function(ctx) {
	ctx.strokeStyle = this.color
	ctx.lineWidth = this.thickness
	ctx.beginPath();
	ctx.arc(this.startX, this.startY, Math.abs(this.startX - this.endX), 0, 2 * Math.PI);
	ctx.stroke();
};

Rectangle.prototype.paint = function(ctx) {
	ctx.strokeStyle = this.color
	ctx.lineWidth = this.thickness
	ctx.strokeRect(this.startX, this.startY, this.width, this.height)
};

Text.prototype.paint = function(ctx) {
	ctx.font = this.thickness.toString()+'pt Calibri';
	ctx.fillStyle = this.color;
	ctx.fillText(this.text, this.startX, this.startY);
	ctx.stroke();
};

Line.prototype.paint = function(ctx) {
	ctx.strokeStyle = this.color
	ctx.lineWidth = this.thickness
	ctx.beginPath();
	ctx.moveTo(this.startX, this.startY)
	ctx.lineTo(this.endX, this.endY)
	ctx.stroke();
};

Drawing.prototype.paint = function(ctx, canvas) {
	ctx.fillStyle = '#F0F0F0';
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	this.shapeArray.forEach(element => element.paint(ctx))
};

function updateShapeList(index, shape, startX, startY) {
	document.getElementById('shapeList').insertAdjacentHTML('beforeend', toDom(shape, index, startX, startY))
}

function toDom(shape, index, startX, startY) {
	startX = startX.toFixed(0);
	startY = startY.toFixed(0);
	if (shape && typeof shape === 'object') {
		let innerHTML = `<li id="liRemove${index}">`
		if (shape.constructor === Rectangle)
			innerHTML += `<span style="color:' + shape.color + '"></span> Rectangle [${startX};${startY}]`
		else if (shape.constructor === Line)
			innerHTML += `<span style="color:' + shape.color + '"></span> Line [${startX};${startY}]`
		else if (shape.constructor === Circle)
			innerHTML += `<span style="color:' + shape.color + '"></span> Circle [${startX};${startY}]`
		else if (shape.constructor === Ellipse)
			innerHTML += `<span style="color:' + shape.color + '"></span> Ellipse [${startX};${startY}]`
		else if (shape.constructor === Text)
			innerHTML += `<span style="color:' + shape.color + '"></span> Text [${startX};${startY}]`
		innerHTML += `
		<button type="button" class="btn btn-default remove" id="remove${index}">
			<span class="glyphicon glyphicon-remove-sign"></span>
		</button>
		`
		return innerHTML + `</li>`
	}
}
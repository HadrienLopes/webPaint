// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  this.firstX = 0;
  this.firstY = 0;
  this.initX = 0
  this.initY = 0;
  this.finalX = 0;
  this.finalY = 0;
  this.pressed = false;
  this.interactor = interactor;
  this.text;

	// Developper les 3 fonctions gérant les événements
  this.maFctGerantLaPression = function(evt) {
    var pos = getMousePosition(canvas, evt);
    this.initX = pos.x;
    this.initY = pos.y;
    this.firstX = pos.x;
    this.firstY = pos.y;
    this.pressed = true;
    this.interactor.onInteractionStart(this);
    this.text = document.getElementById("drawText").value;
  }.bind(this);
  
  this.maFctGerantLeDeplacement = function (evt) {
    if (this.pressed) {
      var pos = getMousePosition(canvas, evt);
      this.finalX = pos.x;
      this.finalY = pos.y;
      this.interactor.onInteractionUpdate(this);
    }
  }.bind(this);

  this.maFctGerantLeRelachement = function(evt) {
    var pos = getMousePosition(canvas, evt);
    this.finalX = pos.x;
    this.finalY = pos.y;
    this.pressed = false;
    if (this.firstX == this.finalX && this.firstY == this.finalY)
      return ;
    this.interactor.onInteractionEnd(this);
  }.bind(this);
	
  // Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.maFctGerantLaPression, false);
  canvas.addEventListener('mousemove', this.maFctGerantLeDeplacement, false);
  canvas.addEventListener('mouseup', this.maFctGerantLeRelachement, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

function hide() {
  var x = document.getElementById("shapeList");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};
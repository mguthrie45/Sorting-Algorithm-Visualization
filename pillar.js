function Pillar(width, color, value) {
	this.width = width;
	this.color = color;
	this.value = value;

	this.draw = function(canv, x) {
		canv.fillStyle = this.color;
		canv.fillRect(x, HEIGHT-this.value, this.width, this.value);
	}
}

function map(array, canv) {
	for (i in array) {
		array[i].draw(canv);
	}
}

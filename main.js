var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BUFFER = 2;

var size_form = document.getElementById("size-input");
var size = size_form.value;
var speed_form = document.getElementById("speed-input");
var rel_fps_mult = size / 90;
var bin_width = get_bin_width(); //WIDTH = SIZE*BUFFER + SIZE*bin_width

var list = new List();
var current_list;
list.init();

reset_data();
init();

function init() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	list.map_pillars(ctx);
}

function reset_data() {
	list.clear();
	list.n = size;
	change_speed();
	bin_width = get_bin_width();
	list.init();
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	list.map_pillars(ctx);
}

function get_bin_width() {
	return canvas.width / size - BUFFER;
}

function next_state(i, array, fps) {
	setTimeout(function(){
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		current_list = array[i];
		current_list.map_pillars(ctx);
	}, (1000/fps)*i);
}

function animate(array, fps, reverse) {
	for (var i = 0; i < array.length; i++) {
		if (reverse) {
			array.reverse();
		}
		next_state(i, array, fps);
	}
}

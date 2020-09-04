var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");

var WIDTH = canvas.width
var HEIGHT = canvas.height

var size_form = document.getElementById("input");
var SIZE = size_form.value;
var rel_fps_mult = SIZE/90; 
var BUFFER = 2;
function get_bin_width() {
	return WIDTH/SIZE-BUFFER;
}
var bin_width = get_bin_width(); //WIDTH = SIZE*BUFFER + SIZE*bin_width

function SortButton(text, x, y) {
	this.x = x;
	this.y = y;
	this.width = 120;
	this.height = 50;
	this.color = "white";
	this.outline_color = "cornflowerBlue"
	this.text = text;

	this.draw = function(canv) {
		canv.fillStyle = this.outline_color;
		canv.rect(this.x, this.y, this.width, this.height);
		canv.stroke();

		canv.font = "15px Arial";
		canv.fillText(this.text, this.x, this.y);
	}

	this.execute_sort = function(canv, list_obj) {
		if (this.text === "Select") {
			list_obj.selec_sort(list_obj.array, 0, canv);
		}
		else if (this.text === "Bubble") {
			list_obj.bubble_sort(list_obj.array);
		}
	}
}

function Pillar(width, color) {
	this.width = width;
	this.color = color;
	this.value = Math.floor(Math.random()*HEIGHT);

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

function List() {
	this.n = SIZE;
	this.array = [];
	this.x_values;
	this.sorted = false;

	this.clear = function() {
		this.array = [];
		this.x_values = undefined;
		this.sorted = false;
	}

	this.init = function() {
		for (var i = 0; i < this.n; i++) {
			var pillar = new Pillar(bin_width, "cornflowerBlue");
			this.array.push(pillar);
		}
	}

	this.map_pillars = function(canv) {
		for (i in this.array) {
			var x = i*(bin_width+BUFFER);
			this.array[i].draw(canv, x);
		}
	}

	this.selec_sort = function(array, i, canv) {
		var anim_array = [];
		function minIndex(array, start, end) {
			if (start >= end) {
				return start;
			}
			var k = minIndex(array, start+1, end);
			if (array[k].value <= array[start].value) {
				return k;
			}
			else {
				return start;
			}
		}
		function recursiveSort(array, i, canv) {
			var N = array.length;
			if (i == N) {
				return -1;
			}
			else {
				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);

				var min_i = minIndex(array, i, N-1);
				array[min_i].color = "cornflowerBlue";
				if (i+1 != min_i && i < array.length-1) {
					array[i+1].color = "dodgerBlue";
				}
				array[i].color = "cornflowerBlue";
				if (min_i != i) {
					var temp = array[i];
					array[i] = array[min_i];
					array[min_i] = temp;

					/*var temp2 = obj_frame.array[i].value;
					obj_frame.array[i].value = obj_frame.array[min_i].value;
					obj_frame.array[min_i].value = temp2;*/
				}
				//anim_array.push([obj_frame, i]);
				var min_i = minIndex(array, i+1, N-1);
				if (array[min_i] != undefined){
					array[min_i].color = "deepPink";
				}
			}
			recursiveSort(array, i+1, canv);
		}
		recursiveSort(array, i, canv);
		this.sorted = true;
		return anim_array;
	}

	this.bubble_sort = function(array) {
		var anim_array = [];
		bub_sort = function(array, i) {
			if (i == array.length) {
				return "done";
			}
			pass = function(array, i,  j) {
				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);

				if (j == array.length-i-1) {
					return "new pass";
				}
				if (array[j].value > array[j+1].value) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;
				}
				pass(array, i, j+1);
			}
			pass(array, i, 0);
			bub_sort(array, i+1);
		}
		bub_sort(array, 0);
		this.sorted = true;
		return anim_array;
	}

	this.insertion_sort = function(array) {
		var anim_array = [];
		var place = function(array, n) {

			var current = array[n-1];
			var i = n-2;
			while (i >= 0 && array[i].value > current.value) {
				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);
				array[i+1] = array[i];
				i--;
			}
			array[i+1] = current;
		}
		recursive_insert = function(array, n=array.length) {
			if (n <= 1) {
				return "done";
			}
			current = array[n-1];
			recursive_insert(array, n-1);
			place(array, n);
		}
		recursive_insert(array);
		this.sorted = true;
		return anim_array;
	}

	this.quick_sort = function(array) {
		var anim_array = [];
		function partition(array, low, high) {
			var i = low - 1;
			var pivot = array[high];
			for (var j = low; j < high; j++) {
				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);
				console.log(j);
				if (array[j].value < pivot.value) {
					i++;
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			}
			var temp2 = array[i+1];
			array[i+1] = array[high];
			array[high] = temp2;
			//var obj_frame = deep_copy(array);
			anim_array.push(obj_frame);
			return i+1;
		}
		function recursive_quick(array, low, high) {
			if (low < high) {
				var p_ind = partition(array, low, high);
				recursive_quick(array, low, p_ind-1);
				recursive_quick(array, p_ind+1, high);
			}
		}
		recursive_quick(array, 0, array.length-1);
		return anim_array;
	}
}

function deep_copy(array) {
    var new_array = [];
    for (i in array) {
    	new_array.push(array[i]);
    }
    var lst = new List();
    lst.init();
    lst.array = new_array;
    return lst;
}

list = new List();
list.init();
console.log(list.array);

function reset_data() {
	list.clear();
	list.n = SIZE;
	rel_fps_mult = SIZE/90; 
	bin_width = get_bin_width();
	list.init();
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	list.map_pillars(ctx);
}
function increment(step) {
	size_form.value = parseInt(size_form.value) + parseInt(step);
	SIZE = parseInt(size_form.value);
	reset_data();
}
function decrement(step) {
	size_form.value -= step;
	SIZE = parseInt(size_form.value);
	reset_data();
}
function exec_bubble_sort() {
	if (list.sorted != true) {
		var animation_bubble = list.bubble_sort(list.array);
		animate(animation_bubble, 130*rel_fps_mult);
	}
	return "already sorted.";
}
function exec_selec_sort() {
	if (list.sorted != true) {
		var animation_selec = list.selec_sort(list.array, 0);
		animate(animation_selec, 10*rel_fps_mult);
	}
	return "already sorted.";
}
function exec_insert_sort() {
	if (list.sorted != true) {
		var animation_insert = list.insertion_sort(list.array);
		animate(animation_insert, 50*rel_fps_mult);
	}
	return "already sorted.";
}
function exec_quick_sort() {
	if (list.sorted != true) {
		var animation_quick = list.quick_sort(list.array);
		animate(animation_quick, 40*rel_fps_mult);
	}
	return "already sorted.";
}

var frames = 0;
var ind = 0;
var current_list;

function next_state(i, array, fps) {
	setTimeout(function(){
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		current_list = array[i];
		current_list.map_pillars(ctx);
	}, (1000/fps)*i);
}

function animate(array, fps) {
	console.log(fps);
	for (var i = 0; i < array.length; i++) {
		next_state(i, array, fps);
	}
}

(function initiate() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	list.map_pillars(ctx);
})();




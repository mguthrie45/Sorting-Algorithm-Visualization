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
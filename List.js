function List() {
	this.n = size;
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
			var pillar = new Pillar(bin_width, "cornflowerBlue", Math.floor(Math.random() * HEIGHT));
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
				var val = array[i].value;
				var min_i = minIndex(array, i, N-1);
				var min_val = array[min_i].value;
				if (i < N-1) {
					array[i] = new Pillar(bin_width, "orange", val);
					array[min_i] = new Pillar(bin_width, "purple", min_val);
				}

				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);


				//array[i] = new Pillar(bin_width, "cornflowerBlue", val);
				if (min_i != i) {
					var temp = array[i];
					array[i] = array[min_i];
					array[min_i] = temp;

					var obj_frame = deep_copy(array);
					anim_array.push(obj_frame);

					array[i] = new Pillar(bin_width, "cornflowerBlue", min_val);
					array[min_i] = new Pillar(bin_width, "cornflowerBlue", val);
				}
				else {
					array[i] = new Pillar(bin_width, "cornflowerBlue", val);
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
				if (j == array.length-i-1) {
					var final_val = array[j].value;
					array[j] = new Pillar(bin_width, "cornflowerBlue", final_val);
					return "new pass";
				}
				var val1 = array[j].value;
				var val2 = array[j+1].value;

				array[j] = new Pillar(bin_width, "orange", val1);
				array[j+1] = new Pillar(bin_width, "red", val2);

				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);

				if (array[j].value > array[j+1].value) {
					var temp = array[j];
					array[j] = array[j+1];
					array[j+1] = temp;

					var obj_frame = deep_copy(array);
					anim_array.push(obj_frame);

					array[j] = new Pillar(bin_width, "cornflowerBlue", val2);
				}
				else {
					array[j] = new Pillar(bin_width, "cornflowerBlue", val1);
				}
				pass(array, i, j+1);
			}
			pass(array, i, 0);
			bub_sort(array, i+1);
		}
		bub_sort(array, 0);
		this.sorted = true;
		console.log(anim_array);
		return anim_array;
	}

	this.insertion_sort = function(array) {
		var anim_array = [];
		var place = function(array, n) {

			var current = array[n-1];
			var i = n-2;
			var val = array[i].value;

			while (i >= 0 && array[i].value > current.value) {
				var i_val = array[i].value;
				array[i] = new Pillar(bin_width, "orange", i_val);
				var i1_val = array[i+1].value;
				array[i+1] = new Pillar(bin_width, "purple", i1_val);

				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);

				var temp = array[i+1];
				array[i+1] = array[i];
				array[i] = temp;

				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);

				array[i] = new Pillar(bin_width, "cornflowerBlue", i1_val);
				array[i+1] = new Pillar(bin_width, "cornflowerBlue", i_val);

				i--;
			}
			array[i+1] = current;
			var obj_frame = deep_copy(array);
			anim_array.push(obj_frame);
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

			var pivot_val = array[high].value;
			array[high] = new Pillar(bin_width, "purple", pivot_val);

			for (var j = low; j < high; j++) {
				var final_val = array[j].value;
				array[j] = new Pillar(bin_width, "orange", final_val);

				var obj_frame = deep_copy(array);
				anim_array.push(obj_frame);

				if (array[j].value < pivot.value) {
					i++;

					var temp_val = array[i].value;
					array[i] = new Pillar(bin_width, "red", temp_val);

					var obj_frame = deep_copy(array);
					anim_array.push(obj_frame);

					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;

					var obj_frame = deep_copy(array);
					anim_array.push(obj_frame);

					array[j] = new Pillar(bin_width, "cornflowerBlue", temp_val);
					array[i] = new Pillar(bin_width, "cornflowerBlue", final_val);
				}
				else {
					array[j] = new Pillar(bin_width, "cornflowerBlue", final_val);
				}
			}
			array[high] = new Pillar(bin_width, "cornflowerBlue", pivot_val);

			var temp2 = array[i+1];
			array[i+1] = array[high];
			array[high] = temp2;

			var obj_frame = deep_copy(array);
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
		this.sorted = true;
		return anim_array;
	}

	this.bucket_sort = function(array) {

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

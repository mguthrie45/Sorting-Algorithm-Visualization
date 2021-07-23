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
		selec_sorth(array, i, anim_array);
		this.sorted = true;
		return anim_array;
	}

	this.bubble_sort = function(array) {
		var anim_array = [];
		bubble_sorth(array, 0, anim_array);
		this.sorted = true;
		console.log(anim_array);
		return anim_array;
	}

	this.insertion_sort = function(array) {
		var anim_array = [];
		insert_sorth(array, anim_array);
		this.sorted = true;
		return anim_array;
	}

	this.quick_sort = function(array) {
		var anim_array = [];
		quick_sorth(array, 0, array.length-1, anim_array);
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

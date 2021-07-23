function change_size() {
	size = parseInt(size_form.value);
	reset_data();
}

function increment_size(step) {
	size_form.value = parseInt(size) + parseInt(step);
	size = parseInt(size_form.value);
	reset_data();
}

function decrement_size(step) {
	size_form.value = parseInt(size) - parseInt(step);
	size = parseInt(size_form.value);
	reset_data();
}

function exec_bubble_sort() {
	if (list.sorted != true) {
		var animation_bubble = list.bubble_sort(list.array);
		animate(animation_bubble, 50*rel_fps_mult, false);
	}
	return "already sorted.";
}
function exec_selec_sort() {
	if (list.sorted != true) {
		var animation_selec = list.selec_sort(list.array, 0);
		animate(animation_selec, 10*rel_fps_mult, false);
	}
}
function exec_insert_sort() {
	if (list.sorted != true) {
		var animation_insert = list.insertion_sort(list.array);
		animate(animation_insert, 40*rel_fps_mult, false);
	}
	return "already sorted.";
}
function exec_quick_sort() {
	if (list.sorted != true) {
		var animation_quick = list.quick_sort(list.array);
		animate(animation_quick, 40*rel_fps_mult, false);
	}
	return "already sorted.";
}

function change_speed() {
	var m = parseInt(speed_form.value);
	if (m > 100) {
		speed_form.value = "100";
		m = 100;
	}
	else if (m < 0) {
		speed_form.value = "0";
		m = 0;
	}
	rel_fps_mult = 0.2 + (m * m) * size/(90*1600);
}

function increment_speed(step) {
	if (speed_form.value == "100") {
		return;
	}
	speed_form.value = parseInt(speed_form.value) + parseInt(step);
	var m = speed_form.value;
	rel_fps_mult = 0.2 + (m * m) * size/(90*1600);
}

function decrement_speed(step) {
	if (speed_form.value == "0") {
		return;
	}
	speed_form.value = parseInt(speed_form.value) - parseInt(step);
	var m = speed_form.value;
	rel_fps_mult = 0.2 + (m * m) * size/(90*1600);
}

function min_index(array, start, end) {
  if (start >= end) {
    return start;
  }
  var k = min_index(array, start+1, end);
  if (array[k].value <= array[start].value) {
    return k;
  }
  else {
    return start;
  }
}

function selec_sorth(array, i, anim_array) {
  var N = array.length;
  if (i == N) {
    return -1;
  }
  else {
    var val = array[i].value;
    var min_i = min_index(array, i, N-1);
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
  selec_sorth(array, i+1, anim_array);
}


function bubble_sorth(array, i, anim_array) {
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
  bubble_sorth(array, i+1, anim_array);
}

function place(array, n, anim_array) {
  var current = array[n-1];
  var i = n-2;

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

function insert_sorth(array, anim_array, n=array.length) {
  if (n <= 1) {
    return "done";
  }
  current = array[n-1];
  insert_sorth(array, anim_array, n-1);
  place(array, n, anim_array);
}

function partition(array, low, high, anim_array) {
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
function quick_sorth(array, low, high, anim_array) {
  if (low < high) {
    var p_ind = partition(array, low, high, anim_array);
    quick_sorth(array, low, p_ind-1, anim_array);
    quick_sorth(array, p_ind+1, high, anim_array);
  }
}

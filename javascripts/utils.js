var lin_part_coffee = function (seq, k ) {
  var ans, i, j, m, n, solution, table, x, y, _i, _j, _k, _l;
  n = seq.length;
  if (k <= 0) {
    return [];
  }
  if (k > n) {
    return seq.map(function(x) {
      return [x];
    });
  }
  table = (function() {
    var _i, _results;
    _results = [];
    for (y = _i = 0; 0 <= n ? _i < n : _i > n; y = 0 <= n ? ++_i : --_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (x = _j = 0; 0 <= k ? _j < k : _j > k; x = 0 <= k ? ++_j : --_j) {
          _results1.push(0);
        }
        return _results1;
      })());
    }
    return _results;
  })();
  solution = (function() {
    var _i, _ref, _results;
    _results = [];
    for (y = _i = 0, _ref = n - 1; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (x = _j = 0, _ref1 = k - 1; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          _results1.push(0);
        }
        return _results1;
      })());
    }
    return _results;
  })();
  for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
    table[i][0] = seq[i] + (i ? table[i - 1][0] : 0);
  }
  for (j = _j = 0; 0 <= k ? _j < k : _j > k; j = 0 <= k ? ++_j : --_j) {
    table[0][j] = seq[0];
  }
  for (i = _k = 1; 1 <= n ? _k < n : _k > n; i = 1 <= n ? ++_k : --_k) {
    for (j = _l = 1; 1 <= k ? _l < k : _l > k; j = 1 <= k ? ++_l : --_l) {
      m = _.min((function() {
        var _m, _results;
        _results = [];
        for (x = _m = 0; 0 <= i ? _m < i : _m > i; x = 0 <= i ? ++_m : --_m) {
          _results.push([_.max([table[x][j - 1], table[i][0] - table[x][0]]), x]);
        }
        return _results;
      })(), function(o) {
        return o[0];
      });
      table[i][j] = m[0];
      solution[i - 1][j - 1] = m[1];
    }
  }
  n = n - 1;
  k = k - 2;
  ans = [];
  while (k >= 0) {
    ans = [
      (function() {
        var _m, _ref, _ref1, _results;
        _results = [];
        for (i = _m = _ref = solution[n - 1][k] + 1, _ref1 = n + 1; _ref <= _ref1 ? _m < _ref1 : _m > _ref1; i = _ref <= _ref1 ? ++_m : --_m) {
          _results.push(seq[i]);
        }
        return _results;
      })()
    ].concat(ans);
    n = solution[n - 1][k];
    k = k - 1;
  }
  return [
    (function() {
      var _m, _ref, _results;
      _results = [];
      for (i = _m = 0, _ref = n + 1; 0 <= _ref ? _m < _ref : _m > _ref; i = 0 <= _ref ? ++_m : --_m) {
        _results.push(seq[i]);
      }
      return _results;
    })()
  ].concat(ans);
}

var resize_img = function($p, ideal_width, ideal_height) {
    //additional subtraction on width for margins
	$p.parent().css({"width": Math.floor(ideal_width - 2), "height": Math.floor(ideal_height)});
	$p.css({"width": Math.floor(ideal_width - 2), "height": Math.floor(ideal_height)});
}

var galleryify = function(images) {
	var $imgs = $(images);
	var viewport_width = $(window).width();
	var ideal_height = parseInt(($(window).height() - $(".navbar").height()) / 2);
	
	var summed_width = _.reduce($imgs, function (memo, img) {
		return (parseFloat($(img).data("aspectRatio")) * ideal_height) + memo;
	}, 0);
	
	var rows = Math.round(summed_width / viewport_width);
	$('#gallery').css({"height": ideal_height * rows});
	
	if (rows < 1) {
		//standard sizing
		_.each($imgs, function(img) {
			var $img = $(img);
			var ratio = $img.data("aspectRatio");
			resize_img($(img), (ideal_height * ratio), ideal_height);
		});
	} else {
		//distribute photos over rows using aspect ratio as weighting
		var weights = _.map($imgs, function(img) {
			var $img = $(img);
			return (100 * $img.data("aspectRatio"));
		});
		
		//var partition = linear_partition(weights, rows);
		var partition = lin_part_coffee(weights, rows);
		var index = 0;
		var row_buffer = [];
		_.each(partition, function(row) {
			row_buffer = [];
			_.each(row, function(im) {
				row_buffer.push($imgs[index++]);
			});
				var summed_ratios = _.reduce(row_buffer, function(memo, img){
					return parseFloat($(img).data("aspectRatio")) + memo;
				}, 0);
				_.each(row_buffer, function(img) {
					var $img = $(img);
					//resize_img($img, (viewport_width/summed_ratios)*parseFloat($img.attr("data-aspect-ratio")), ideal_height);
					resize_img($img, (viewport_width/summed_ratios)*parseFloat($img.data("aspectRatio")), viewport_width/summed_ratios);
				});
		});
	}
}
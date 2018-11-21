//scale.js
//获取应用实例

var app = getApp()
var node = [
  182, 955,
  325, 806,
  325, 616,
  383, 433,
  352, 345,
  163, 421,
  70, 432,
  266, 533,
  60, 278,
  260, 230,
  577, 193,
  683, 190,
  830, 195,
  1115, 160,
  1529, 116,
  1534, 265,
  1522, 442,
  1492, 579,
  1422, 723,
  1361, 970,
  948, 939,
  975, 804,
  488, 804,
  497, 951,
  947, 540,
  1173, 570,
  1136, 806,
  1318, 771,
  159, 805,
  733, 381
];
//index of pairs of nodes, represent  edges
var edge = [
  1, 24,
  1, 29,
  2, 3,
  2, 6,
  2, 7,
  2, 8,
  2, 23,
  2, 29,
  3, 7,
  3, 8,
  3, 29,
  4, 5,
  4, 8,
  4, 30,
  5, 6,
  5, 12,
  6, 7,
  6, 8,
  6, 29,
  7, 8,
  7, 9,
  7, 29,
  8, 29,
  9, 10,
  10, 11,
  11, 12,
  12, 13,
  12, 30,
  13, 14,
  13, 30,
  14, 15,
  14, 16,
  15, 16,
  16, 17,
  17, 18,
  18, 19,
  18, 26,
  19, 20,
  19, 26,
  19, 27,
  19, 28,
  20, 21,
  21, 22,
  21, 24,
  22, 23,
  22, 25,
  22, 27,
  23, 24,
  25, 26,
  25, 30,
  26, 28,
  27, 28
];
var MapHandler = {
  dict: new Map(),
  dis_mtx: [],
  path_mtx: [],
  init: function (node, edge) {
    var i, j, temp;
    for (i = 0; i < node.length; i += 2) {
      temp = [node[i], node[i + 1]];
      this.dict.set(i >> 1, [temp, []]);
    }
    this.nodes_num = node.length >> 1;
    for (i = 0; i < this.nodes_num; i++) {
      this.dis_mtx[i] = [];
      this.path_mtx[i] = [];
    }
    for (i = 0; i < this.nodes_num; i++) {
      for (j = 0; j < this.nodes_num; j++) {
        this.dis_mtx[i][j] = Infinity;
        this.path_mtx[i][j] = null;
      }
    }
    var node1, node2, distance;
    for (j = 0; j < edge.length; j += 2) {
      node1 = edge[j] - 1;
      node2 = edge[j + 1] - 1;
      distance = this.get_distance(node1, node2);
      this.dict.get(node1)[1].push([node2, node1]);
      this.dict.get(node2)[1].push([node1, node2]);
      this.dis_mtx[node1][node2] = distance;
      this.dis_mtx[node2][node1] = distance;
    }
  },

  get_distance: function (node1, node2) {
    var n1, n2;
    n1 = this.dict.get(node1)[0];
    n2 = this.dict.get(node2)[0];
    return ((n1[0] - n2[0]) ** 2 + (n1[1] - n2[1]) ** 2) ** 0.5;
  },

  get_min_path: function () {
    var k, i, j;
    for (k = 0; k < this.nodes_num; k++) {
      for (i = 0; i < this.nodes_num; i++) {
        for (j = 0; j < this.nodes_num; j++) {
          if (this.dis_mtx[i][j] > this.dis_mtx[i][k] + this.dis_mtx[k][j]) {
            this.dis_mtx[i][j] = this.dis_mtx[i][k] + this.dis_mtx[k][j];
            this.path_mtx[i][j] = k;
          }
        }
      }
    }
  },

  get_one_path: function (node1, node2) {
    node1 -= 1;
    node2 -= 1;
    var path = [node1 + 1];
    var that = this;
    function get_path(that, node1, node2, path) {
      if (node1 == node2)
        return;
      if (that.path_mtx[node1][node2] == null)
        path.push(node2 + 1);
      else {
        get_path(that, node1, that.path_mtx[node1][node2], path);
        get_path(that, that.path_mtx[node1][node2], node2, path);
      }
    }
    get_path(that, node1, node2, path);
    return path;
  }
}
MapHandler.init(node, edge);
MapHandler.get_min_path();
var beta = 0;
var last_beta = 0;
var ratio = 1;
var dis;
var x0 = 0;
var y0 = 0;
var i_width = 740;
var i_height = 480;

const PI = 3.14159;

// the arrow location and direction
var location_x = new Array(-100, 300, 200);
var location_y = new Array(-100, 200, 200);
function x(num, index) {
  if (index % 2 == 0) {
    return num * 0.378
  }
}
function y(num, index) {
  if (index % 2 != 0) {
    return num * 0.45
  }
}
var tmp_x = node.map(x)
var tmp_y = node.map(y)
var path_x = tmp_x.filter(d => d)
var path_y = tmp_y.filter(d => d)
var a_x = path_x[parseInt(app.globalData.location) - 1];
var a_y = path_y[parseInt(app.globalData.location) - 1];

var liftA1_x = 160;
var liftA1_y = 250;
var liftA2_x = 260;
var liftA2_y = 250;
var liftA3_x = 360;
var liftA3_y = 250;
var a_a = PI / 4;

var startX = 0;
var startY = 0;
var startang = 0;
var angle = 0;
var diff_ang = 0;
var last_diff_ang = 0;
var src = "../../images/campusBG.png.jpg"
var arrow = "../../images/arrow.png"
var liftA1 = "../../images/lift.png"
var liftA2 = "../../images/lift.png"
var liftA3 = "../../images/lift.png"
var arrow_img = "../../images/arrow2.png"
var context = wx.createCanvasContext('firstCanvas')

var path = []
var points = []
var rotate = 0

Page({

  data: {
    node_list: node,
    scan_result: '',
    hidden1: false,
    hidden2: true,
    hidden3: true,
    hidden4: true,
    path: [],
    end: 0,
    x: 0,
    y: 0,
    rotate: 0
  },

  //Start-------------------------------------------

  whereToGo: function () {
    this.setData({
      hidden2: true,
      hidden3: false,
    })
    this.draw()
  },
  scanCode: function () {
    this.reset()
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({
          scan_result: res.result,
        })
        points.push(parseInt(res.result))
        wx.onCompassChange(function (res) {
          var directions = res.direction.toFixed(2);
          rotate = directions
          that.setData({
            angle: directions,
            rotate: directions,
          })
          that.draw()
        })
        if (app.globalData.useSavedLocation == true) {
          app.globalData.useSavedLocation = false
          that.setData({
            end: app.globalData.location
          })
          that.getPath()
        }
        else {
          that.setData({
            hidden1: true,
            hidden2: false
          })
        }

      },
      fail: function (res) {
      },
      complete: function (res) {
        x0 = -path_x[points[0] - 1] + 180
        y0 = -path_y[points[0] - 1] + 300
        that.draw()
      }
    })
  },
  onLoad: function (options) {
    this.reset()
    var that = this
    that.setData({
      scan_result: options.result,
    })
  },
  onReady: function () {
    tmp_x = node.map(x)
    tmp_y = node.map(y)
    path_x = tmp_x.filter(d => d)
    path_y = tmp_y.filter(d => d)
    a_x = path_x[parseInt(app.globalData.location) - 1];
    a_y = path_y[parseInt(app.globalData.location) - 1];

    liftA1_x = 160;
    liftA1_y = 250;
    liftA2_x = 260;
    liftA2_y = 250;
    liftA3_x = 360;
    liftA3_y = 250;
    this.reset()
    this.draw()
    wx.startWifi({
      success: function (res) {
        console.log(res.errMsg)
      }
    })
    wx.getWifiList({
      success: function (res) {
        console.log(res)
      }
    })
    wx.onGetWifiList(function (res) {
      console.log(res.wifiList)
      console.log('whatever')
      if (res.wifiList.length) {
        console.log(res);
      }
    })

  },
  onUnload: function () {
    wx.stopWifi({
      success: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  touchStart: function (e) {
    if (e.touches.length == 1) {

      startX = e.touches[0].x;
      startY = e.touches[0].y;
    }
    else {
      startX = (e.touches[0].x + e.touches[1].x) / 2;
      startY = (e.touches[0].y + e.touches[1].y) / 2;

      var dx = e.touches[1].x - e.touches[0].x;
      var dy = e.touches[1].y - e.touches[0].y;
      dis = Math.sqrt(dx * dx + dy * dy);

      startang = Math.atan(dy / dx);
    }
    //console.log(x0, y0, x1, y1)
    //console.log(y0)
  },

  //Move--------------------------------------------
  touchMove: function (e) {
    //触摸移动中
    //console.log('touchmoveCallback');
    //console.log(e);

    if (e.touches.length == 1) {

      var x = e.touches[0].x;
      var y = e.touches[0].y;

      var dx = x - startX;
      var dy = y - startY;
      var that = this
      that.setData({
        x: x + dx,
        y: y + dy,
      })

      startX = x;
      startY = y;
      //console.log(x,startX,x-startX)
      x0 += dx;
      y0 += dy;

      //console.log(x0, y0, x1, y1)

    } else {

      //双指平移

      // get the middle point of two touch points
      var x = (e.touches[0].x + e.touches[1].x) / 2;
      var y = (e.touches[0].y + e.touches[1].y) / 2;

      // calculate the displacement 
      var dx = x - startX;
      var dy = y - startY;

      // refreash the start point
      startX = x;
      startY = y;



      //双指缩放

      // Manhattan distance between two touch points
      var offsetX = e.touches[1].x - e.touches[0].x;
      var offsetY = e.touches[1].y - e.touches[0].y;

      // the straight distance ^2
      var dis_now = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      // calc the scale ratio
      ratio = dis_now / dis;

      // refresh the distance
      dis = dis_now;

      // recala the image width & height
      i_width *= ratio;
      i_height *= ratio;

      // recalc the arrow location
      a_x = a_x * ratio;
      a_y = a_y * ratio;
      for (var i = 0; i < path_x.length; i++) {
        path_x[i] = path_x[i] * ratio;
        path_y[i] = path_y[i] * ratio;
      }
      liftA1_x = liftA1_x * ratio;
      liftA1_y = liftA1_y * ratio;
      liftA2_x = liftA2_x * ratio;
      liftA2_y = liftA2_y * ratio;
      liftA3_x = liftA3_x * ratio;
      liftA3_y = liftA3_y * ratio;


      x0 = x - (x - x0) * ratio;
      y0 = y - (y - y0) * ratio;

      // after moving
      x0 += dx;
      y0 += dy;

    }
    //console.log(y0)
    this.draw()
  },

  touchEnd: function (e) {

  },
  onLoad: function (option) {
    if (typeof (option.ax) != "undefined") {
      a_x = option.ax;
      a_y = option.ay;
    }

    a_x = location_x[app.globalData.location];
    a_y = location_y[app.globalData.location];

    liftA1_x = 180;
    liftA1_y = 280;
    liftA2_x = 290;
    liftA2_y = 284;
    liftA3_x = 300;
    liftA3_y = 130;
    a_a = PI / 4;
    beta = 0;
    ratio = 1;
    dis;
    x0 = 0;
    y0 = 0;
    i_width = 740;
    i_height = 480;


    startX = 0;
    startY = 0;
    startang = 0;
    angle = 0;
    diff_ang = 0;
    last_diff_ang = 0;
    src = "../../images/campusBG.png"
    arrow = "../../images/arrow.png"
    liftA1 = "../../images/lift.png"
    liftA2 = "../../images/lift.png"
    liftA3 = "../../images/lift.png"

    //context = wx.createCanvasContext('firstCanvas')
    this.draw()
  },

  canvas_path: function (context, x_array, y_array) {
    const theta = 30
    const arrow_len = 10
    context.beginPath()
    context.setStrokeStyle("#4090FF")
    context.setLineWidth(8)
    context.setLineCap('round')
    for (var i = 0; i < path.length - 1; i = i + 1) {
      context.moveTo(x_array[path[i] - 1], y_array[path[i] - 1]);
      context.lineTo(x_array[path[i + 1] - 1], y_array[path[i + 1] - 1]);
    }
    context.stroke()
  },

  canvas_point: function (context, points) {
    context.beginPath()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(16)
    context.setLineCap('round')
    for (var i = 1; i < points.length; i = i + 1) {
      context.moveTo(path_x[points[i] - 1], path_y[points[i] - 1]);
      context.lineTo(path_x[points[i] - 1], path_y[points[i] - 1]);
    }
    context.stroke()
  },
  canvas_arrow: function () {
    var image = '../../images/arrow.png'
    var x = path_x[points[0] - 1]
    var y = path_y[points[0] - 1]
    var width = 35;
    var height = 35;
    context.translate(x, y);
    context.rotate(rotate * Math.PI / 180);
    context.drawImage(image, -width / 2, -height / 2, width, height)
    context.rotate(-rotate * Math.PI / 180);
    context.translate(-x, -y);
  },


  draw: function () {
    context.setFontSize(20)
    var a = beta / PI * 180
    var b = y0 / PI * 180
    var c = diff_ang / PI * 180
    context.translate(x0, y0)

    context.drawImage(src, 0, 0, i_width, i_height)
    context.drawImage(liftA1, liftA1_x - 17, liftA1_y - 35, 35, 35)
    context.drawImage(liftA2, liftA2_x - 17, liftA2_y - 35, 35, 35)
    context.drawImage(liftA3, liftA3_x - 17, liftA3_y - 35, 35, 35)

    a_x = path_x[parseInt(app.globalData.location) - 1]
    a_y = path_y[parseInt(app.globalData.location) - 1]

    this.canvas_path(context, path_x, path_y)
    this.canvas_point(context, points)
    if (points.length>0) {
      this.canvas_arrow()
    }
    for (var i = 0; i < path_x.length; i = i + 1) {
      context.fillText(i + 1, path_x[i], path_y[i])
    }
    context.draw()
  },

  chooseEnd: function (event) {
    this.setData({
      end: event.target.dataset.node + 1,
    })
    this.getPath()
  },
  getPath: function (event) {
    this.setData({
      hidden3: true,
      hidden4: false,
    })
    path = MapHandler.get_one_path(this.data.scan_result, this.data.end)
    points.push(this.data.end)
    this.draw()
  },
  reset: function () {
    points = []
    path = []
    this.setData({
      hidden1: false,
      hidden2: true,
      hidden3: true,
      hidden4: true,
    })
    this.draw()
  },
  home: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  restart: function() {
    var that=this
    wx.scanCode({
      success: function (res) {
        that.setData({
          scan_result: res.result,
        })
        points[0]=res.result
        path = MapHandler.get_one_path(that.data.scan_result, that.data.end)
        console.log(path)
      },
      complete: function (res) {
        x0 = -path_x[points[0] - 1] + 180
        y0 = -path_y[points[0] - 1] + 300
        that.draw()
      }
    })
  }


})


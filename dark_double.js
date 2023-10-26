// 定义一个名为 dark 的函数
function dark() {
  // 设置 requestAnimationFrame，兼容不同浏览器
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  // 创建canvas和声明变量
  var n, e, i, h, t = .05,
      universeCanvas = document.createElement("canvas");
  universeCanvas.id = "universe";
  universeCanvas.style = "position: fixed; top: 0px; left: 0px; z-index: -1;";
  document.body.appendChild(universeCanvas);
  var s = universeCanvas,
      o = !0,
      a = "180,184,240",
      r = "226,225,142",
      d = "226,225,224",
      c = [];

  // 定义一个函数，用于设置 canvas 的尺寸
  function f() {
      n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
  }

  // 定义一个函数，用于更新画布上的粒子
  function u() {
      h.clearRect(0, 0, n, e);
      for (var t = c.length, i = 0; i < t; i++) {
          var s = c[i];
          s.move(), s.fadeIn(), s.fadeOut(), s.draw()
      }
  }

  // 定义粒子对象构造函数
  function y() {
      this.reset = function() {
          this.giant = m(3); // 是否是大粒子
          this.comet = !this.giant && !o && m(10); // 是否是彗星粒子
          this.x = l(0, n - 10); // 初始 x 坐标
          this.y = l(0, e); // 初始 y 坐标
          this.r = l(1.1, 2.6); // 半径
          this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t; // x 方向速度
          this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120); // y 方向速度
          this.fadingOut = null; // 是否渐隐
          this.fadingIn = !0; // 是否渐显
          this.opacity = 0; // 不透明度
          this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)); // 不透明度阈值
          this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1); // 不透明度变化速度
      };
      this.fadeIn = function() {
          this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do);
      };
      this.fadeOut = function() {
          this.fadingOut && (this.opacity -= this.do / 2, (this.x > n || this.y < 0) && (this.fadingOut = !1, this.reset()));
      };
      this.draw = function() {
          if (h.beginPath(), this.giant)
              h.fillStyle = "rgba(" + a + "," + this.opacity + ")", h.arc(this.x, this.y, 4, 0, 2 * Math.PI, !1);
          else if (this.comet) {
              h.fillStyle = "rgba(" + d + "," + this.opacity + ")";
              h.arc(this.x, this.y, 3, 0, 2 * Math.PI, !false);
              for (var t = 0; t < 30; t++) {
                  h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")";
                  h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 4, 4);
                  h.fill();
              }
          } else {
              h.fillStyle = "rgba(" + r + "," + this.opacity + ")";
              h.rect(this.x, this.y, this.r*2, this.r*2);
          }
          h.closePath();
          h.fill();
      };
      this.move = function() {
          this.x += this.dx;
          this.y += this.dy;
          !1 === this.fadingOut && this.reset();
          (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0);
      };
      setTimeout(function() {
          o = !1
      }, 50);
  }

  // 用于检查是否为大粒子
  function m(t) {
      return Math.floor(1e3 * Math.random()) + 1 < 10 * t;
  }

  // 生成指定范围内的随机数
  function l(t, i) {
      return Math.random() * (i - t) + t;
  }

  // 初始化画布尺寸
  f();

  // 监听窗口大小变化，调整画布尺寸
  window.addEventListener("resize", f, !1);

  // 创建粒子对象数组并初始化
  (function() {
      h = s.getContext("2d");
      for (var t = 0; t < i; t++) {
          c[t] = new y;
          c[t].reset();
      }
      u();
  })();

  // 更新粒子位置并使用 requestAnimationFrame 实现动画
  (function t() {
      u();
      window.requestAnimationFrame(t);
  })();
}

// 调用 dark 函数启动粒子效果
dark();

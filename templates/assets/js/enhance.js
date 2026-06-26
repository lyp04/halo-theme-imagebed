/* 简约图墙 (imagebed) 主题  前端增强：进度条 + 标题符号标记 + 滚动揭示 */
(function () {
  "use strict";
  var bar = document.getElementById("progress");
  if (bar) {
    var f = function () { var h = document.documentElement; var m = h.scrollHeight - h.clientHeight; bar.style.width = (m > 0 ? h.scrollTop / m * 100 : 0) + "%"; };
    document.addEventListener("scroll", f, { passive: true }); f();
  }

  // 视频嵌入：包进自适应 16:9 容器，并去掉编辑器写死的宽高（避免尺寸“变回去”影响显示）
  document.querySelectorAll(".post-content iframe").forEach(function (f) {
    if (f.closest(".video-embed")) return;
    var w = document.createElement("div"); w.className = "video-embed";
    f.parentNode.insertBefore(w, f); w.appendChild(f);
    f.removeAttribute("width"); f.removeAttribute("height"); f.style.width = ""; f.style.height = "";
  });

  // 标题以 + - = 开头：把符号变成小的彩色标记，标题保持极简
  var MK = { "+": ["+", "mk--pos"], "-": ["−", "mk--neg"], "−": ["−", "mk--neg"], "=": ["=", "mk--eq"], "*": ["+", "mk--pos"] };
  document.querySelectorAll(".post-content h2").forEach(function (h2) {
    var raw = (h2.textContent || "").trim(); if (!raw) return;
    var c = raw.charAt(0);
    if (!Object.prototype.hasOwnProperty.call(MK, c)) return;
    var m = MK[c], title = raw.slice(1).trim();
    h2.textContent = "";
    var s = document.createElement("span"); s.className = "mk " + m[1]; s.textContent = m[0];
    var t = document.createElement("span"); t.textContent = title;
    h2.appendChild(s); h2.appendChild(t);
  });

  var arr = [];
  document.querySelectorAll(".post-content > *, .reveal").forEach(function (n) { if (arr.indexOf(n) < 0) { n.classList.add("reveal"); arr.push(n); } });
  if (!("IntersectionObserver" in window)) { arr.forEach(function (n) { n.classList.add("is-in"); }); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  arr.forEach(function (n) { io.observe(n); });
})();

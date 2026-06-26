/* 简约图墙 (imagebed) 主题  首页图墙：搜索 + 排序（最新 / 评分）+ 分页（默认每页 12）
 * 数据由 Halo 主题在 #src 里渲染好，这里只负责前端的搜索、排序与分页，无需后端改动。 */
(function () {
  "use strict";
  var grid = document.getElementById("grid"); if (!grid) return;
  var pager = document.getElementById("pager");
  var countEl = document.getElementById("count");
  var seg = document.getElementById("sortseg");
  var searchEl = document.getElementById("search");
  var PAGE = parseInt(grid.getAttribute("data-page-size"), 10) || 12;

  var items = [].slice.call(document.querySelectorAll("#src > article")).map(function (a) {
    return {
      title: a.getAttribute("data-title") || "",
      url: a.getAttribute("data-url") || "#",
      cover: a.getAttribute("data-cover") || "",
      ts: a.getAttribute("data-ts") || "",
      cat: a.getAttribute("data-cat") || "",
      grade: (a.getAttribute("data-grade") || "").trim()
    };
  });

  var ORDER = ["S+","S","A+","A","A-","B+","B","B-","C+","C","C-","D","E","F"];
  function gradeVal(g){ var i = ORDER.indexOf(g); return i < 0 ? 999 : i; }
  function byTsDesc(a,b){ return a.ts < b.ts ? 1 : a.ts > b.ts ? -1 : 0; }

  var sort = "new", page = 1, query = "";
  function matches(it){
    if (!query) return true;
    return it.title.toLowerCase().indexOf(query) >= 0 || it.cat.toLowerCase().indexOf(query) >= 0;
  }
  function sorted(){
    var arr = items.filter(matches);
    if (sort === "grade") arr.sort(function(a,b){ var d = gradeVal(a.grade) - gradeVal(b.grade); return d !== 0 ? d : byTsDesc(a,b); });
    else arr.sort(byTsDesc);
    return arr;
  }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
  function card(it){
    var date = it.ts ? it.ts.slice(0,10) : "";
    var badge = it.grade ? '<span class="gcard__grade">'+esc(it.grade)+'</span>' : "";
    var cover = it.cover
      ? '<div class="gcard__cover"><img loading="lazy" src="'+esc(it.cover)+'" alt="'+esc(it.title)+'">'+badge+'</div>'
      : '<div class="gcard__cover gcard__cover--empty"><span>✦</span>'+badge+'</div>';
    return '<a class="gcard" href="'+esc(it.url)+'">'+cover+
      '<div class="gcard__body"><div class="gcard__meta"><b>'+esc(it.cat)+'</b> · '+esc(date)+'</div>'+
      '<div class="gcard__title">'+esc(it.title)+'</div></div></a>';
  }
  function render(){
    var arr = sorted();
    if (arr.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--ink-3);padding:60px 0 90px;">' + (query ? '没有找到“'+esc(query)+'”相关的内容' : '这里还没有内容～') + '</p>';
      if (countEl) countEl.textContent = "";
      if (pager) pager.innerHTML = "";
      return;
    }
    var pages = Math.max(1, Math.ceil(arr.length / PAGE));
    if (page > pages) page = pages;
    grid.innerHTML = arr.slice((page-1)*PAGE, page*PAGE).map(card).join("");
    if (countEl) countEl.textContent = "共 " + arr.length + " 篇";
    if (pages <= 1) { pager.innerHTML = ""; return; }
    var h = '<button data-go="'+(page-1)+'"'+(page<=1?" disabled":"")+'>←</button>';
    for (var p=1; p<=pages; p++) h += '<button class="'+(p===page?"is-active":"")+'" data-go="'+p+'">'+p+'</button>';
    h += '<button data-go="'+(page+1)+'"'+(page>=pages?" disabled":"")+'>→</button>';
    pager.innerHTML = h;
  }
  if (seg) seg.addEventListener("click", function(e){
    var b = e.target.closest("[data-sort]"); if (!b) return;
    [].forEach.call(seg.querySelectorAll(".seg__btn"), function(x){ x.classList.remove("is-active"); });
    b.classList.add("is-active"); sort = b.getAttribute("data-sort"); page = 1; render();
  });
  if (searchEl) searchEl.addEventListener("input", function(){
    query = this.value.trim().toLowerCase(); page = 1; render();
  });
  pager.addEventListener("click", function(e){
    var b = e.target.closest("[data-go]"); if (!b || b.disabled) return;
    var g = parseInt(b.getAttribute("data-go"), 10);
    if (g >= 1) { page = g; render(); document.querySelector(".toolbar").scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
  render();
})();

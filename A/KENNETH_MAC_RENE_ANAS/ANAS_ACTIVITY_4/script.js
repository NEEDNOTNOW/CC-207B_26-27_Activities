(function(){
  var root=document.documentElement, themeBtn=document.getElementById('theme');
  function isDark(){
    var t=root.getAttribute('data-theme');
    if(t) return t==='dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function label(){ themeBtn.textContent=isDark()?'Light':'Dark'; }
  try{ var saved=localStorage.getItem('theme'); if(saved) root.setAttribute('data-theme',saved); }catch(e){}
  label();
  themeBtn.addEventListener('click',function(){
    var next=isDark()?'light':'dark';
    root.setAttribute('data-theme',next);
    try{ localStorage.setItem('theme',next); }catch(e){}
    label();
  });

  var buttons=document.querySelectorAll('.filters button');
  var items=document.querySelectorAll('.project');
  buttons.forEach(function(b){
    b.addEventListener('click',function(){
      var f=b.dataset.filter;
      buttons.forEach(function(x){ x.setAttribute('aria-pressed', x===b); });
      items.forEach(function(p){ p.hidden = !(f==='all' || p.dataset.cat===f); });
    });
  });

  var status=document.getElementById('status');
  document.getElementById('copy').addEventListener('click',function(){
    var addr='Kennethmacrene.anas@wvsu.edu.ph';
    function done(msg){ status.textContent=msg; setTimeout(function(){status.textContent='';},2500); }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(addr).then(function(){done('Email copied');},function(){done(addr);});
    } else { done(addr); }
  });

  document.getElementById('year').textContent=new Date().getFullYear();
})();

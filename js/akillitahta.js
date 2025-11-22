// Basit vektör benzeri model: her obje {id,type,points,x,y,w,h,color,size,text}
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    const dpi = 2; // render netliği için
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // state
    let objects = [];
    let history = [];
    let future = [];
    let tool = 'select';
    let color = document.getElementById('color').value;
    let size = +document.getElementById('size').value;
    let isDown = false;
    let start = null;
    let currentPath = null;
    let selectedId = null;
    let pan = {x:0,y:0};

    // helpers
    function uid(){return Math.random().toString(36).slice(2,9)}
    function pushHistory(){ history.push(JSON.stringify(objects)); if(history.length>100) history.shift(); future = []; }
    function undo(){ if(history.length===0) return; future.push(JSON.stringify(objects)); objects = JSON.parse(history.pop()); render(); }
    function redo(){ if(future.length===0) return; history.push(JSON.stringify(objects)); objects = JSON.parse(future.pop()); render(); }

    // tool buttons
    document.querySelectorAll('.tool').forEach(el=>{
      el.addEventListener('click', ()=>{
        const t = el.dataset.tool;
        if(t){ setTool(t); }
      })
    });
    function setTool(t){ tool = t; document.querySelectorAll('.tool').forEach(x=>x.classList.toggle('active', x.dataset.tool===t)); document.getElementById('curTool').textContent = ({select:'Seç',pen:'Kalem',rect:'Dikdörtgen',ellipse:'Elips',text:'Yazı',eraser:'Silgi',pan:'Kaydır'}[t]||t); }
    setTool('select');

    // inputs
    document.getElementById('color').addEventListener('input', e=>{ color = e.target.value; document.getElementById('curColor').textContent = color; });
    document.getElementById('size').addEventListener('input', e=>{ size = +e.target.value; document.getElementById('curSize').textContent = size; });

    document.getElementById('undo').addEventListener('click', ()=>undo());
    document.getElementById('redo').addEventListener('click', ()=>redo());
    document.getElementById('clear').addEventListener('click', ()=>{ pushHistory(); objects=[]; render(); });
    document.getElementById('exportPNG').addEventListener('click', exportPNG);
    document.getElementById('exportJSON').addEventListener('click', ()=>{ const data=JSON.stringify(objects); const blob=new Blob([data],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='excalidraw-lite.json'; a.click(); });

    document.getElementById('bringFront').addEventListener('click', ()=>{ if(!selectedId) return; pushHistory(); const idx = objects.findIndex(o=>o.id===selectedId); if(idx>=0){ const [o]=objects.splice(idx,1); objects.push(o); render(); } });
    document.getElementById('sendBack').addEventListener('click', ()=>{ if(!selectedId) return; pushHistory(); const idx = objects.findIndex(o=>o.id===selectedId); if(idx>=0){ const [o]=objects.splice(idx,1); objects.unshift(o); render(); } });

    // pointer helpers
    function getPointer(e){ const rect=canvas.getBoundingClientRect(); const x = ((e.clientX-rect.left)/rect.width)*canvas.width; const y = ((e.clientY-rect.top)/rect.height)*canvas.height; return {x,y}; }

    // mouse events
    canvas.addEventListener('mousedown', e=>{
      isDown=true; start=getPointer(e);
      if(tool==='pen'){ pushHistory(); currentPath={id:uid(),type:'path',points:[start],color,size}; objects.push(currentPath); }
      else if(tool==='rect'){ pushHistory(); const obj={id:uid(),type:'rect',x:start.x,y:start.y,w:0,h:0,color,size}; objects.push(obj); currentPath=obj; }
      else if(tool==='ellipse'){ pushHistory(); const obj={id:uid(),type:'ellipse',x:start.x,y:start.y,w:0,h:0,color,size}; objects.push(obj); currentPath=obj; }
      else if(tool==='text'){ pushHistory(); const txt=prompt('Yaz��yı gir:'); if(txt!==null){ const obj={id:uid(),type:'text',x:start.x,y:start.y,text:txt,color,size:24}; objects.push(obj); render(); } }
      else if(tool==='select'){
        // basit seçme: bounding box içinde sondan başa doğru
        const p=getPointer(e);
        for(let i=objects.length-1;i>=0;i--){
          const o=objects[i]; if(hitTest(o,p)){ selectedId=o.id; break; } }
        render();
      }
      else if(tool==='eraser'){ pushHistory(); const p=getPointer(e); // erase nearest object
        for(let i=objects.length-1;i>=0;i--){
          if(hitTest(objects[i],p)){ objects.splice(i,1); render(); break; } }
      }
    });

    canvas.addEventListener('mousemove', e=>{
      if(!isDown) return;
      const p=getPointer(e);
      if(tool==='pen' && currentPath){ currentPath.points.push(p); render(); }
      if((tool==='rect' || tool==='ellipse') && currentPath){ currentPath.w = p.x - start.x; currentPath.h = p.y - start.y; render(); }
      if(tool==='select' && selectedId){ // drag selected
        const dx = p.x - start.x; const dy = p.y - start.y; start=p; const obj = objects.find(o=>o.id===selectedId); if(obj){ obj.x = (obj.x||0) + dx; obj.y = (obj.y||0) + dy; render(); }
      }
      if(tool==='pan'){ // simple pan (moves all objects)
        const dx = p.x - start.x; const dy = p.y - start.y; start=p; objects.forEach(o=>{ o.x = (o.x||0) + dx; o.y = (o.y||0) + dy; if(o.points) o.points = o.points.map(pt=>({x:pt.x+dx,y:pt.y+dy})); }); render(); }
    });

    canvas.addEventListener('mouseup', e=>{
      isDown=false; currentPath=null; start=null; selectedId=null; });

    // hitTest
    function hitTest(o,p){ if(!o) return false; if(o.type==='rect'){ const x1=o.x, y1=o.y, x2=o.x+o.w, y2=o.y+o.h; const minx=Math.min(x1,x2), maxx=Math.max(x1,x2); const miny=Math.min(y1,y2), maxy=Math.max(y1,y2); return p.x>=minx && p.x<=maxx && p.y>=miny && p.y<=maxy; }
      if(o.type==='ellipse'){ const rx = Math.abs(o.w/2), ry=Math.abs(o.h/2); const cx = o.x + o.w/2, cy = o.y + o.h/2; if(rx===0||ry===0) return false; const nx = (p.x-cx)/rx, ny=(p.y-cy)/ry; return nx*nx+ny*ny<=1; }
      if(o.type==='text'){ const metricsWidth = (o.text.length||1)*10* (o.size/24); return p.x>=o.x && p.x<=o.x+metricsWidth && p.y>=o.y-o.size && p.y<=o.y+5; }
      if(o.type==='path'){ // bounding box
        const xs=o.points.map(pt=>pt.x); const ys=o.points.map(pt=>pt.y); const minx=Math.min(...xs), maxx=Math.max(...xs), miny=Math.min(...ys), maxy=Math.max(...ys); return p.x>=minx-10 && p.x<=maxx+10 && p.y>=miny-10 && p.y<=maxy+10; }
      return false; }

    // render
    function render(){
      // clear
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // white board background
      ctx.fillStyle='#ffffff';
      ctx.fillRect(0,0,canvas.width,canvas.height);

      // draw grid subtle
      const grid = 40;
      ctx.strokeStyle='rgba(2,6,23,0.04)'; ctx.lineWidth=1;
      for(let x=0;x<canvas.width;x+=grid){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
      for(let y=0;y<canvas.height;y+=grid){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }

      // objects
      for(const o of objects){ if(o.type==='rect'){ ctx.beginPath(); ctx.lineWidth=o.size; ctx.strokeStyle=o.color; ctx.fillStyle='rgba(0,0,0,0)'; ctx.strokeRect(o.x,o.y,o.w,o.h); }
        else if(o.type==='ellipse'){ ctx.beginPath(); ctx.lineWidth=o.size; ctx.strokeStyle=o.color; ctx.ellipse(o.x+o.w/2,o.y+o.h/2,Math.abs(o.w/2),Math.abs(o.h/2),0,0,Math.PI*2); ctx.stroke(); }
        else if(o.type==='path'){ ctx.beginPath(); ctx.lineWidth=o.size; ctx.strokeStyle=o.color; ctx.lineJoin='round'; ctx.lineCap='round'; if(o.points.length>0){ ctx.moveTo(o.points[0].x,o.points[0].y); for(let i=1;i<o.points.length;i++){ ctx.lineTo(o.points[i].x,o.points[i].y); } ctx.stroke(); } }
        else if(o.type==='text'){ ctx.fillStyle=o.color; ctx.font=(o.size||24)+'px sans-serif'; ctx.fillText(o.text,o.x,o.y); }
      }

      // selection outline
      if(selectedId){ const o = objects.find(x=>x.id===selectedId); if(o){ ctx.save(); ctx.strokeStyle='rgba(124,58,237,0.9)'; ctx.setLineDash([6,4]); if(o.type==='rect'){ ctx.strokeRect(o.x-6,o.y-6,o.w+12,o.h+12); } else if(o.type==='ellipse'){ ctx.beginPath(); ctx.ellipse(o.x+o.w/2,o.y+o.h/2,Math.abs(o.w/2)+6,Math.abs(o.h/2)+6,0,0,Math.PI*2); ctx.stroke(); } else if(o.type==='path'){ const xs=o.points.map(p=>p.x); const ys=o.points.map(p=>p.y); const minx=Math.min(...xs), miny=Math.min(...ys), maxx=Math.max(...xs), maxy=Math.max(...ys); ctx.strokeRect(minx-6,miny-6,(maxx-minx)+12,(maxy-miny)+12); } else if(o.type==='text'){ ctx.strokeRect(o.x-6,o.y-(o.size||24)-6, (o.text.length||1)*10 + 12, (o.size||24)+12); } ctx.restore(); } }

    }

    // initial render
    render();

    // export PNG
    function exportPNG(){ const link=document.createElement('a'); link.href = canvas.toDataURL('image/png'); link.download = 'excalidraw-lite.png'; link.click(); }

    // keyboard shortcuts
    window.addEventListener('keydown', e=>{
      if((e.ctrlKey||e.metaKey) && e.key==='z'){ e.preventDefault(); undo(); }
      if((e.ctrlKey||e.metaKey) && e.key==='y'){ e.preventDefault(); redo(); }
      if(e.key==='Delete' || e.key==='Backspace'){ if(selectedId){ pushHistory(); const idx=objects.findIndex(o=>o.id===selectedId); if(idx>=0){ objects.splice(idx,1); selectedId=null; render(); } } }
    });

    // resize handling
    window.addEventListener('resize', ()=>{
       render();
    });

    // simple touch support
    canvas.addEventListener('touchstart', e=>{
      const t=e.touches[0]; canvas.dispatchEvent(new MouseEvent('mousedown',{clientX:t.clientX,clientY:t.clientY})); e.preventDefault(); });
    canvas.addEventListener('touchmove', e=>{
      const t=e.touches[0]; canvas.dispatchEvent(new MouseEvent('mousemove',{clientX:t.clientX,clientY:t.clientY})); e.preventDefault(); });
    canvas.addEventListener('touchend', e=>{
       canvas.dispatchEvent(new MouseEvent('mouseup',{})); e.preventDefault(); });

    // small UX: click on canvas to deselect
    canvas.addEventListener('click', e=>{
      if(tool==='select'){
        const p=getPointer(e);
        let found=null;
        for(let i=objects.length-1;i>=0;i--){
          if(hitTest(objects[i],p)){ found=objects[i].id; break; } }
        selectedId=found; render(); }
    });

    // save before unload
    window.addEventListener('beforeunload', ()=>{
      localStorage.setItem('exca-lite', JSON.stringify(objects)); });
    // restore
    try{
      const saved = JSON.parse(localStorage.getItem('exca-lite')||'null'); if(saved) objects=saved; render(); } catch(e){}
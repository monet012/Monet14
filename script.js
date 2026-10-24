var G=[["A","75–100",4],["AB","70–74",3.5],["B","65–69",3.25],["BC","60–64",3],["C","55–59",2.75],["CD","50–54",2.5],["D","45–49",2.25],["E","40–44",2],["F","0–39",0]];
function cls(g){if(g>=3.5)return"Distinction";if(g>=3)return"Upper Credit";if(g>=2.5)return"Lower Credit";if(g>=2)return"Pass";return"Fail (below 2.00)"}
function $(i){return document.getElementById(i)}
document.querySelectorAll("#tabs button").forEach(function(b){b.onclick=function(){
document.querySelectorAll("#tabs button").forEach(function(x){x.classList.toggle("on",x===b)});
["me","gpa","cgpa","plan","tips"].forEach(function(t){$(t).classList.toggle("hide",t!==b.dataset.t)})}});
$("scale").innerHTML="<tr><th>Grade</th><th>Score</th><th>Point</th></tr>"+G.map(function(g){return"<tr><td>"+g[0]+"</td><td>"+g[1]+"</td><td>"+g[2].toFixed(2)+"</td></tr>"}).join("")+
"<tr><td colspan=3><b>Classes:</b> Distinction 3.50–4.00 · Upper Credit 3.00–3.49 · Lower Credit 2.50–2.99 · Pass 2.00–2.49</td></tr>";
function addRow(){var d=document.createElement("div");d.className="row";
d.innerHTML='<input placeholder="Course (e.g. COM 111)"><input type="number" min="1" max="6" value="3" inputmode="numeric" aria-label="Units"><select>'+
G.map(function(g){return'<option value="'+g[2]+'">'+g[0]+" ("+g[1]+")</option>"}).join("")+'</select><button class="x" aria-label="Remove">×</button>';
d.querySelector("button").onclick=function(){d.remove()};$("rows").appendChild(d)}
for(var i=0;i<4;i++)addRow();
function calc(){var u=0,p=0,l=[];
document.querySelectorAll("#rows .row").forEach(function(r){var n=r.children[0].value||"Course",c=parseFloat(r.children[1].value)||0,g=parseFloat(r.children[2].value);
if(c>0){u+=c;p+=c*g;l.push({n:n,c:c,g:g,lost:c*(4-g)})}});
if(!u){$("out").innerHTML='<div class="res">Add at least one course.</div>';return}
var gpa=p/u;l.sort(function(a,b){return b.lost-a.lost});
var drag=l.filter(function(x){return x.lost>0}).slice(0,3).map(function(x){return"<li>"+x.n+": "+x.lost.toFixed(1)+" points lost ("+x.c+" units)</li>"}).join("");
$("out").innerHTML='<div class="res"><div class="big">'+gpa.toFixed(2)+'</div><span class="pill">'+cls(gpa)+'</span><p class="note">'+u+" units · "+p.toFixed(2)+" grade points</p></div>"+
(drag?'<h2 style="margin-top:12px">Biggest drag on your GPA</h2><ul>'+drag+"</ul><p class=note>Improving these courses (or resitting them) helps most.</p>":"<p>Perfect 4.00! You don blow! 🎉</p>")}
function cg(){var a=parseFloat($("pc").value),b=parseFloat($("pu").value),c=parseFloat($("sg").value),d=parseFloat($("su").value);
if([a,b,c,d].some(isNaN)||b+d<=0){$("cout").innerHTML='<div class="res">Fill in all four fields.</div>';return}
var v=(a*b+c*d)/(b+d);$("cout").innerHTML='<div class="res"><div class="big">'+v.toFixed(2)+'</div><span class="pill">'+cls(v)+'</span><p class="note">'+(b+d)+" total units</p></div>"}
function plan(){var c=parseFloat($("tc").value),u=parseFloat($("tu").value),t=parseFloat($("tt").value),r=parseFloat($("tr").value);
if([c,u,t,r].some(isNaN)||r<=0){$("pout").innerHTML='<div class="res">Fill in all four fields.</div>';return}
var need=(t*(u+r)-c*u)/r,h;
if(need>4)h='<div class="big" style="color:var(--bad)">'+need.toFixed(2)+'</div><p>Not reachable in one go: even a 4.00 won\'t get you there. Try a lower target, or plan over more units/semesters.</p>';
else if(need<=0)h='<div class="big">Done ✅</div><p>You already meet this target, even with a very low GPA. Stay consistent.</p>';
else{var best=G.filter(function(g){return g[2]>=need})[G.filter(function(g){return g[2]>=need}).length-1];
h='<div class="big">'+need.toFixed(2)+'</div><p>You need this GPA over your next '+r+' units, roughly straight <b>'+best[0]+'</b>s/'+(need>3.5?"A and AB":"B and above")+' on average.</p>'}
$("pout").innerHTML='<div class="res">'+h+"</div>"}

var DP={
"Engineering & Technology":{d:["Computer Engineering","Electrical/Electronic Engineering","Mechanical Engineering","Civil Engineering","Chemical Engineering","Agricultural & Bio-Environmental Eng.","Welding & Fabrication","Metallurgical Engineering"],
t:["Workshop and lab practicals carry big marks: attend all and write neat reports.","Maths and Engineering Mechanics are the usual GPA killers. Do past questions weekly, not just before exams.","Do your SIWES/IT seriously: it builds skills and your final-year project."]},
"Science & Computing":{d:["Computer Science","Statistics","Mathematics","Science Laboratory Technology","Food Technology","Biochemistry/Chemical Sciences","Physics/Electronics"],
t:["Code or practise daily. Programming and lab skills only come from repetition.","Practical and lab reports are easy CA marks, so submit on time.","Form a study group for Maths/Statistics and solve past questions together."]},
"Environmental & Built Environment":{d:["Architecture","Building Technology","Estate Management","Quantity Surveying","Urban & Regional Planning","Surveying & Geo-informatics"],
t:["Studio and design projects take time. Start early and keep your drawings and submissions complete.","Technical courses (Structures, Measurement) need steady practice with worked problems.","Use site visits and field work as marks you should never miss."]},
"Business & Management":{d:["Accountancy","Banking & Finance","Business Administration","Marketing","Office Technology & Management","Public Administration"],
t:["Accounting and Statistics need daily practice. Work through numeric questions yourself.","Learn definitions and case examples for theory courses, since exams reward clear explanations.","Presentations and group work count, so contribute and submit early."]},
"Art, Design & Communication":{d:["Fine Art","Graphic Design","Textile/Fashion Design","Industrial Design","Mass Communication","Library & Information Science"],
t:["Your portfolio and project work carry heavy marks. Finish projects well before the deadline.","Theory courses (History, Communication Studies) are where students lose points. Read and write practice answers.","Take lecturer feedback on practical work and apply it to your next submission."]},
"Technical Education":{d:["Technical Education (Electrical, Mechanical, Building)","Vocational/Technical Teacher Education"],
t:["Balance education theory with workshop practice, as both are graded.","Teaching practice counts heavily, so prepare lesson notes carefully.","Practise your trade skills regularly to score well in practicals."]}};
(function(){var h="";for(var k in DP){h+='<optgroup label="'+k+'">'+DP[k].d.map(function(x){return"<option>"+x+"</option>"}).join("")+"</optgroup>"}$("md").innerHTML=h})();
function me(){var c=parseFloat($("mc").value),u=parseFloat($("mu").value)||0,dep=$("md").value,lv=$("ml").value,nm=$("mn").value.trim(),grp;
if(isNaN(c)||c<0||c>4){$("mout").innerHTML='<div class="res">Enter a CGPA between 0 and 4.</div>';return}
for(var k in DP){if(DP[k].d.indexOf(dep)>-1)grp=k}
try{localStorage.setItem("ygp",JSON.stringify({n:nm,d:dep,l:lv,c:c,u:u}))}catch(e){}
$("tc").value=c;$("tu").value=u||"";
var th=[3.5,3,2.5,2],nx=null;for(var i=0;i<th.length;i++){if(c<th[i])nx=th[i]}
var cl=cls(c),st=c<2?"⚠️ You are below 2.00 and at risk of probation or withdrawal. Act this semester.":c<2.5?"You are on a Pass. Moving above 2.50 opens Lower Credit.":c<3?"Lower Credit. A strong semester can push you to Upper Credit.":c<3.5?"Upper Credit. Distinction is within reach.":"Distinction. Protect it!";
var h='<div class="res"><div class="big">'+c.toFixed(2)+'</div><span class="pill">'+cl+"</span><p>"+(nm?nm+", ":"")+st+"</p></div>";
if(nx){var need=(nx*(u+24)-c*u)/24;h+='<div class="card" style="margin-top:12px"><h2>Next goal: '+nx.toFixed(2)+" ("+cls(nx)+")</h2>"+(need>4?"<p>Not reachable in one semester. Aim for steady gains over two or more.</p>":"<p>If you take about 24 units next semester, you need a GPA of <b>"+Math.max(need,0).toFixed(2)+"</b>. Use the Target tab for exact numbers.</p>")+"</div>"}
var lt=lv.slice(-1)=="2"?"You are in your final year, so each semester moves your CGPA less but every grade counts. Don't lose marks on your final project and exams.":"You still have room to grow. Early strong semesters make your CGPA easier to protect.";
h+='<div class="card"><h2>For '+dep+" ("+lv+")</h2><p class=note>"+lt+"</p><ul>"+DP[grp].t.map(function(x){return"<li>"+x+"</li>"}).join("")+"</ul>"+(c<2.5?"<ul><li>Visit your course adviser and HOD early to plan resits and course load.</li><li>Take fewer risky electives and make sure you clear any F first.</li></ul>":"")+"</div>";
h+='<p class="note">Department list is a guide and may not match every programme. Confirm rules with your department.</p>';
$("mout").innerHTML=h}
try{var sv=JSON.parse(localStorage.getItem("ygp")||"null");if(sv){$("mn").value=sv.n||"";$("md").value=sv.d;$("ml").value=sv.l;$("mc").value=sv.c;$("mu").value=sv.u||"";}}catch(e){}

var U=null,mode="login";
function ldj(k,d){try{return JSON.parse(localStorage.getItem(k)||"null")||d}catch(e){return d}}
function svj(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function hs(t){t="yabite:"+t;if(window.crypto&&crypto.subtle){return crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return("0"+x.toString(16)).slice(-2)}).join("")})}
var h=5381;for(var i=0;i<t.length;i++)h=((h<<5)+h+t.charCodeAt(i))|0;return Promise.resolve("d"+h)}
function show(v){["home","auth","app","dept","stats","exams"].forEach(function(x){$(x).classList.toggle("hide",x!==v)});window.scrollTo(0,0);$("nh").classList.toggle("act",v==="home");$("nc").classList.toggle("act",v==="app");$("nd").classList.toggle("act",v==="dept");$("ns").classList.toggle("act",v==="stats");$("ne").classList.toggle("act",v==="exams")}
function go(v){if(v==="app"&&!U){setMode("login");show("auth");return}show(v);if(v==="stats")loadStats();if(v==="exams"){$("esamp").classList.toggle("hide",!window.EXAM_SAMPLE);if(U&&!$("em").value)$("em").value=U.m}}
function setMode(m){mode=m;$("an").classList.toggle("hide",m!=="signup");$("at1").classList.toggle("on",m==="login");$("at2").classList.toggle("on",m==="signup");$("ab").textContent=m==="login"?"Login":"Create account";$("err").textContent=""}
function updNav(){$("nl").textContent=U?"Logout":"Login"}
function lg(){if(U){if(CLOUDOK)firebase.auth().signOut();U=null;try{localStorage.removeItem("ysess")}catch(e){}updNav();show("home")}else{setMode("login");show("auth")}}
function done(){updNav();$("mn").value=U.n;$("wel").textContent="👋 Welcome, "+U.n.split(" ")[0]+"!";$("gp").value="";show("app")}
function authLocal(){var m=$("gm").value.replace(/\s+/g,"").toUpperCase(),pw=$("gp").value,nm=$("ai").value.trim(),E=$("err"),ac=ldj("yacc",{});
if(!/^F\/(ND|HD|HND)\/\d{2}\/\d{6,8}$/.test(m)){E.textContent="Invalid matric number format. Example: F/ND/23/3210001";return}
if(pw.length<6){E.textContent="Password must be at least 6 characters.";return}
if(mode==="signup"&&!nm){E.textContent="Please enter your full name.";return}
hs(pw).then(function(h){
if(mode==="signup"){if(ac[m]){E.textContent="Account already exists. Please login.";return}ac[m]={n:nm,h:h};svj("yacc",ac)}
else if(!ac[m]||ac[m].h!==h){E.textContent="Wrong matric number or password.";return}
U={m:m,n:ac[m].n};svj("ysess",U);done()})}
(function(){var ss=ldj("ysess",null),ac=ldj("yacc",{});if(ss&&ac[ss.m]){U=ss;$("wel").textContent="👋 Welcome, "+U.n.split(" ")[0]+"!"}updNav();show("home")})();
function renderDept(){var q=$("dq").value.toLowerCase().trim(),sc=$("ds").value;
var L=(window.DEPTS||[]).filter(function(d){return(!sc||d.s===sc)&&(!q||(d.n+" "+d.l).toLowerCase().indexOf(q)>-1)});
$("dl").innerHTML=L.length?L.map(function(d){return'<div class="card"><b>'+d.n+'</b><span class="tag">'+d.s+'</span><div>'+(d.l?'<span class="pin">📍 '+d.l+'</span>'+(d.d?'<div class="note">'+d.d+'</div>':''):'<span class="soon">Location coming soon</span>')+'</div></div>'}).join(""):'<div class="card">No department found.</div>'}
(function(){var seen={},o="";(window.DEPTS||[]).forEach(function(d){if(!seen[d.s]){seen[d.s]=1;o+='<option>'+d.s+'</option>'}});$("ds").insertAdjacentHTML("beforeend",o);renderDept()})();

var SEL="";
var SCH=[
{s:"Engineering & Technology",t:"Engineering",e:"⚙️",c:"#f2994a",x:95,y:190},
{s:"Science & Computing",t:"Science",e:"🔬",c:"#3b82f6",p:"school-science.jpg"},
{s:"Environmental & Built Environment",t:"Environmental",e:"🏗️",c:"#8b5cf6",x:95,y:350},
{s:"Business & Management",t:"Business",e:"💼",c:"#0ea5a4",p:"school-business.jpg",o:"50% 38%"},
{s:"Art, Design & Communication",t:"Art & Design",e:"🎨",c:"#ec4899",p:"school-art.jpg"},
{s:"Technical Education",t:"Tech Ed",e:"🧰",c:"#eab308",x:265,y:510}];
function renderMap(){var cnt={},D=window.DEPTS||[];D.forEach(function(d){cnt[d.s]=(cnt[d.s]||0)+1});
var o='<div class="sg">';
SCH.forEach(function(k,i){var n=cnt[k.s]||0,cl="sc"+(SEL===k.s?" on":"")+(SEL&&SEL!==k.s?" dim":"");
o+='<div class="'+cl+'" onclick="pickSchool('+i+')">'+(k.p?'<img src="'+k.p+'" alt="'+k.s+'" style="object-position:'+(k.o||"50% 50%")+'">':'<div class="ph" style="background:linear-gradient(135deg,'+k.c+',#10201a)"><span>'+k.e+'</span></div>')+'<div class="ov"><b>'+k.s+'</b><small>'+n+' departments</small></div></div>'});
$("map").innerHTML=o+'</div>';
var t='<button class="'+(SEL?"":"on")+'" onclick="pickSchool(-1)">All</button>';SCH.forEach(function(k,i){t+='<button class="'+(SEL===k.s?"on":"")+'" onclick="pickSchool('+i+')">'+k.e+" "+k.t+"</button>"});$("mt").innerHTML=t}
function pickSchool(i){SEL=i<0?"":SCH[i].s;$("ds").value=SEL;renderDept();renderMap();if(i>=0)$("dl").scrollIntoView({behavior:"smooth",block:"nearest"})}
renderMap();
/* GPA STATISTICS: set API_URL to your hosted server address (e.g. "https://your-api.example.com").
   While it is empty, the page shows that the server is not connected yet. */
var API_URL="";
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function xmsg(t,ok){var m=$("xm");m.style.color=ok?"var(--pr)":"var(--bad)";m.textContent=t}
function shareGPA(){var dp=$("xd").value,lv=$("xl").value,g=parseFloat($("xg").value);
if(!API_URL)return xmsg("Sharing isn't switched on yet. The statistics server is not connected.",false);
if(!$("xc").checked)return xmsg("Please tick the box to agree to share.",false);
if(isNaN(g)||g<0||g>4)return xmsg("GPA must be between 0 and 4.0.",false);
fetch(API_URL+"/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({department:dp,level:lv,gpa:g})})
.then(function(r){return r.json().then(function(d){if(!r.ok)throw new Error(d.error||"Something went wrong");return d})})
.then(function(){xmsg("Saved successfully. Thank you!",true);loadStats()})
.catch(function(e){xmsg("Error: "+(e.message==="Failed to fetch"?"could not reach the server.":e.message),false)})}
function loadStats(){var b=$("xb");if(!API_URL){b.textContent="Statistics will appear here once the server is connected.";return}
fetch(API_URL+"/stats").then(function(r){return r.json()}).then(function(d){
$("xt").textContent=d.total_students;$("xa").textContent=d.average_gpa==null?"-":d.average_gpa;$("xp").textContent=d.distinction_percent+"%";
if(!d.by_department.length){b.textContent="No data yet.";return}
b.innerHTML=d.by_department.map(function(x){var s=x.students<3;return'<div class="xr"><div class="xn"><span>'+esc(x.department)+" ("+x.students+")</span><strong>"+(s?"-":x.average_gpa)+'</strong></div><div class="bbg"><div class="bbar" style="width:'+(s?0:x.average_gpa/4*100)+'%"></div></div>'+(s?'<div class="note">Not enough students yet to show an average</div>':"")+"</div>"}).join("")})
.catch(function(){b.textContent="Could not load statistics right now."})}
(function(){var o="";(window.DEPTS||[]).forEach(function(d){o+="<option>"+esc(d.n)+"</option>"});$("xd").innerHTML=o})();
function findExam(){var m=$("em").value.replace(/\s+/g,"").toUpperCase(),o=$("eo");
if(!/^F\/(ND|HD|HND)\/\d{2}\/\d{6,8}$/.test(m)){o.innerHTML='<p class="note" style="color:var(--bad)">Invalid matric number format. Example: F/ND/23/3210001</p>';return}
var i=m.lastIndexOf("/"),pre=m.slice(0,i+1),n=parseInt(m.slice(i+1),10),s=n%1000;
var L=(window.EXAMS||[]).filter(function(x){if(x.prefix&&x.prefix!==pre)return false;return x.serial?(s>=x.serial[0]&&s<=x.serial[1]):(n>=x.from&&n<=x.to)}).sort(function(a,b){return((a.date||"")+(a.time||""))<((b.date||"")+(b.time||""))?-1:1});
if(!L.length){o.innerHTML='<p class="note">No exam venue found for this matric number yet. Check the number, or ask your department.</p>';return}
o.innerHTML=L.map(function(x){var d=x.date?new Date(x.date+"T00:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}):"",w=[d,x.time].filter(Boolean).join(" · ");
return'<div class="ex"><b>'+esc(x.course||"Your exam venue")+"</b>"+(w?'<span class="note">'+esc(w)+"</span>":"")+'<div class="v">📍 '+esc(x.venue)+"</div>"+(x.note?'<div class="note">'+esc(x.note)+"</div>":"")+"</div>"}).join("")}
/* FIREBASE: live visitor counter + real accounts that work on any device
   Paste your Firebase config below, like:
   var FIREBASE_CONFIG={apiKey:"...",authDomain:"...",databaseURL:"https://YOUR-PROJECT-default-rtdb.firebaseio.com",projectId:"...",appId:"..."};
   While it is null, the site uses device-only accounts and hides the counter. */
var FIREBASE_CONFIG=null;
var CLOUDOK=false,BUSY=false;
function cloudOn(){return !!FIREBASE_CONFIG}
function loadJS(src,cb){var s=document.createElement("script");s.src=src;s.onload=cb;document.head.appendChild(s)}
function auth(){return cloudOn()?authCloud():authLocal()}
function cloudFields(){var c=cloudOn(),su=mode==="signup";
$("aew").classList.toggle("hide",!c);$("gmw").classList.toggle("hide",c&&!su);
$("ax").classList.toggle("hide",!(c&&su));$("axc").classList.toggle("hide",!(c&&su));$("fp").classList.toggle("hide",!(c&&!su));
$("acn").textContent=c?"Your account is saved securely, so you can log in from any device.":"Accounts are saved on this device only."}
var _sm=setMode;setMode=function(m){_sm(m);cloudFields()};
function fbErr(e){var c=(e&&e.code)||"";
if(c==="matric-taken")return"This matric number is already registered. Please login instead.";
if(c==="auth/email-already-in-use")return"This email is already registered. Please login instead.";
if(c==="auth/invalid-credential"||c==="auth/wrong-password"||c==="auth/user-not-found"||c==="auth/invalid-login-credentials")return"Wrong email or password.";
if(c==="auth/invalid-email")return"That email address is not valid.";
if(c==="auth/weak-password")return"Password must be at least 6 characters.";
if(c==="auth/network-request-failed")return"No internet connection. Try again.";
if(c==="auth/too-many-requests")return"Too many tries. Please wait a few minutes.";
return"Something went wrong. Please try again."}
function profileLoaded(u,p,goApp){U={uid:u.uid,m:p.matric||"",n:p.name||u.email,e:u.email};updNav();
$("wel").textContent="👋 Welcome, "+U.n.split(" ")[0]+"!";$("mn").value=U.n;if(p.dept)$("md").value=p.dept;if(p.level)$("ml").value=p.level;$("gp").value="";if(goApp)show("app")}
function authCloud(){var E=$("err"),em=$("ae").value.trim(),pw=$("gp").value;E.style.color="";
if(!CLOUDOK){E.textContent="Connecting... please wait a moment and try again.";return}
if(!em||pw.length<6){E.textContent="Enter your email and a password of at least 6 characters.";return}
var A=firebase.auth(),db=firebase.database();
if(mode==="login"){E.textContent="";A.signInWithEmailAndPassword(em,pw).then(function(c){return db.ref("users/"+c.user.uid).once("value").then(function(s){profileLoaded(c.user,s.val()||{},true)})}).catch(function(e){E.textContent=fbErr(e)});return}
var m=$("gm").value.replace(/\s+/g,"").toUpperCase(),nm=$("ai").value.trim(),dp=$("ad").value,lv=$("al").value;
if(!/^F\/(ND|HD|HND)\/\d{2}\/\d{6,8}$/.test(m)){E.textContent="Invalid matric number format. Example: F/ND/23/3210001";return}
if(!nm){E.textContent="Please enter your full name.";return}
if(!$("ac").checked){E.textContent="Please tick the box to agree.";return}
BUSY=true;E.textContent="Creating your account...";
A.createUserWithEmailAndPassword(em,pw).then(function(c){var u=c.user,key=m.replace(/\//g,"-");
return db.ref("matrics/"+key).set(u.uid).then(function(){var p={name:nm,matric:m,dept:dp,level:lv,email:em,created:firebase.database.ServerValue.TIMESTAMP};
return db.ref("users/"+u.uid).set(p).then(function(){BUSY=false;E.textContent="";profileLoaded(u,p,true)})},function(){return u.delete().then(function(){throw{code:"matric-taken"}})})})
.catch(function(e){BUSY=false;E.textContent=fbErr(e)})}
function forgot(){var E=$("err"),em=$("ae").value.trim();E.style.color="";
if(!CLOUDOK||!em){E.textContent="Type your email above first, then tap Forgot password.";return}
firebase.auth().sendPasswordResetEmail(em).then(function(){E.style.color="var(--pr)";E.textContent="Password reset email sent. Check your inbox and spam folder."},function(e){E.textContent=fbErr(e)})}
function cloudStart(){var B="https://www.gstatic.com/firebasejs/10.12.2/";
loadJS(B+"firebase-app-compat.js",function(){loadJS(B+"firebase-auth-compat.js",function(){loadJS(B+"firebase-database-compat.js",function(){
try{firebase.initializeApp(FIREBASE_CONFIG);CLOUDOK=true;var db=firebase.database(),me=db.ref("online").push();
me.onDisconnect().remove();me.set(true);
db.ref("online").on("value",function(s){$("lo").textContent=s.numChildren();$("live").classList.remove("hide")});
db.ref("visits").on("value",function(s){$("lv").textContent=s.val()||0});
try{if(!sessionStorage.getItem("yv")){sessionStorage.setItem("yv","1");db.ref("visits").transaction(function(v){return(v||0)+1})}}catch(e){}
firebase.auth().onAuthStateChanged(function(u){if(BUSY)return;if(!u){U=null;updNav();return}
db.ref("users/"+u.uid).once("value").then(function(s){profileLoaded(u,s.val()||{},false)})})
}catch(e){}})})})}
(function(){var o="";(window.DEPTS||[]).forEach(function(d){o+="<option>"+esc(d.n)+"</option>"});$("ad").innerHTML=o})();
cloudFields();
if(FIREBASE_CONFIG)cloudStart();

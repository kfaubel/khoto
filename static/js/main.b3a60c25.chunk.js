(this.webpackJsonpkhoto=this.webpackJsonpkhoto||[]).push([[0],{109:function(e,t,n){"use strict";(function(e){var a=n(11),s=n.n(a),o=n(19),r=n(4),i=n(5),c=n(9),l=n(8),u=n(10),m=n(0),d=n.n(m),h=n(23),p=n.n(h),g=(n(139),n(140)),v="aes256",f=function(t){function n(t){var a;return Object(r.a)(this,n),(a=Object(c.a)(this,Object(l.a)(n).call(this,t))).componentDidUpdate=function(e){if(""!==a.props.url)a.setImage(a.props.url);else{var t=document.getElementById("myCanvas");t.width=window.innerWidth,t.height=window.innerHeight;var n=t.getContext("2d");n.fillStyle="grey",n.fillRect(0,0,t.width,t.height)}},a.setImage=Object(o.a)(s.a.mark((function t(){var n,o,r,i,c,l,u;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==a.props.url){t.next=3;break}return console.log("Canvas::setImage Blank url, Skipping."),t.abrupt("return");case 3:return console.log("Canvas::setImage Retreiving: ".concat(a.props.url)),t.prev=4,t.next=7,p()({method:"get",url:a.props.url,responseType:"text",headers:{"Access-Control-Allow-Origin":"*"}});case 7:n=t.sent,o=new e(n.data,"base64"),r=null,""!==a.props.password?(i=g.createHash("sha256").update(String(a.props.password)).digest("base64").substr(0,32),c=e.alloc(16,0),l=g.createDecipheriv(v,i,c),r=e.from(l.update(o),"binary"),r=e.concat([r,l.final()])):(console.log("Canvas::setImage: No key, Skipping decryption."),r=o),(u=new Image).onload=function(){a.showImage(u)},u.onerror=function(){var e=document.getElementById("myCanvas");e.width=window.innerWidth,e.height=window.innerHeight;var t=e.getContext("2d");t.fillStyle="grey",t.fillRect(0,0,e.width,e.height)},u.src="data:image/"+a.props.type+";base64,"+new e(r).toString("base64"),t.next=20;break;case 17:t.prev=17,t.t0=t.catch(4),console.error("Viewer::loadImageList failed: ".concat(t.t0));case 20:case"end":return t.stop()}}),t,null,[[4,17]])}))),a.showImage=function(e){var t=document.getElementById("myCanvas");t.width=window.innerWidth,t.height=window.innerHeight;var n=t.getContext("2d"),a=e.width/e.height,s=t.width,o=s/a;o>t.height&&(s=(o=t.height)*a);var r=0,i=0;s<t.width&&(r=(t.width-s)/2),o<t.height&&(i=(t.height-o)/2),n.fillRect(0,0,t.width,t.height),n.drawImage(e,r,i,s,o)},a}return Object(u.a)(n,t),Object(i.a)(n,[{key:"componentDidMount",value:function(){this.setImage()}},{key:"render",value:function(){return d.a.createElement("canvas",{id:"myCanvas"})}}]),n}(d.a.Component);t.a=f}).call(this,n(7).Buffer)},113:function(e,t,n){e.exports=n(224)},118:function(e,t,n){},136:function(e,t,n){},139:function(e,t,n){},141:function(e,t){},143:function(e,t){},177:function(e,t){},178:function(e,t){},224:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),o=n(108),r=n.n(o),i=(n(118),n(4)),c=n(5),l=n(9),u=n(8),m=n(10),d=n(110),h=n(24),p=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).setSite=function(e){n.setState({site:e.target.value})},n.setName=function(e){n.setState({name:e.target.value})},n.setPassword=function(e){n.setState({password:e.target.value})},n.validateForm=function(){return n.state.email.length>0&&n.state.password.length>0},n.handleSubmit=function(e){e.preventDefault(),n.props.updateCredentials(n.state.site,n.state.name,n.state.password),n.props.history.push("/khoto/viewer")},n.state={site:"",name:"",password:""},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("form",{className:"form-horizontal",onSubmit:this.handleSubmit},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{className:"control-label col-sm-2"},"Site:"),s.a.createElement("div",{className:"col-sm-10"},s.a.createElement("input",{className:"form-control",id:"site",value:this.state.site,onChange:this.setSite}))),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{className:"control-label col-sm-2"},"Name:"),s.a.createElement("div",{className:"col-sm-10"},s.a.createElement("input",{className:"form-control",id:"name",value:this.state.name,onChange:this.setName}))),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",{className:"control-label col-sm-2"},"Password:"),s.a.createElement("div",{className:"col-sm-10"},s.a.createElement("input",{type:"password",className:"form-control",id:"pwd",value:this.state.password,onChange:this.setPassword}))),s.a.createElement("div",{className:"form-group"},s.a.createElement("div",{className:"col-sm-offset-2 col-sm-10"},s.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit"))))}}]),t}(s.a.Component),g=n(11),v=n.n(g),f=n(19),b=n(23),w=n.n(b),y=(n(136),n(109)),E=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("button",{id:"nextButton",className:"btn btn-primary  btn-lg float-button-next",onClick:this.props.handleOnNext},">")}}]),t}(s.a.Component),I=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("button",{id:"prevButton",className:"btn btn-primary  btn-lg float-button-prev",onClick:this.props.handleOnPrev},"<")}}]),t}(s.a.Component),O=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.albums.map((function(e){return s.a.createElement("option",{key:e,value:e},e)}));return s.a.createElement("select",{id:"albumSelect",className:"float-select",value:this.props.selectedAlbum,onChange:this.props.handleChange},e)}}]),t}(s.a.Component),x=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"imageSlider",className:"slidecontainer"},s.a.createElement("input",{className:"slider",id:"myRange",type:"range",min:"0",max:this.props.max,value:this.props.current,onChange:this.props.handleChange}))}}]),t}(s.a.Component),k=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("button",{id:"toggleButton",className:"btn btn-primary float-button-toggle",onClick:this.props.handleOnToggle},"[ - ]")}}]),t}(s.a.Component),L=n(36),S=function(){function e(){Object(i.a)(this,e)}return Object(c.a)(e,null,[{key:"loadSetting",value:function(){var e=Object(f.a)(v.a.mark((function e(t,n,a){var s,o,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s="".concat(L.httpsProxy,"http://").concat(t,"/api/user/").concat(n,"/setting/key/").concat(a),o="",e.prev=2,e.next=5,w()({method:"get",url:s,responseType:"text",headers:{"Access-Control-Allow-Origin":"*"}});case 5:r=e.sent,o=r.data,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),console.log("loadSetting caught for ".concat(a)),o="";case 13:return void 0!==typeof o&&"undefined"!==o||(console.log("Settings::loadSetting query for user: ".concat(n," and key: ").concat(a,' is undefined, setting to ""')),o=""),console.log("Settings: loadSetting result for ".concat(a,": ").concat(o)),e.abrupt("return",o);case 16:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"saveSetting",value:function(){var e=Object(f.a)(v.a.mark((function e(t,n,a,s){var o;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o="".concat(L.httpsProxy,"http://").concat(t,"/api/user/").concat(n,"/setting/key/").concat(a,"/value/").concat(s);try{w()({method:"post",url:o,responseType:"json",headers:{"Access-Control-Allow-Origin":"*"}})}catch(r){console.log("Viewer::saveSetting failed: ".concat(r))}case 2:case"end":return e.stop()}}),e)})));return function(t,n,a,s){return e.apply(this,arguments)}}()}]),e}(),j=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleAlbumChange=function(){var e=Object(f.a)(v.a.mark((function e(t){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target.value,console.log("New Album selected:",a),S.saveSetting(n.props.site,n.props.username,"lastAlbum",a),e.next=5,n.loadImageList(a);case 5:n.imageList=e.sent,n.showNewImage(a,0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.handleSliderChange=function(e){n.showNewImage(n.state.activeAlbum,e.target.value)},n.handleResize=function(){n.showNewImage(n.state.activeAlbum,n.state.activeImageIndex)},n.showNewImage=function(e,t){S.saveSetting(n.props.site,n.props.username,"lastIndex",t);var a="".concat(n.state.baseUrl,"/base64Image/albumName/").concat(e,"/imageName/").concat(n.imageList[t]),s="",o=n.state.password;try{n.imageList[t].endsWith("daj")?s="jpeg":n.imageList[t].endsWith("dag")?s="gif":n.imageList[t].endsWith("dap")?s="png":n.imageList[t].endsWith("jpeg")||n.imageList[t].endsWith("jpg")?(s="jpeg",o=""):n.imageList[t].endsWith("png")?(s="png",o=""):n.imageList[t].endsWith("gif")&&(s="gif",o=""),n.setState({activeUrl:a,imageType:s,activeAlbum:e,imageListLength:n.imageList.length,activeImageIndex:t,imagePassword:o})}catch(r){console.log("ShowNewImage failed, skipping ".concat(r))}},n.loadAlbumList=Object(f.a)(v.a.mark((function e(){var t,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state.baseUrl+"/albums",e.next=3,w()({method:"get",url:t,responseType:"json",headers:{"Access-Control-Allow-Origin":"*"}});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)}))),n.loadImageList=function(){var e=Object(f.a)(v.a.mark((function e(t){var a,s,o;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.state.baseUrl+"/album/albumName/"+t,s=[],e.prev=2,e.next=5,w()({method:"get",url:a,responseType:"json",headers:{"Access-Control-Allow-Origin":"*"}});case 5:o=e.sent,s=o.data,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log("Viewer::loadImageList failed: ".concat(e.t0));case 12:return e.abrupt("return",s);case 13:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}(),n.onNext=function(){if(console.log("App: onNext, index: "+n.state.activeImageIndex),n.state.activeImageIndex<n.state.imageListLength-1){var e=n.state.activeImageIndex;e++,n.showNewImage(n.state.activeAlbum,e)}},n.onPrev=function(){if(console.log("App: onPrev, index: "+n.state.activeImageIndex),n.state.activeImageIndex>0){var e=n.state.activeImageIndex-1;e--,n.showNewImage(n.state.activeAlbum,e)}},n.onKey=function(e){var t=e.which||e.keyCode;32===t||39===t?n.onNext():37===t?n.onPrev():27===t&&n.closeFullscreen()},n.onClick=function(e){console.log("onClick."),n.isInFullScreen()?(console.log("Viewer::onClick",e.button),0===e.button?n.onPrev():1===e.button?n.props.history.push("/khoto/"):2===e.button&&n.onNext()):console.log("Skipping mouse click when not in full screen")},n.onRightClick=function(e){e.preventDefault()},n.onWheel=function(e){console.log("Viewer::onWheel: ",e),e.deltaY<0?n.onPrev():e.deltaY>0?n.onNext():console.log("Viewer::onWheel - not an up/down")},n.onShow=function(){try{n.isInFullScreen()?(document.getElementById("imageSlider").classList.remove("m-fadeOut"),document.getElementById("imageSlider").classList.add("m-fadeIn")):(document.getElementById("prevButton").classList.remove("m-fadeOut"),document.getElementById("nextButton").classList.remove("m-fadeOut"),document.getElementById("albumSelect").classList.remove("m-fadeOut"),document.getElementById("imageSlider").classList.remove("m-fadeOut"),document.getElementById("toggleButton").classList.remove("m-fadeOut"),document.getElementById("prevButton").classList.add("m-fadeIn"),document.getElementById("nextButton").classList.add("m-fadeIn"),document.getElementById("albumSelect").classList.add("m-fadeIn"),document.getElementById("imageSlider").classList.add("m-fadeIn"),document.getElementById("toggleButton").classList.add("m-fadeIn")),void 0!==n.timeout&&clearTimeout(n.timeout),n.timeout=setTimeout((function(){n.onHide()}),2e3)}catch(e){}},n.onHide=function(){try{document.getElementById("prevButton").classList.remove("m-fadeIn"),document.getElementById("nextButton").classList.remove("m-fadeIn"),document.getElementById("albumSelect").classList.remove("m-fadeIn"),document.getElementById("imageSlider").classList.remove("m-fadeIn"),document.getElementById("toggleButton").classList.remove("m-fadeIn"),document.getElementById("prevButton").classList.add("m-fadeOut"),document.getElementById("nextButton").classList.add("m-fadeOut"),document.getElementById("albumSelect").classList.add("m-fadeOut"),document.getElementById("imageSlider").classList.add("m-fadeOut"),document.getElementById("toggleButton").classList.add("m-fadeOut")}catch(e){}},n.handleFullscreenToggle=function(){n.isInFullScreen()?n.closeFullscreen():n.openFullscreen()},n.isInFullScreen=function(){return document.fullscreenElement&&null!==document.fullscreenElement||document.webkitFullscreenElement&&null!==document.webkitFullscreenElement||document.mozFullScreenElement&&null!==document.mozFullScreenElement||document.msFullscreenElement&&null!==document.msFullscreenElement},n.openFullscreen=function(){var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen():e.msRequestFullscreen&&e.msRequestFullscreen()},n.closeFullscreen=function(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()},n.state={baseUrl:"".concat(L.httpsProxy,"http://").concat(n.props.site,"/api/user/").concat(n.props.username),password:n.props.password,activeUrl:"",albumList:["foo"],activeAlbum:"",activeImageIndex:0,imageListLength:0,imageType:"",imagePassword:n.props.password},""===n.props.username&&(console.log("No username.  Pushing to login"),n.props.history.push("/khoto/")),n.imageList=[],n.fullScreen=!1,n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=Object(f.a)(v.a.mark((function e(){var t,n,a,s,o=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.timeout=setTimeout((function(){o.onHide()}),3e3),e.prev=1,e.next=4,this.loadAlbumList();case 4:return t=e.sent,e.next=7,S.loadSetting(this.props.site,this.props.username,"lastAlbum");case 7:return""===(n=e.sent)&&(n=t[0],S.saveSetting(this.props.site,this.props.username,"lastAlbum",n)),e.next=11,this.loadImageList(n);case 11:return this.imageList=e.sent,e.next=14,S.loadSetting(this.props.site,this.props.username,"lastIndex");case 14:""===(a=e.sent)&&(console.log("Viewer::componentDidMount: newActiveImageIndex blank, setting to 0"),a=0),this.showNewImage(n,a),s={albumList:t},this.setState(s),e.next=26;break;case 21:e.prev=21,e.t0=e.catch(1),console.log("Viewer::componentDidMount Catch = ".concat(e.t0,".  Pushing to login")),void 0!==this.timeout&&clearTimeout(this.timeout),this.props.history.push("/khoto/");case 26:document.addEventListener("keydown",this.onKey),document.addEventListener("wheel",this.onWheel),document.addEventListener("mousemove",this.onShow),document.addEventListener("mousedown",this.onClick),document.addEventListener("contextmenu",this.onRightClick),window.addEventListener("resize",this.handleResize);case 33:case"end":return e.stop()}}),e,this,[[1,21]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKey),document.removeEventListener("wheel",this.onWheel),document.removeEventListener("mousemove",this.onShow),document.removeEventListener("mousedown",this.onClick),document.removeEventListener("contextmenu",this.onRightClick),document.removeEventListener("resize",this.handleResize)}},{key:"render",value:function(){return s.a.createElement("div",{id:"myViewer",className:"Viewer"},s.a.createElement(O,{selectedAlbum:this.state.activeAlbum,handleChange:this.handleAlbumChange,albums:this.state.albumList}),s.a.createElement(y.a,{url:this.state.activeUrl,password:this.state.imagePassword,type:this.state.imageType}),s.a.createElement(E,{handleOnNext:this.onNext}),s.a.createElement(I,{handleOnPrev:this.onPrev}),s.a.createElement(x,{max:this.state.imageListLength-1,current:this.state.activeImageIndex,handleChange:this.handleSliderChange}),s.a.createElement(k,{handleOnToggle:this.handleFullscreenToggle}))}}]),t}(s.a.Component),C=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).updateCredentials=function(e,t,a){console.log("App::updateCredentials: site = ".concat(e,", username = ").concat(t,", password = ").concat(a)),n.setState({site:e,username:t,password:a})},n.state={site:"",username:"",password:""},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return console.log("App::render - PUBLIC_URL=".concat("/khoto")),s.a.createElement(d.a,null,s.a.createElement("div",null,s.a.createElement(h.c,null,s.a.createElement(h.a,{path:"/khoto/viewer",render:function(t){return s.a.createElement(j,Object.assign({},t,{site:e.state.site,username:e.state.username,password:e.state.password,component:j}))}}),s.a.createElement(h.a,{path:"/khoto/",render:function(t){return s.a.createElement(p,Object.assign({},t,{updateCredentials:e.updateCredentials}))}}))))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},36:function(e){e.exports=JSON.parse('{"imageserverx":"localhost:7000","httpsProxy":"https://cors-anywhere.herokuapp.com/"}')}},[[113,1,2]]]);
//# sourceMappingURL=main.b3a60c25.chunk.js.map
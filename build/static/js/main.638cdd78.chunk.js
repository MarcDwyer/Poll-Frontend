(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,a){e.exports=a(44)},32:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(22),l=a.n(c),r=(a(32),a(46)),i=a(48),o=a(47);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var u=a(6),m=a.n(u),p=a(7),d=a(8),h=a(9),v=a(11),f=a(10),b=a(12),E=a(13),y=a.n(E),w=a(45),N=function(){return s.a.createElement("div",{className:"navbar-fixed"},s.a.createElement("nav",null,s.a.createElement("div",{className:"nav-wrapper purple accent-1"},s.a.createElement(w.a,{to:"/",className:"brand-logo"},"Poll App"))))},O=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(v.a)(this,Object(f.a)(t).call(this,e))).handleChange=function(e){a.setState({isChecked:e.target.name})},a.handleSubmit=function(){var e=Object(p.a)(m.a.mark(function e(t){var n,s,c,l;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n={_id:a.props.match.params.id,question:a.state.isChecked},e.next=4,fetch("/api/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 4:200===e.sent.status&&(s=a.state,c=s.isChecked,l=s.questions,a.setState({isComplete:!0,submitted:l[c]},function(){a.state.ws.send(JSON.stringify(n)),a.props.history.push("/poll/results/".concat(a.state.questions.Id))}));case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.renderQuestions=function(){var e=a.state.questions;return Object.values(e).filter(function(e){return e.question}).map(function(e,t){var n=e.question;if(n)return s.a.createElement("p",{key:y()()},s.a.createElement("label",null,s.a.createElement("input",{name:"quest".concat(t),type:"radio",checked:a.state.isChecked==="quest".concat(t),onChange:a.handleChange}),s.a.createElement("span",null,n)))})},a.state={isChecked:"quest0",isComplete:!1,submitted:null,questions:null,ws:new WebSocket("ws://".concat(document.location.host,"/sockets/").concat(a.props.match.params.id))},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"componentWillUnmount",value:function(){this.state.ws.close()}},{key:"componentDidMount",value:function(){var e=Object(p.a)(m.a.mark(function e(){var t,a;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getpoll",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.props.match.params.id)});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,this.setState({questions:a});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.ws;return this.state.questions&&1===e.readyState?s.a.createElement("div",null,s.a.createElement(N,null),s.a.createElement("div",{className:"contained"},s.a.createElement("div",{className:"poll"},s.a.createElement("h4",null,this.state.questions.title),s.a.createElement("div",{className:"actualpoll"},s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("ul",null,this.renderQuestions()),s.a.createElement("button",{type:"submit",className:"waves-effect waves-light btn pollbtn"},"Submit Answer")))))):s.a.createElement("div",null,s.a.createElement(N,null),s.a.createElement("div",{className:"contained"},s.a.createElement("div",{className:"preloader-wrapper big active"},s.a.createElement("div",{className:"spinner-layer spinner-blue-only"},s.a.createElement("div",{className:"circle-clipper left"},s.a.createElement("div",{className:"circle"})),s.a.createElement("div",{className:"gap-patch"},s.a.createElement("div",{className:"circle"})),s.a.createElement("div",{className:"circle-clipper right"},s.a.createElement("div",{className:"circle"}))))))}}]),t}(n.Component),k=a(14),j=a(25),g=a(5),C=a(15),S=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(v.a)(this,Object(f.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(g.a)({},e.target.name,e.target.value))},a.renderInput=function(){return Object.keys(a.state).filter(function(e){return e.startsWith("quest")}).map(function(e,t){if(t<a.state.number)return s.a.createElement("div",{key:t,className:"row"},s.a.createElement("div",{className:"input-field col s12"},s.a.createElement("input",{value:a.state[e],id:"item".concat(t),type:"text",className:"validate",name:e,onChange:a.handleChange,placeholder:"Questions #".concat(t+1),autoComplete:"off"})))})},a.handleSubmit=function(){var e=Object(p.a)(m.a.mark(function e(t){var n,s,c,l;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=Object.keys(a.state).filter(function(e){return e.startsWith("quest")}),s=n.filter(function(e){if(a.state[e].length>0)return a.state[e]}).map(function(e){var t;return t={},Object(g.a)(t,e,a.state[e]),Object(g.a)(t,"count",0),t}).reduce(function(e,t,n){var s=Object.keys(t),c=Object(j.a)(s,2),l=c[0],r=c[1];return e[l]=Object(g.a)({question:t[l]},r,0),e.title=a.state.title,e},{}),e.next=5,fetch("/api/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});case 5:return c=e.sent,e.next=8,c.json();case 8:l=e.sent,a.setState({id:l,isComplete:!0,quest0:"",quest1:"",quest2:"",quest3:"",quest4:""});case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.state={error:null,number:2,id:null,title:"",isComplete:!1,copied:!1},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"componentWillMount",value:function(){for(var e=this,t=function(t){var a="quest".concat(t);e.setState(function(e){return Object(k.a)({},e,Object(g.a)({},a,""))})},a=0;a<5;a++)t(a)}},{key:"componentDidUpdate",value:function(e,t){var a=this;!function(){var e=a.state.number,t="quest".concat(e-1);if(a.state[t]&&0!==a.state[t].length){for(var n=0,s=Object.keys(a.state).filter(function(e){return e.startsWith("quest")}),c=a.state,l=0;l<c.number;l++)c[s[l]]&&c[s[l]].length>0&&n++;n===a.state.number&&a.setState({number:a.state.number+1})}}()}},{key:"render",value:function(){var e=this;return this.state.isComplete?s.a.createElement("div",null,s.a.createElement(N,null),s.a.createElement("div",{className:"contained"},s.a.createElement("div",{className:"poll"},s.a.createElement("h4",null,"Poll Submitted"),s.a.createElement("div",{className:"actualpoll"},s.a.createElement("div",{className:"check"},s.a.createElement("i",{className:"fa fa-check"}),s.a.createElement(C.CopyToClipboard,Object(g.a)({text:this.state.value,onCopy:function(){return e.setState({copied:!0})}},"text","".concat(window.location.host,"/poll/survey/").concat(this.state.id)),s.a.createElement("button",{className:"waves-effect waves-light btn purple accent-1 copy"},"Click to copy post url"))),s.a.createElement(w.a,{to:"/poll/survey/".concat(this.state.id),className:"waves-effect waves-light btn pollbtn"},"View Poll"))))):s.a.createElement("div",null,s.a.createElement(N,null),s.a.createElement("div",{className:"contained"},s.a.createElement("div",{className:"poll"},s.a.createElement("h4",null,"Create a poll"),s.a.createElement("div",{className:"actualpoll"},s.a.createElement("div",{className:"check"},s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"input-field col s12"},s.a.createElement("input",{name:"title",value:this.state.title,id:"first_name2",type:"text",onChange:this.handleChange,autoComplete:"off"}),s.a.createElement("label",{className:"active"},"Enter a title"))),s.a.createElement("ul",{className:"marginthis"},this.renderInput()),s.a.createElement("button",{className:"waves-effect waves-light btn pollbtn"},"Submit poll")))))))}}]),t}(n.Component),q=a(23),x=a.n(q),D=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(v.a)(this,Object(f.a)(t).call(this,e))).renderResults=function(){var e=a.state.questions;return e?Object.values(e).filter(function(e){return e.question}).map(function(e){var t=e.question,a=e.count;return s.a.createElement("li",{key:y()(),className:"thevotes"},s.a.createElement("span",null,t),s.a.createElement("span",{className:"votes"},a," Votes"))}):s.a.createElement("li",{className:"thevotes"},s.a.createElement("span",null,"Loading results..."))},a.state={questions:null,ws:new WebSocket("ws://".concat(document.location.host,"/sockets/").concat(a.props.match.params.id)),socketData:null},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"componentWillUnmount",value:function(){this.state.ws.close()}},{key:"componentDidMount",value:function(){var e=Object(p.a)(m.a.mark(function e(){var t,a,n=this;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.state.ws.addEventListener("message",function(e){n.setState({socketData:JSON.parse(e.data)})}),e.next=3,fetch("/api/getpoll",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.props.match.params.id)});case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,this.setState({questions:a});case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e,t){var a=this.state,n=a.socketData,s=a.questions;if(n&&n._id===this.props.match.params.id&&t.socketData!==this.state.socketData){var c=n.question,l=s[n.question];l.count=l.count+1;var r=x()(this.state,{questions:Object(g.a)({},c,{$set:Object(k.a)({},l)})});this.setState(r)}}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement(N,null),s.a.createElement("div",{className:"contained"},s.a.createElement("div",{className:"poll"},s.a.createElement("h4",null,"The results are in!"),s.a.createElement("div",{className:"actualpoll"},s.a.createElement("div",{className:"check"},s.a.createElement("ul",null,this.renderResults())),s.a.createElement(w.a,{to:"/",className:"waves-effect waves-light btn pollbtn"},"Create new poll"),s.a.createElement(C.CopyToClipboard,Object(g.a)({text:this.state.value,onCopy:function(){return e.setState({copied:!0})}},"text","".concat(document.location.host,"/poll/results/").concat(this.props.match.params.id)),s.a.createElement("button",{className:"waves-effect waves-light btn purple accent-1 copyres"},"Copy url to clipboard"))))))}}]),t}(n.Component);l.a.render(s.a.createElement(r.a,null,s.a.createElement(i.a,null,s.a.createElement(o.a,{exact:!0,path:"/poll/survey/:id",component:O}),s.a.createElement(o.a,{exact:!0,path:"/poll/results/:id",component:D}),s.a.createElement(o.a,{path:"/",component:S}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,2,1]]]);
//# sourceMappingURL=main.638cdd78.chunk.js.map
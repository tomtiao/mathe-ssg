(window.webpackJsonp=window.webpackJsonp||[]).push([[13,3,6],{423:function(t,e,n){"use strict";n.r(e);var o={name:"LinkItem",props:["to","icon","title","value"]},r=n(63),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("mu-list-item",{attrs:{button:"",to:t.to,value:t.value}},[t.icon?n("mu-list-item-action",[n("mu-icon",{attrs:{value:t.icon}})],1):t._e(),t._v(" "),n("mu-list-item-title",[t._v(t._s(t.title))])],1)}),[],!1,null,"6eca47ac",null);e.default=component.exports},424:function(t,e,n){var content=n(427);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(7).default)("888f9656",content,!0,{sourceMap:!1})},425:function(t,e,n){"use strict";n.r(e);n(8);var o=n(423);var r=0,l={name:"BarComponent",components:{LinkItem:o.default},data:function(){return{title:"扶朕起来朕还能学",showBar:!0,open:!1,activeItem:"/"}},computed:{trees:function(){return this.$store.state.trees}},watch:{$route:function(t){this.onRouteChange(t),this.open=!1}},beforeMount:function(){window.addEventListener("scroll",this.handleScroll),this.onRouteChange(this.$route)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){var p=window.scrollY;if(p<200)this.showBar=!0;else{var t=p-r;t>10?this.showBar=!1:t<-10&&(this.showBar=!0),r=p}},onRouteChange:function(t){var e=this.$store.getters.url2title(t);this.title=e,document.title=e,this.activeItem=function(t){return"page-tk-tid-page"===t.name?t.params.tid:t.path}(t)}}},c=(n(426),n(63)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.showBar,expression:"showBar"}],attrs:{id:"bar"}},[n("mu-appbar",{attrs:{color:"purple","z-depth":"1"}},[n("mu-button",{attrs:{slot:"left",icon:""},on:{click:function(e){t.open=!t.open}},slot:"left"},[n("mu-icon",{attrs:{value:"menu"}})],1),t._v(" "),n("mu-button",{attrs:{slot:"left",icon:""},on:{click:function(e){return t.$router.go(-1)}},slot:"left"},[n("mu-icon",{attrs:{value:"undo"}})],1),t._v("\n    "+t._s(t.title)+"\n  ")],1),t._v(" "),n("mu-drawer",{attrs:{open:t.open,docked:!1},on:{"update:open":function(e){t.open=e}}},[n("mu-list",{attrs:{"toggle-nested":"",value:t.activeItem}},[t._t("default",(function(){return[n("LinkItem",{attrs:{to:"/",icon:"home",title:"主页",value:"/"}}),t._v(" "),n("mu-divider"),t._v(" "),t._l(t.trees,(function(t){return n("LinkItem",{key:t.name,attrs:{to:"/lesson/"+t.name,icon:"book",title:t.name,value:"/lesson/"+t.name}})})),t._v(" "),n("mu-divider")]})),t._v(" "),n("LinkItem",{attrs:{to:"/settings",icon:"settings",title:"设置",value:"/settings"}}),t._v(" "),n("LinkItem",{attrs:{to:"/about",icon:"info",title:"关于",value:"/about"}})],2)],1)],1)}),[],!1,null,"65a77d2b",null);e.default=component.exports;installComponents(component,{LinkItem:n(423).default})},426:function(t,e,n){"use strict";n(424)},427:function(t,e,n){var o=n(6)(!1);o.push([t.i,"header[data-v-65a77d2b]{width:100%;position:fixed;text-align:left}",""]),t.exports=o},443:function(t,e,n){var content=n(450);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(7).default)("2906fdb9",content,!0,{sourceMap:!1})},449:function(t,e,n){"use strict";n(443)},450:function(t,e,n){var o=n(6)(!1);o.push([t.i,".settings-container[data-v-6139d2ef]{padding:1rem 3rem;text-align:left}@media only screen and (max-width:600px){.settings-container[data-v-6139d2ef]{padding:1rem}}.bt[data-v-6139d2ef]{margin-top:1rem}",""]),t.exports=o},459:function(t,e,n){"use strict";n.r(e);var o=n(425),r={showAnswer:!1,markAnswer:!1,imgScale:1},l={name:"SettingsPage",components:{Bar:o.default},data:function(){return{options:r}},watch:{options:{handler:function(t){localStorage.setItem("options",JSON.stringify(t))},deep:!0}},beforeMount:function(){this.options=this.initOptions()},methods:{reinit:function(){this.options=r},initOptions:function(){var t=localStorage;return null===t.getItem("options")&&t.setItem("options",JSON.stringify(r)),JSON.parse(t.getItem("options"))}}},c=(n(449),n(63)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"settings"},[n("Bar"),t._v(" "),n("div",{staticClass:"app-container shadow"},[n("div",{staticClass:"settings-container"},[n("mu-form",{attrs:{model:t.options,"label-position":"left"}},[n("mu-form-item",{attrs:{prop:"switch",label:"默认显示答案"}},[n("mu-switch",{model:{value:t.options.showAnswer,callback:function(e){t.$set(t.options,"showAnswer",e)},expression:"options.showAnswer"}})],1),t._v(" "),n("mu-form-item",{attrs:{prop:"switch",label:"默认标记答案"}},[n("mu-switch",{model:{value:t.options.markAnswer,callback:function(e){t.$set(t.options,"markAnswer",e)},expression:"options.markAnswer"}})],1),t._v(" "),n("mu-form-item",{attrs:{prop:"slider",label:"图片大小缩放："+t.options.imgScale+"x"}},[n("mu-slider",{attrs:{min:.5,max:2},model:{value:t.options.imgScale,callback:function(e){t.$set(t.options,"imgScale",e)},expression:"options.imgScale"}})],1)],1),t._v(" "),n("mu-divider"),t._v(" "),n("mu-button",{staticClass:"bt",attrs:{flat:"",color:"secondary"},on:{click:t.reinit}},[t._v("\n        重置所有设置\n      ")])],1)])],1)}),[],!1,null,"6139d2ef",null);e.default=component.exports;installComponents(component,{Bar:n(425).default})}}]);
webpackJsonp([4,5],[,,,,,,,,,function(t,e,a){t.exports=a.p+"static/img/dopLstlogo.2999e11.png"},,,,,,,,function(t,e,a){"use strict";var i=a(10),n=a(76),s=a(0),o=a.n(s),r=a(16),l=(a.n(r),a(67)),c=a.n(l),d=a(68),u=a.n(d),p=a(69),m=a.n(p),v=function(){return a.e(0).then(a.bind(null,82))},f=function(){return a.e(2).then(a.bind(null,81))},h=function(){return a.e(1).then(a.bind(null,83))};i.a.use(n.a);var g=new n.a({routes:[{path:"/",name:"Index",component:c.a,meta:{title:function(){return"dopelst"}}},{path:"/login",name:"Login",component:u.a,meta:{title:function(){return"Login | dopelst"}}},{path:"/playlist",name:"Playlist",component:m.a,meta:{title:function(){return"Playlists | dopelst"}}},{path:"/playlist/:id",name:"Playlist-Detail",component:v,meta:{title:function(t){return t.name+" | dopelst"}}},{path:"/faq",name:"FAQ",component:f,meta:{title:function(){return"FAQ | dopelst"}}},{path:"/team",name:"Team",component:h,meta:{title:function(){return"Team | dopelst"}}}]});g.beforeEach(function(t,e,a){o.a.auth().currentUser||"/"===t.path||"/login"===t.path?o.a.auth().currentUser&&"/"===t.path?a("/playlist"):a():a("/login")}),e.a=g},,,function(t,e,a){a(61),a(62);var i=a(2)(a(24),a(74),"data-v-dced5584",null);t.exports=i.exports},,,function(t,e,a){"use strict";var i=a(30),n=a.n(i),s=a(31),o=a.n(s),r="undefined"!=typeof Blob&&function(){try{return Boolean(new Blob)}catch(t){return!1}}(),l=r&&"undefined"!=typeof Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(t){return!1}}(),c="undefined"!=typeof HTMLCanvasElement&&HTMLCanvasElement.prototype.toBlob,d=c||"undefined"!=typeof Uint8Array&&"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof atob,u="undefined"!=typeof FileReader||"undefined"!=typeof URL,p=function(){function t(){n()(this,t)}return o()(t,null,[{key:"resize",value:function(e,a,i){"function"==typeof a&&(i=a,a={width:640,height:480});a.width,a.height;if(!t.isSupported()||!e.type.match(/image.*/))return i(e,!1),!1;if(e.type.match(/image\/gif/))return i(e,!1),!1;var n=document.createElement("img");return n.onload=function(t){var s=n.width,o=n.height,r=!1;if(s>o&&s>a.width?(o*=a.width/s,s=a.width,r=!0):o>a.height&&(s*=a.height/o,o=a.height,r=!0),!r)return void i(e,!1);var l=document.createElement("canvas");l.width=s,l.height=o,l.getContext("2d").drawImage(n,0,0,s,o),i(l.toDataURL(e.type),!0)},t._loadImage(n,e),!0}},{key:"_toBlob",value:function(t,e){var a=t.toDataURL(e),i=a.split(","),n=void 0;n=i[0].indexOf("base64")>=0?atob(i[1]):decodeURIComponent(i[1]);for(var s=new ArrayBuffer(n.length),o=new Uint8Array(s),c=0;c<n.length;c+=1)o[c]=n.charCodeAt(c);var d=i[0].split(":")[1].split(";")[0],u=null;if(r)u=new Blob([l?o:s],{type:d});else{var p=new BlobBuilder;p.append(s),u=p.getBlob(d)}return u}},{key:"_loadImage",value:function(t,e,a){if("undefined"==typeof URL){var i=new FileReader;i.onload=function(e){t.src=e.target.result,a&&a()},i.readAsDataURL(e)}else t.src=URL.createObjectURL(e),a&&a()}},{key:"isSupported",value:function(){return"undefined"!=typeof HTMLCanvasElement&&d&&u}}]),t}();e.a=p},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3),n=a.n(i);e.default={name:"app",data:function(){return{isLogin:!1,navWidth:0,mNavDisp:"none"}},methods:{logoutUser:function(){var t=this;n.a.auth().signOut().then(function(){return t.$router.push({path:"/login"})},function(t){return console.error(t)})},syncRoute:function(t){this.isLogin="/login"===t.path,document.title=t.meta.title&&t.meta.title(t.params)||"dopelst"},openNav:function(){this.navWidth="100%",this.mNavDisp="block"},closeNav:function(){this.navWidth=0,this.mNavDisp="none"}},created:function(){this.$router.push({path:"/"}),this.syncRoute(this.$route)},watch:{$route:function(t){this.closeNav(),this.syncRoute(t)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3),n=a.n(i);e.default={name:"index",methods:{linkClicked:function(){n.a.auth().currentUser?this.$router.push({path:"/playlist"}):this.$router.push({path:"/login"})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3),n=a.n(i);e.default={name:"auth",data:function(){return{email:"",password:"",confirmPassword:"",wantsToSignUp:!1,errormsg:""}},methods:{doGmailLogin:function(){var t=this,e=new n.a.auth.GoogleAuthProvider;n.a.auth().signInWithPopup(e).then(function(e){return t.onSignedIn(),e}).catch(function(e){var a=e.message;t.errormsg=a})},signUpWithPassword:function(){var t=this,e=this.email,a=this.password;this.password===this.confirmPassword?n.a.auth().createUserWithEmailAndPassword(e,a).then(function(){return t.signInWithPassword()}).catch(function(e){var a=e.message;t.errormsg=a}):this.errormsg="Please make sure that your passwords are matching"},signInWithPassword:function(){var t=this,e=this.email,a=this.password;n.a.auth().signInWithEmailAndPassword(e,a).then(function(e){return t.onSignedIn(),e}).catch(function(e){var a=e.message;t.errormsg=a})},onSignedIn:function(){this.$router.push({name:"Playlist"})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(22),n=a.n(i),s=a(70),o=a.n(s),r=a(23);e.default={name:"playlists",components:{PlaylistModal:o.a},firebase:function(){return{userPlaylists:this.playlistsRef.orderByChild("owner").equalTo(this.firebase.auth().currentUser.uid)}},data:function(){var t=this.$root.$data.firebase,e=this.$root.$data.firebaseApp,a=e.database();return{firebase:t,firebaseApp:e,playlistsRef:a.ref("playlists"),playlistImagesRef:a.ref("playlistImages"),playlist:{owner:t.auth().currentUser.uid,name:"",description:"",imageRef:""},currentImage:{},imageUnchanged:!0,createModalVisible:!1,editModalVisible:!1,modalError:""}},mounted:function(){var t=this;this.playlistsRef.orderByChild("owner").equalTo(this.firebase.auth().currentUser.uid).on("value",function(e){var a=e.val();if(a){n()(a).map(function(t){return a[t]}).forEach(function(e,a){t.$nextTick(function(){var i=document.getElementById("playlist-img-"+a);t.playlistImagesRef.child(e.imageRef).on("value",function(t){i.src=t.val()})})})}})},methods:{createPlaylist:function(){var t=this;this.playlist.name.trim()&&this.playlist.description.trim()&&this.currentImage.name?this.uploadImage(function(){t.playlistsRef.push(t.playlist).then(function(){t.closeModal()},function(t){console.error(t)})}):this.modalError="Playlist must have a name, description, and image!"},editPlaylist:function(){var t=this;if(this.playlist.name.trim()&&this.playlist.description.trim()&&this.currentImage.name){var e=this.playlist[".key"];this.imageUnchanged?this.playlistsRef.child(e).update({owner:this.playlist.owner,name:this.playlist.name,description:this.playlist.description}).then(function(){return t.closeModal()},function(t){console.error(t)}):this.uploadImage(function(){t.playlistsRef.child(e).update({owner:t.playlist.owner,name:t.playlist.name,description:t.playlist.description,imageRef:t.playlist.imageRef}).then(function(){t.closeModal()},function(t){console.error(t)})})}else this.modalError="Playlist must have a name, description, and image!"},removePlaylist:function(t){this.playlistsRef.child(t[".key"]).remove()},openPlaylist:function(t){this.$router.push({name:"Playlist-Detail",params:{id:t[".key"],name:t.name}})},onFileChange:function(t){var e=t.target.files||t.dataTransfer.files;e.length&&(this.currentImage=e[0],this.imageUnchanged=!1)},uploadImage:function(t){var e=this,a=function(a){e.playlistImagesRef.push(a).then(function(a){e.playlist.imageRef=a.key,t()},function(t){console.error(t)})};r.a.resize(this.currentImage,{width:250,height:250},function(t,i){if(i)a(t);else{var n=new FileReader;n.addEventListener("load",function(){return a(n.result)}),n.readAsDataURL(e.currentImage)}})},showCreateModal:function(){this.createModalVisible=!0},showEditModal:function(t){this.playlist=t,this.editModalVisible=!0},closeModal:function(){this.createModalVisible=!1,this.editModalVisible=!1,this.resetForms()},resetForms:function(){this.playlist={owner:this.firebase.auth().currentUser.uid,name:"",description:"",imageRef:""},this.currentImage={},this.imageUnchanged=!0,this.modalError="",Array.prototype.slice.call(document.forms).forEach(function(t){return t.reset()})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"playlist-modal",props:["name","playlist","currentImage","imageUnchanged","modalVisible","modalError","closeModal","playlistAction","onFileChange"],data:function(){return{}},computed:{rootId:function(){return this.name.replace(/ /g,"-").toLowerCase()},fileLabelText:function(){return this.currentImage.name||this.imageUnchanged&&"Image Unchanged"||"Choose a File"}},methods:{focusForm:function(){document.getElementById(this.rootId+"-modal-autofocus").focus()},clickFile:function(){document.getElementById(this.rootId+"-modal-fileinput").click()}},mounted:function(){var t=this;document.addEventListener("keydown",function(e){t.modalVisible&&27===e.keyCode&&t.closeModal()})}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,function(t,e,a){a(58);var i=a(2)(a(25),a(71),"data-v-1cef618c",null);t.exports=i.exports},function(t,e,a){a(59);var i=a(2)(a(26),a(72),"data-v-32d1f6ba",null);t.exports=i.exports},function(t,e,a){a(60);var i=a(2)(a(27),a(73),"data-v-46d4d108",null);t.exports=i.exports},function(t,e,a){a(63);var i=a(2)(a(28),a(75),"data-v-f0820a4e",null);t.exports=i.exports},function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"landing"},[i("div",{staticClass:"v-center"},[i("img",{staticClass:"logo",attrs:{src:a(9),alt:"logo"}}),t._v(" "),i("div",{staticClass:"tagline"},[t._v("MANAGE YOUR MUSIC IN ONE PLACE")]),t._v(" "),i("div",{staticClass:"link",on:{click:t.linkClicked}},[t._v("GET STARTED")])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"loginpage"}},[a("form",{staticClass:"auth-form",on:{submit:function(e){e.preventDefault(),t.wantsToSignUp?t.signUpWithPassword():t.signInWithPassword()}}},[a("h1",[t._v(t._s(t.wantsToSignUp?"Sign up":"Login"))]),t._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",name:"email",id:"email",placeholder:"Email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",name:"password",id:"password",placeholder:"Password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.wantsToSignUp,expression:"wantsToSignUp"}]},[a("label",{attrs:{for:"confirm-password"}},[t._v("Confirm Password")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.confirmPassword,expression:"confirmPassword"}],attrs:{type:"password",name:"confirm-password",id:"confirm-password"},domProps:{value:t.confirmPassword},on:{input:function(e){e.target.composing||(t.confirmPassword=e.target.value)}}})]),t._v(" "),a("div",[a("p",[t._v(t._s(t.errormsg))])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.wantsToSignUp,expression:"!wantsToSignUp"}],staticClass:"clearfix btn-group"},[a("button",{staticClass:"signup-submit",attrs:{type:"submit"}},[t._v("Sign in")]),a("br"),t._v(" "),a("button",{staticClass:"signup-button",attrs:{type:"button"},on:{click:function(e){t.wantsToSignUp=!0}}},[t._v("Don't have an account? "),a("b",[t._v(" Sign up ")])]),t._v(" "),a("button",{staticClass:"signin-gmail",on:{click:function(e){e.preventDefault(),t.doGmailLogin(e)}}},[t._v("Sign in using Gmail")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.wantsToSignUp,expression:"wantsToSignUp"}]},[a("button",{staticClass:"signup-submit",attrs:{type:"submit"}},[t._v("Sign up")]),a("br"),t._v(" "),a("button",{staticClass:"signin-button",attrs:{type:"button"},on:{click:function(e){t.wantsToSignUp=!1}}},[t._v("Already have account")])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"playlist"}},[a("section",{attrs:{id:"playlist-view"}},[a("div",{attrs:{id:"header"}},[a("h1",[t._v("Playlists")]),t._v(" "),a("a",{on:{click:function(e){t.showCreateModal()}}},[t._v("ADD PLAYLIST")])]),t._v(" "),a("div",{attrs:{id:"playlist-grid"}},t._l(t.userPlaylists,function(e,i){return a("div",{staticClass:"playlist-element"},[a("img",{staticClass:"playlist-img",attrs:{id:"playlist-img-"+i,alt:e.name},on:{click:function(a){t.openPlaylist(e)}}}),t._v(" "),a("a",{staticClass:"playlist-name",on:{click:function(a){t.openPlaylist(e)}}},[t._v(t._s(e.name))]),t._v(" "),a("button",{on:{click:function(a){t.removePlaylist(e)}}},[t._v("Delete")]),t._v(" "),a("button",{on:{click:function(a){a.preventDefault(),t.showEditModal(e)}}},[t._v("Edit")])])}))]),t._v(" "),a("playlist-modal",{attrs:{name:"Create Playlist",playlist:t.playlist,currentImage:t.currentImage,modalVisible:t.createModalVisible,modalError:t.modalError,closeModal:t.closeModal,playlistAction:t.createPlaylist,onFileChange:t.onFileChange}}),t._v(" "),a("playlist-modal",{attrs:{name:"Edit Playlist",playlist:t.playlist,currentImage:t.currentImage,imageUnchanged:t.imageUnchanged,modalVisible:t.editModalVisible,modalError:t.modalError,closeModal:t.closeModal,playlistAction:t.editPlaylist,onFileChange:t.onFileChange}})],1)},staticRenderFns:[]}},function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("nav",{attrs:{id:"nav-desk"}},[i("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],attrs:{to:"/"}},[i("img",{attrs:{src:a(9),alt:"LOGO",id:"nav-logo"}})]),t._v(" "),i("div",{staticClass:"spacer"},[t._v(" ")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"nav-link",on:{click:t.logoutUser}},[t._v("LOGOUT")]),t._v(" "),i("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"nav-link",attrs:{to:"/faq"}},[t._v("FAQ")]),t._v(" "),i("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"nav-link",attrs:{to:"/team"}},[t._v("TEAM")])],1),t._v(" "),i("div",{staticClass:"sidenav",style:{width:t.navWidth},attrs:{id:"mobile-nav"}},[i("a",{attrs:{href:"javascript:void(0)",id:"closebtn"},on:{click:t.closeNav}},[t._v("×")]),t._v(" "),i("div",{style:{display:t.mNavDisp},attrs:{id:"nav-elements"}},[i("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"nav-link",attrs:{to:"/"}},[t._v("HOME")]),t._v(" "),i("br"),t._v(" "),i("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"nav-link",attrs:{to:"/team"}},[t._v("TEAM")]),t._v(" "),i("br"),t._v(" "),i("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"nav-link",attrs:{to:"/faq"}},[t._v("FAQ")]),t._v(" "),i("br"),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"nav-link",on:{click:t.logoutUser}},[t._v("LOGOUT")])],1)]),t._v(" "),i("nav",{attrs:{id:"nav-mobile"}},[i("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],attrs:{to:"/"}},[i("img",{attrs:{src:a(9),alt:"LOGO",id:"nav-logo"}})]),t._v(" "),i("div",{staticClass:"spacer"},[t._v(" ")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticClass:"nav-link",attrs:{id:"menu-btn"},on:{click:t.openNav}},[t._v("☰")])],1),t._v(" "),i("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"modal"},on:{"after-enter":t.focusForm}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.modalVisible,expression:"modalVisible"}],staticClass:"modal modal-mask",attrs:{id:t.rootId+"-modal",transition:"modal"},on:{click:t.closeModal}},[a("div",{staticClass:"modal-wrapper"},[a("div",{staticClass:"modal-container",on:{click:function(t){t.stopPropagation()}}},[a("div",{staticClass:"modal-body"},[a("div",{staticClass:"modal-label",attrs:{id:t.rootId+"-modal-label"}},[t._v(t._s(t.name))]),t._v(" "),a("form",{staticClass:"modal-form",attrs:{id:t.rootId+"-modal-form"},on:{submit:function(e){e.preventDefault(),t.playlistAction(e)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.playlist.name,expression:"playlist.name"}],staticClass:"modal-autofocus",attrs:{id:t.rootId+"-modal-autofocus",type:"text",name:"name",placeholder:"Playlist Name"},domProps:{value:t.playlist.name},on:{input:function(e){e.target.composing||(t.playlist.name=e.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.playlist.description,expression:"playlist.description"}],attrs:{type:"text",name:"description",placeholder:"Playlist Description"},domProps:{value:t.playlist.description},on:{input:function(e){e.target.composing||(t.playlist.description=e.target.value)}}}),t._v(" "),a("div",[a("input",{staticClass:"modal-fileinput",attrs:{id:t.rootId+"-modal-fileinput",type:"file",name:"file"},on:{change:t.onFileChange}}),t._v(" "),a("label",{attrs:{for:"file"},on:{click:t.clickFile}},[t._v(t._s(t.fileLabelText))])]),t._v(" "),a("div",[a("input",{attrs:{type:"submit"},domProps:{value:t.name},on:{submit:function(e){e.preventDefault(),t.playlistAction(e)}}})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.modalError,expression:"modalError"}],staticClass:"modal-error"},[t._v("Error: "+t._s(t.modalError))])]),t._v(" "),a("button",{staticClass:"modal-cancel",attrs:{id:t.rootId+"-modal-cancel"},on:{click:t.closeModal}},[t._v("Cancel")])])])])])])},staticRenderFns:[]}},,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(10),n=a(3),s=a.n(n),o=a(21),r=a.n(o),l=a(19),c=a.n(l),d=a(18),u=a.n(d),p=a(20),m=a.n(p),v=a(17),f={apiKey:"AIzaSyAieH1g0trAjkHGDBbmuSV2iKPQXwTYz7Y",authDomain:"dopelst-a697d.firebaseapp.com",databaseURL:"https://dopelst-a697d.firebaseio.com",storageBucket:"dopelst-a697d.appspot.com",messagingSenderId:"492354135751"},h=s.a.initializeApp(f);i.a.config.productionTip=!1,i.a.use(r.a),new i.a({el:"#app",router:v.a,template:"<App/>",components:{App:m.a},data:{firebase:s.a,firebaseApp:h}}),"serviceWorker"in navigator&&("https:"===window.location.protocol||"localhost"===window.location.hostname)&&window.addEventListener("load",function(){var t=c.a.register({scope:"/",excludes:["** /*.hot-update.*"]});u()(t,{onInstalled:function(){},onUpdateReady:function(){},onUpdating:function(){},onUpdateFailed:function(){},onUpdated:function(){}})})}],[78]);
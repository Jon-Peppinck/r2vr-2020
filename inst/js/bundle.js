!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/js/",n(n.s=0)}([function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}s((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var i,a,u,s,l,c=n(1),d=[],f=!1;document.addEventListener("DOMContentLoaded",(function(){var e;C(),i=null===(e=document.getElementById("user"))||void 0===e?void 0:e.className,a=h(),u=[{imgId:a.imageId,isAnnotated:!1}]})),AFRAME.registerComponent("coral-cover-2d-buttons",{init:function(){document.querySelector("[button-controls]").addEventListener("buttondown",(function(){f?b(l,!0):d=[]}))}}),AFRAME.registerComponent("intersection",{init:function(){this.el.addEventListener("raycaster-intersection",(function(e){if(e){if((d=e.detail.els).length>2)return d=[];m()}}))}});var m=function(){if(s){var e=g();d.some((function(t){return t.id==="marker"+e||t.id==="markerCircumference"+e||t.id==="menuCoral"+e||t.id==="menuNotCoral"+e||t.id==="coralText"+e||t.id==="notCoralText"+e}))?(f=!0,p(),v()):(f=!1,b(e))}},p=function(){var e=g();l=e,d.some((function(t){return t.id==="menuCoral"+e||t.id==="coralText"+e}))&&(y(e,1),b(e))},v=function(){var e=g();l=e,d.some((function(t){return t.id==="menuNotCoral"+e||t.id==="notCoralText"+e}))&&(y(e,0),b(e))},b=function(e,t){var n,r,o,i;void 0===t&&(t=!1),t?(null===(n=document.getElementById("menuCoral"+e))||void 0===n||n.setAttribute("visible","true"),null===(r=document.getElementById("menuNotCoral"+e))||void 0===r||r.setAttribute("visible","true")):(f=!1,null===(o=document.getElementById("menuCoral"+e))||void 0===o||o.setAttribute("visible","false"),null===(i=document.getElementById("menuNotCoral"+e))||void 0===i||i.setAttribute("visible","false"))},h=function(){var e,t=null===(e=document.getElementById("canvas2d").getAttribute("class"))||void 0===e?void 0:e.split("/").pop(),n=null==t?void 0:t.split(".")[0];return{imgFilename:t,imageId:n}},g=function(){var e=d[0].id.match(/(\d+)/);if(e)return+e[0];throw new Error("It should never occur that a marker is intersected and it does not contain a corresponding ID")},y=function(e,t){var n=h(),r=n.imgFilename,o=n.imageId;u[u.length-1].imgId!==o&&(u[u.length-1].isAnnotated=!0,s++,u.push({imgId:o,isAnnotated:!1}));var a=document.getElementById("markerContainer"+e);if("false"===(null==a?void 0:a.getAttribute("marked"))){var l=a.getAttribute("position").x,c=a.getAttribute("position").y;a.setAttribute("marked","true"),O({image_id:o,image_file:r,site:+e,x:l,y:c,observation_number:s+1,observer:i,is_coral:t})}else _({image_id:o,observation_number:s+1,site:+e},t)},C=function(){fetch("https://r2vr.herokuapp.com/annotated-image/last-observation-number",{method:"GET",headers:{Accept:"application/json"}}).then((function(e){if(200!==e.status)throw new Error("Unable to retrieve last observation number!");e.json().then((function(e){s=e.observation_number}))})).catch((function(e){throw new Error(e+" - Unable to retrieve last observation number!")}))},O=function(e){return r(void 0,void 0,void 0,(function(){var t,n;return o(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,fetch("https://r2vr.herokuapp.com/annotated-image/post-response",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})];case 1:if(t=r.sent(),![200,201].includes(t.status))throw new Error("Unable to post annotation!");return c.setMarkerColor(e.site,e.is_coral),console.log("Request complete! response:",t,t.status),[3,3];case 2:throw n=r.sent(),new Error(n+" - Unable to post annotation!");case 3:return[2]}}))}))},_=function(e,t){return r(void 0,void 0,void 0,(function(){var n,r,i,a,u,s,l;return o(this,(function(o){switch(o.label){case 0:if((null==(n=document.getElementById("markerCircumference"+e.site))?void 0:n.getAttribute("color"))===c.CORAL_COLOR&&1===t)return console.log("Coral is already selected!"),[2];if((null==n?void 0:n.getAttribute("color"))===c.NOT_CORAL_COLOR&&0===t)return console.log("Not coral is already selected!"),[2];o.label=1;case 1:return o.trys.push([1,5,,6]),[4,fetch("https://r2vr.herokuapp.com/annotated-image/find-marker-id",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})];case 2:if(r=o.sent(),![200].includes(r.status))throw new Error("Unable to find the ID of the corresponding marker!");return[4,r.json()];case 3:return i=o.sent(),a=i.id,u={is_coral:t,id:a},[4,fetch("https://r2vr.herokuapp.com/annotated-image/update-response",{method:"PUT",body:JSON.stringify(u),headers:{"Content-Type":"application/json"}})];case 4:if(s=o.sent(),![200].includes(s.status))throw new Error("Unable to update annotation!");return c.setMarkerColor(e.site,u.is_coral),console.log("updatedResponse:",s),[3,6];case 5:throw l=o.sent(),new Error(l+" - Unable to update annotation");case 6:return[2]}}))}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CORAL_COLOR="#FF95BC",t.NOT_CORAL_COLOR="#969696",t.setMarkerColor=function(e,n){var r=document.getElementById("markerCircumference"+e);1===n?null==r||r.setAttribute("color",t.CORAL_COLOR):null==r||r.setAttribute("color",t.NOT_CORAL_COLOR)},console.log(123123123,"marker-color.ts")}]);
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{7460:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(5893),a=n(9008),s=function(){return(0,r.jsx)("footer",{className:"w-full p-16 bg-gray-100 text-gray-600",children:(0,r.jsx)("nav",{className:"container mx-auto flex items-center justify-between flex-wrap"})})},o=function(e){return(0,r.jsxs)("div",{className:"font-sans antialiased text-gray-900",children:[(0,r.jsx)("main",{children:e.children}),(0,r.jsx)(s,{})]})},i=n(7294),l=n(8279),c=n(640),h=n.n(c),d=n(5520),u=function(e){return(0,r.jsx)(d.rs,{show:e.show,duration:200,easing:d.rs.easings.easeInOutSine,style:{height:"auto"},start:{height:0,opacity:0,overflow:"hidden"},children:e.children})};var m=n(6156),x=n(5913);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){(0,m.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e){var t=e.texts,n=(0,i.useState)(0),a=n[0],s=n[1],o=(0,i.useState)(!1),l=o[0],c=o[1],h=(0,x.YF)({open:l,onOpenChange:c}),d=h.context,m=h.x,f=h.y,g=h.reference,b=h.floating,j=h.strategy,y=(0,x.NI)([(0,x.eS)(d)]),w=y.getReferenceProps,v=y.getFloatingProps;y.getItemProps;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u,{show:"\n"===t[0],children:(0,r.jsx)("span",{className:"hover:bg-green-200",children:(0,r.jsx)("br",{})})}),(0,r.jsxs)("span",p(p({className:"hover:bg-green-200",ref:g},w()),{},{children:[t[a]," "]})),l&&(0,r.jsx)("div",p(p({className:"bg-yellow-100 text-sm",ref:b,style:{position:j,top:null!==f&&void 0!==f?f:0,left:null!==m&&void 0!==m?m:0}},v()),{},{children:t.filter((function(e,t){return t!==a})).map((function(e,t){return(0,r.jsx)("p",{className:"hover:bg-blue-200 text-sm",onClick:function(){s((function(e){return t<e?t:t+1})),c(!1)},children:e},t)}))}))]})}function b(){var e=(0,i.useState)(""),t=e[0],n=e[1],a=(0,i.useState)(""),s=(a[0],a[1]),o=(0,i.useState)([[]]),c=o[0],d=o[1],m=(0,i.useState)(!1),x=m[0],f=m[1],p=(0,i.useMemo)((function(){return t.length<=0||t.length>500||x}),[t,x]),b=(0,i.useRef)(null),j=function(){document.getElementById("outputText").contentEditable="true"};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.x7,{toastOptions:{className:"bg-gray-50 shadow-sm font-medium"}}),(0,r.jsx)("header",{className:"bg-white",children:(0,r.jsx)("div",{className:"px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8",children:(0,r.jsx)("h1",{className:"text-5xl font-bold leading-tight text-center text-gray-900",children:"An Gocair: Gaelic Standardiser"})})}),(0,r.jsx)("main",{children:(0,r.jsxs)("section",{className:"py-4 mx-auto border border-gray-100 rounded-lg shadow-sm max-w-7xl sm:px-6 lg:px-4",children:[(0,r.jsx)("div",{className:"p-4 sm:px-0",children:(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-x-1",children:[(0,r.jsxs)("label",{htmlFor:"inputText",children:[(0,r.jsx)("span",{className:"block pb-2 text-center text-gray-600 md:hidden",children:"Text to normalise"}),(0,r.jsx)("span",{className:"hidden pb-2 text-center text-gray-600 md:block",children:"Enter the text you want to normalise"}),(0,r.jsx)("textarea",{name:"inputText",className:"block w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-96 disabled:opacity-60 sm:text-sm md:text-lg focus:outline-none focus:ring focus:border-blue-600",placeholder:"Enter the text you want to normalise.",value:t,onChange:function(e){n(e.target.value)},disabled:x,ref:b})]}),(0,r.jsxs)("label",{htmlFor:"outputText",children:[(0,r.jsx)("span",{className:"block pb-2 text-center text-gray-600",children:"Normalised text"}),(0,r.jsx)("div",{id:"outputText",className:"block w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-96 disabled:opacity-60 sm:text-sm md:text-lg focus:outline-none focus:ring focus:border-blue-600 overflow-y:scroll",style:{overflowY:"scroll"},children:c.map((function(e,t){return(0,r.jsx)(g,{texts:e},t)}))})]})]})}),(0,r.jsxs)("div",{className:"relative flex items-center justify-center",children:[(0,r.jsxs)("div",{className:"absolute left-0",children:[(0,r.jsx)("span",{className:"font-medium ".concat(t.length>500?"text-red-600":"text-green-600"),children:t.length}),(0,r.jsx)("span",{className:"text-gray-500",children:"/500 Characters"}),(0,r.jsx)("span",{className:" block font-medium ".concat(t.length>500?"text-blue-500":"hidden"),children:(0,r.jsx)("a",{href:"mailto:amitgaur.web@gmail.com",children:"Contact us to get more than 500 characters."})})]}),(0,r.jsxs)("button",{type:"button",className:"flex justify-content:space-between items-center justify-center max-w-md px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50",onClick:function(){var e=["Cha'n 'eil mi 'fuirach 'nam thigh m\xf3r an-seo ann an \xc9irinn, gu mi-fhortanach, ach siod a' cheud tigh a bh' agam-sa","bhu ad a fuireach ann an Inhbir-N\xecs an uar sen.","Luchd-reic Charbad, Acuinn agus Thruncaichean.","Tha ar prisean iosal, agus tha 'm bathar dhe'n t-seorsa 's fhearr.","Th\xf2isich leann-dubh air buaidh fhaotainn air M\xe0iri bhochd.","TD MU DHAOINE GHEIBH BOGADH BATHAIDH, ATH-BHEOTHACHADH.","'S \xe9 'n duine nuadh a theirear ris an nuadh chreatuir so,","Tha an cogadh a sior dhol air adhart ann an Cuba.","Cha robh esan a' dol na bu mhiosa; cha robh s\xecon na b' fhe\xe0rr. Dh'fhalbh i seo far a robh an sagart. Dh'innis an sagart gu feumadh ise a' chlann a chur do home. Cha robh rathad aice a bhith be\xf2 mar siod. Dh'fheumadh i feuchainn ri rud-eigin a chosnadh dhi fh\xe9in."],t=e[Math.floor(Math.random()*e.length)];n(t)},children:[(0,r.jsxs)("svg",{className:"w-6 h-6 mr-2 -ml-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("title",{children:"Example"}),(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 8h10M7 12h4m1\\ 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"})]}),"Example"]}),(0,r.jsxs)("button",{type:"button",className:"flex items-center justify-center max-w-md py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md disabled:opacity-60 px-7 hover:bg-blue-700 md:py-3 md:text-lg md:px-10",onClick:function(){f(!0);var e=l.ZP.loading("Paraphrasing...");Promise.all(function(e,t,n){for(var r=[],a="",s=0;s<e.length;s++){var o=e.charAt(s);if((a+=o).length>=t&&o.match(/[\r\n.?!]/))r.push(a),a="";else if(a.length>=n){var i=a.lastIndexOf(" ");r.push(a.substring(0,i)),a=a.substring(i+1)}}""!=a&&r.push(a);for(var l=[],c=0;c<r.length;c++)for(var h=r[c].split(/(?=\n)/g),d=0;d<h.length;d++)"\n"===h[d]?l.push(h[d]):l.push(h[d].trim());return l.filter(Boolean)}(t,32,128).map((function(e){var t=new URL("".concat(location.origin,"/paraphrase"));return t.searchParams.append("text",e),fetch(t.toString()).then((function(e){return e&&e.ok?e.json().then((function(e){return"\n"===e.text[0]?e.text:e.data})):Promise.reject()}))}))).then((function(e){d(e),l.ZP.success("Successfully paraphrased. Enjoy!")}),(function(e){l.ZP.error("We ran into an issue when trying to paraphrase. Please try again later.")})).finally((function(){l.ZP.dismiss(e),f(!1),j()}))},disabled:p,children:[x?(0,r.jsxs)("svg",{className:"w-5 h-5 mr-3 -ml-1 text-white animate-spin",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,r.jsx)("circle",{className:"opacity-25",cx:12,cy:12,r:10,stroke:"currentColor",strokeWidth:4}),(0,r.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}):(0,r.jsx)("svg",{className:"w-6 h-6 mr-2 -ml-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"})}),x?"Normalising...":"Normalise"]}),(0,r.jsxs)("div",{className:"absolute right-0 flex justify-center align-middle",children:[(0,r.jsx)(u,{show:t.length>10&&t.length<500,children:(0,r.jsxs)("button",{type:"button",className:"flex items-center justify-center max-w-md px-4 py-2 mx-2 font-medium text-red-500 border border-transparent rounded-md hover:text-red-600 focus:text-red-600 bg-red-50",onClick:function(){n(""),s(""),l.ZP.success("Successfully cleared content.")},children:[(0,r.jsxs)("svg",{className:"w-6 h-6 mr-2 -ml-1",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("title",{children:"Clear all"}),(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})]}),"Clear all"]})}),(0,r.jsx)(u,{show:!0,children:(0,r.jsxs)("button",{type:"button",className:"flex items-center justify-center max-w-md px-4 py-2 font-medium text-gray-500 border border-transparent rounded-md hover:text-blue-600 focus:text-blue-600 bg-gray-50",onClick:function(){for(var e=document.getElementById("outputText").getElementsByTagName("span"),t="",n=0;n<e.length;n++){var r=e[n];"<br>"===r.innerHTML?t+="\n":t+=r.innerHTML}h()(t),l.ZP.success("Copied result in your clipboard. Enjoy!")},children:[(0,r.jsxs)("svg",{className:"w-6 h-6 mr-2 -ml-1",fill:"currentColor",viewBox:"0 0 20 20",children:[(0,r.jsx)("title",{children:"Copy result"}),(0,r.jsx)("path",{d:"M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"}),(0,r.jsx)("path",{d:"M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"})]}),"Copy result"]})})]})]})]})})]})}function j(){return(0,r.jsxs)("div",{children:[(0,r.jsxs)(a.default,{children:[(0,r.jsx)("title",{children:"An Gocair: Gaelic Standardiser"}),(0,r.jsx)("meta",{name:"description",content:"Gaelic Text Normaliser normalises the preGOC to GOC Gaelicthe using Transformer based model. Use the normalising tool, to help normalise the story."}),(0,r.jsx)("link",{rel:"icon",href:"http://xiha.hate.codes/sslab/favicon.png"})]}),(0,r.jsx)(o,{children:(0,r.jsx)(b,{})})]})}},5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7460)}])}},function(e){e.O(0,[774,493,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
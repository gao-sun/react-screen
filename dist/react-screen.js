"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function preventDefault(e){e=e||window.event,e.preventDefault&&e.preventDefault(),e.returnValue=!1}function preventDefaultForScrollKeys(e){if(scrollKeys[e.keyCode])return preventDefault(e),!1}function disableScroll(){window.addEventListener&&window.addEventListener("DOMMouseScroll",preventDefault,!1),window.onwheel=preventDefault,window.onmousewheel=document.onmousewheel=preventDefault,window.ontouchmove=preventDefault,document.onkeydown=preventDefaultForScrollKeys}function enableScroll(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",preventDefault,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null}Object.defineProperty(exports,"__esModule",{value:!0}),exports.ScreenSlice=exports.Screen=void 0;var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_react=require("react"),_react2=_interopRequireDefault(_react),scrollKeys={37:1,38:1,39:1,40:1},Screen=exports.Screen=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.scrollListener=r.debounce.bind(r,r.handleScroll,2),r.removeWrapperTimeoutId=null,r.prevIndex=-1,r.length=0,r.sliceHeight=60,r.delay=500,r.showSkip=!0,r.length=Array.isArray(e.children)?e.children.length:1,void 0!=e.delay&&(r.delay=e.delay),void 0!=e.sliceHeight&&(r.sliceHeight=e.sliceHeight),void 0!=e.showSkip&&(r.showSkip=e.showSkip),r}return _inherits(t,e),_createClass(t,[{key:"blockAt",value:function(e){return void 0!=this.refs["slice-"+e]?this.refs["slice-"+e]:null}},{key:"getPosition",value:function(e){for(var t=0,r=0;null!=e;t+=e.offsetLeft,r+=e.offsetTop,e=e.offsetParent);return{x:t,y:r}}},{key:"debounce",value:function(e,t){var r=this;clearTimeout(e._tId),e._tId=setTimeout(function(){e.bind(r)()},t)}},{key:"blockScrollForAnimation",value:function(){disableScroll(),setTimeout(function(){enableScroll()},this.delay)}},{key:"skip",value:function(){window.scrollTo(0,this.getPosition(this.refs.gap).y+this.refs.gap.offsetHeight)}},{key:"handleScroll",value:function(){var e=this,t=this.length,r=window.innerHeight,n=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,s=this.getPosition(this.refs.gap).y,o=s-.5*r,i=this.refs.gap.offsetHeight,l=Math.floor((n-o)/(i/t));l>=0&&l<t?(this.refs.background.classList.remove("out"),clearTimeout(this.removeWrapperTimeoutId),this.refs.wrapper.classList.remove("out"),this.removeWrapperTimeoutId=null):(this.refs.background.classList.add("out"),null==this.removeWrapperTimeoutId&&(this.removeWrapperTimeoutId=window.setTimeout(function(){e.refs.wrapper.classList.add("out")},500))),l>=0&&l<t?(this.refs.progress.classList.remove("hide"),this.refs["progress-bar"].style.height=(n-o)/i*100+"%"):this.refs.progress.classList.add("hide"),this.showSkip&&l>=0&&l<t?this.refs.skip.classList.remove("hide"):this.refs.skip.classList.add("hide");for(var a=0;a<t;++a)a==l?(this.delay>0&&this.prevIndex!=l&&this.blockScrollForAnimation(),this.blockAt(a).animateIn(),this.refs["number-"+a].classList.add("active")):(this.blockAt(a).animateOut(),this.refs["number-"+a].classList.remove("active"));this.prevIndex=l}}]),_createClass(t,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.scrollListener),this.handleScroll()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.scrollListener)}},{key:"render",value:function(){for(var e=this,t=[],r=0;r<this.length;++r)t.push(_react2.default.createElement("div",{key:"number-"+r,className:"item"},_react2.default.createElement("div",{className:"number",ref:"number-"+r},r+1)));var n=0,s=_react2.default.Children.map(this.props.children,function(t){return _react2.default.cloneElement(t,{ref:"slice-"+n++,style:e.props.style})});return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"react-screen-gap",ref:"gap",style:{height:this.sliceHeight*this.length+"vh"}}),_react2.default.createElement("div",{className:"react-screen-wrapper out",ref:"wrapper"},_react2.default.createElement("div",{className:"react-screen-background in out",ref:"background",style:this.props.style}),s,_react2.default.createElement("div",{className:"react-screen-progress hide",ref:"progress"},t,_react2.default.createElement("div",{className:"bar",ref:"progress-bar"})),_react2.default.createElement("div",{className:"react-screen-skip",ref:"skip",onClick:this.skip.bind(this)},"SKIP")))}}]),t}(_react.Component),ScreenSlice=exports.ScreenSlice=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"cleanUp",value:function(){this.refs.screen.classList.remove("in"),this.refs.screen.classList.remove("out")}},{key:"animateIn",value:function(){this.cleanUp(),this.refs.screen.classList.add("in")}},{key:"animateOut",value:function(){this.cleanUp(),this.refs.screen.classList.add("out")}},{key:"render",value:function(){return _react2.default.createElement("div",{ref:"screen",className:"react-screen",style:this.props.style},this.props.children)}}]),t}(_react.Component);
# jacky10000.github.com
面试遇到的一些趣题

# HTML
1、h5的新特性  
新增选择器 document.querySelector、document.querySelectorAll
拖拽释放(Drag and drop) API
媒体播放的 video 和 audio
本地存储 localStorage 和 sessionStorage
离线应用 manifest          在html标签上加这个属性manifest="demo.appcache"
桌面通知 Notifications
语意化标签 article、footer、header、nav、section
增强表单控件 calendar、date、time、email、url、search
地理位置 Geolocation       
多任务 webworker						     后台运行的js，不会阻塞当前页面的js
全双工通信协议 websocket      一个类似于ajax的东西，不过只需要一次连接，除非服务器关闭连接，不然就会一直连接，本质是基于TCL协议的应用层协议
历史管理 history
跨域资源共享(CORS) Access-Control-Allow-Origin
页面可见性改变事件 visibilitychange
跨窗口通信 PostMessage
Form Data 对象
绘画 canvas  

2、浏览器是如何渲染页面的？  
渲染的流程如下：
1.解析HTML文件，创建DOM树。自上而下，遇到任何样式（link、style）与脚本（script）都会阻塞（外部样式不阻塞后续外部脚本的加载）。
2.解析CSS。优先级：浏览器默认设置<用户设置<外部样式<内联样式<HTML中的style样式；
3.将CSS与DOM合并，构建渲染树（Render Tree）
4.布局和绘制，重绘（repaint）和重排（reflow）  

3、重绘  
由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，例如outline, visibility, color、background-color等，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。  

4、回流  
回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流
回流必定会发生重绘，重绘不一定会引发回流。  

5、介绍一下你对浏览器内核的理解？
1浏览器内核一般被分为两个部分：渲染引擎和JS引擎 
渲染引擎：负责取得网页的内容(HTML,XML,图像等等)，整理讯息(引入CSS等)，通过计算来显示出网页(这个过程也称为回流)，然后输出至显卡，最后渲染为网页(这个过程称为重绘)
JS引擎：获取网页的JS部分用来解析和执行以实现网页的动态效果
2最开始渲染引擎和JS引擎没有太大的区别，但是随着JS的发展并独立，内核就只指渲染引擎了  

6、从输入url到显示页面，都经历了什么
第一步：客户机提出域名解析请求,并将该请求发送给本地的域名服务器。
第二步：当本地的域名服务器收到请求后,就先查询本地的缓存,如果有该纪录项,则本地的域名服务器就直接把查询的结果返回。
第三步：如果本地的缓存中没有该纪录,则本地域名服务器就直接把请求发给根域名服务器,然后根域名服务器再返回给本地域名服务器一个所查询域(根的子域)的主域名服务器的地址。
第四步：本地服务器再向上一步返回的域名服务器发送请求,然后接受请求的服务器查询自己的缓存,如果没有该纪录,则返回相关的下级的域名服务器的地址。
第五步：重复第四步,直到找到正确的纪录。

第2种解释：
一般会经历以下几个过程：
1、首先，在浏览器地址栏中输入url
2、浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕中显示页面内容。若没有，则跳到第三步操作。
3、在发送http请求前，需要域名解析(DNS解析)(DNS（域名系统，Domain Name System）是互联网的一项核心服务，它作为可以将域名和IP地址相互映射的一个分布式数据库，能够使人更方便的访问互联网，而不用去记住IP地址。)，解析获取相应的IP地址。
4、浏览器向服务器发起tcp连接，与浏览器建立tcp三次握手。（TCP即传输控制协议。TCP连接是互联网连接协议集的一种。）
5、握手成功后，浏览器向服务器发送http请求，请求数据包。
6、服务器处理收到的请求，将数据返回至浏览器
7、浏览器收到HTTP响应
8、读取页面内容，浏览器渲染，解析html源码
9、生成Dom树、解析css样式、js交互
10、客户端和服务器交互
11、ajax查询  

1、输入网址
2、DNS解析(1、请求一旦发起，浏览器首先要做的事情就是解析这个域名，一般来说，浏览器会首先查看本地硬盘的 hosts 文件，看看其中有没有和这个域名对应的规则，如果有的话就直接使用 hosts 文件里面的 ip 地址。

      	2、如果在本地的 hosts 文件没有能够找到对应的 ip 地址，浏览器会发出一个 DNS请求到本地DNS服务器 。本地DNS服务器一般都是你的网络接入服务器商提供，比如中国电信，中国移动。

　   		3、查询你输入的网址的DNS请求到达本地DNS服务器之后，本地DNS服务器会首先查询它的缓存记录，如果缓存中有此条记录，就可以直接返回结果，此过程是递归的方式进行查询。如果没有，本地DNS服务器还要向DNS根服务器进行查询。

　　		4、根DNS服务器没有记录具体的域名和IP地址的对应关系，而是告诉本地DNS服务器，你可以到域服务器上去继续查询，并给出域服务器的地址。这种过程是迭代的过程。

　　		5、本地DNS服务器继续向域服务器发出请求，在这个例子中，请求的对象是.com域服务器。.com域服务器收到请求之后，也不会直接返回域名和IP地址的对应关系，而是告诉本地DNS服务器，你的域名的解析服务器的地址。

　　		6、最后，本地DNS服务器向域名的解析服务器发出请求，这时就能收到一个域名和IP地址对应关系，本地DNS服务器不仅要把IP地址返回给用户电脑，还要把这个对应关系保存在缓存中，以备下次别的用户查询时，可以直接返回结果，加快网络访问。)
3、建立tcp连接(三次握手)
4、客户端发送HTPP请求
5、服务器处理请求　
6、服务器响应请求
7、浏览器展示HTML
8、浏览器发送请求获取其他在HTML中的资源。


 


# CSS
1、实现左右div宽度固定100px，中间的div占据剩下的全部宽度
答：第一种：flex布局，中间div属性flex：1；第二种：css有一个属性可以动态计算值calc(100%-200px)  
2、如何用一个标签实现一个长方形分为2个小长方形，左边的长方形内容固定，右边是动态数据
答:第一种：用伪元素after或者before，左边的固定内容写在content里面；第二种：将这个大长方形用图片当背景，固定的内容以背景展示，加个padding-left;  
3、css实现一行文字居中，多行文字居左  
答：div里面套一个行内元素，div设置文字居中，行内元素设置文字居左，文字不超过一行的时候行内元素宽度没有达到div的宽度，所以看起来是居中，文字超过1行时，行内元素的宽度已经跟div一样宽，展示出文字居左的效果；  
4、Link与import的区别  
Link 属于 html 标签，而@import 是 CSS 中提供的
在页面加载的时候，link 会同时被加载，而@import 引用的 CSS 会在页面加载完成后才会加载引用的 CSS，Link 引入样式的权重大于@import 的引用


# JS
1、JSON字符串是什么？
json是一种轻量级的数据交换格式,易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率   
2、JS模块化的原理及实现过程
ES6 
import和export，export用于规定模块的对外接口，import命令用于输入其他模块提供的功能，
ES6之前有相关的js模块实现这样的功能如(requirejs,CommonJS)

3、单页面应用中路由跳转的原理
第一种：Hash路由  
url 上的 hash 以 # 开头，原本是为了作为锚点，方便用户在文章导航到相应的位置。因为 hash 值的改变不会引起页面的刷新，聪明的程序员就想到用 hash 值来做单页面应用的路由，并且当 url 的 hash 发生变化的时候，可以触发相应 hashchange 回调函数；
class Router {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
  }
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }
  updateView() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl] && this.routes[this.currentUrl]();
  }
  init() {
    window.addEventListener('load', this.updateView.bind(this), false);
    window.addEventListener('hashchange', this.updateView.bind(this), false);
  }
}
一、routes 用来存放不同路由对应的回调函数
二、init 用来初始化路由，在 load 事件发生后刷新页面，并且绑定 hashchange 事件，当 hash 值改变时触发对应回调函数
第二种：History 路由   
History 路由是基于 HTML5 规范，在 HTML5 规范中提供了 history.pushState || history.replaceState 来进行路由控制。
当你执行 history.pushState({}, null, '/about') 时候，页面 url 会从 http://xxxx/ 跳转到 http://xxxx/about 可以在改变 url 的同时，并不会刷新页面。
先来简单看看 pushState 的用法，参数说明如下：
state：存储 JSON 字符串，可以用在 popstate 事件中
title：现在大多浏览器忽略这个参数，直接用 null 代替
url：任意有效的 URL，用于更新浏览器的地址栏
这么说下来 history 也有着控制路由的能力，然后，hash 的改变可以出发 onhashchange 事件，而 history 的改变并不会触发任何事件，这让我们无法直接去监听 history 的改变从而做出相应的改变。
所以，我们需要换个思路，我们可以罗列出所有可能触发 history 改变的情况，并且将这些方式一一进行拦截，变相地监听 history 的改变。
对于一个应用而言，url 的改变(不包括 hash 值得改变)只能由下面三种情况引起：

点击浏览器的前进或后退按钮
点击 a 标签
在 JS 代码中触发 history.push(replace)State 函数
只要对上述三种情况进行拦截，就可以变相监听到 history 的改变而做出调整。针对情况 1，HTML5 规范中有相应的 onpopstate 事件，通过它可以监听到前进或者后退按钮的点击，值得注意的是，调用 history.push(replace)State 并不会触发 onpopstate 事件。



4、简述vue-router进入新路由的基本过程


5、容易导致内存泄露的3种方法
全局变量引起的内存泄漏；闭包引起的内存泄漏；Delete一个Object的属性会让此对象变慢（多耗费15倍的内存）;定时器泄露；没有清理的DOM元素引用

6、反转一个字符串
str.split('').reverse().join('')
7、var p1 = new Promise(resolve => {
		console.log(1)
		resolve(2)
	})
	var p2 = new Promise(resolve => {
		console.log(3)
		resolve(p1)
	})
	p1.then(re => {
		console.log(re)
	})
	p2.then(re => {
		console.log(re)
	})
	输出的是什么                    //1,3,2,2  
	解析：创建一个Promise对象会立即执行里面的代码 ，所以1和3会马上打印出来，然后执行p1.then里面的方法，接着是p2.then的方法,p2里的resove(p1),p1的值为resolve里的2  
	promise执行then还是一个promise,所以可以加多个then回调
	
8、js延迟加载的方式  
一、定时器   
二、把js外部引入的文件放到页面底部，来让js最后引入  
三、给script标签加个async 属性
四、动态创建dom 

9、sleep函数  
第一种实现方法
  function sleep(n) {
      var now = new Date();
      var exitTime = now.getTime() + n;
      while (true) {
          now = new Date();
          if (now.getTime() > exitTime){
               break;         //不加break浏览器就会崩掉
          }
      }
  }
  
  实际上，该例子不是使js脚本进入休眠，而是因为js是单线程，while(true)｛｝死循环调度cpu,使得whlie(){}后面的程序被阻塞，进而实现休眠的假象。
第二种方法
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

(async function() {
  console.log('Do some thing, ' + new Date());
  await sleep(3000);
  console.log('Do other things, ' + new Date());
})();

10、原生JS创建dom，删除的方法
createElement   在HTML中创建新的元素
createTextNode()方法用于创建一个文本节点
appendChild    插入子节点
removeChild    移除子节点
childNodes 包含文本节点和元素节点的子节点
children也可以获取子节点，而且兼容各种浏览器
parentNode：获取父节点  

11、判断一个字符串里出现次数最多的字母
var str = 'asdfssaaasasasasaa';
var json = {};
for(var i = 0; i < str.length; i++) {
 if(!json[str.charAt(i)]){                 charAt() 方法可返回指定位置的字符
   json[str.charAt(i)] = 1;
}else{
  json[str.charAt(i)]++;
}
};
var iMax = 0;
var iIndex = '';
for(var i in json){
    if(json[i]>iMax){ 
      iMax = json[i];
      iIndex = i;}
} 
console.log('出现次数最多的是:'+iIndex+'出现'+iMax+'次');  

12、async await
async是基于promise实现的异步加载的一种办法，async返回的是一个promise对象，await后面加的大多数也是Promise对象，如果加的是正常表达式就会立刻执行，加的是Promise对象则会等待promise解决才会进行下一步；
function timeout(ms) {
  return new Promise((resolve,reject) => {
    setTimeout(_ => {
    	reject('错误了')
    }, ms);
  });
}		
async function asyncPrint(value, ms) {
	try {
		await timeout(ms);
		console.log(value);				
	}catch(err){
		console.log(err)
	}
}

asyncPrint('hello world', 1000);   //不用try catch Promise状态为reject会报错  

13、https://segmentfault.com/q/1010000002810093
var a = 1;
(function a(){
	a = 2
	console.log(a)
})()
f a(){
	a = 2
	console.log(a)
}

# VUE
1、路由懒加载  
一、 vue异步组件技术 ==== 异步加载
{
  path: '/home',
  name: 'home',
  component: resolve => require(['@/components/home'],resolve)
}
二、路由懒加载(使用import)
const Index = () => import('@/components/index')
三、webpack提供的require.ensure() 
{
  path: '/home',
  name: 'home',
  component: r => require.ensure([], () => r(require('@/components/home')), 'demo')
},

2、vue自定义指令  
 Vue.js 用 directive ( id,definition) 方法注册一个全局的自定义指令，自定义的指令接受两个参数： 指令 ID 与定义对象
 Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
 })
 
 指令定义函数提供了几个钩子函数（可选）：

bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
unbind: 只调用一次， 指令与元素解绑时调用。

钩子函数接受的参数（el,binding）：el: 指令所绑定的元素，可以用来直接操作 DOM ；
	binding: 一个对象，包含以下属性：
	name: 指令名，不包括 v- 前缀。
	value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
	oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
	expression: 绑定值的表达式或变量名。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
	arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
	modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
	vnode: Vue 编译生成的虚拟节点。
	oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。  
	

3、vue异步组件  


# 原理题
1、react生命周期与vue的生命周期
答：vue的生命周期从创建，挂载，更新，销毁四个阶段，每个阶段各有2个钩子函数，beforeCreate,created,mounted,updated,destroyed;如果用了keep-alive组件，还有activated和deactivated。  
react的生命周期分为三大块，组件运行前，运行时，卸载；常用的主要函数有componentWillMount(在渲染前调用),componentDidMount(在第一次渲染后调用),componentWillReceiveProps(在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用),componentWillUpdate(在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用),componentDidUpdate (在组件完成更新后立即调用,在初始化时不会被调用),componentWillUnmount(在组件从 DOM 中移除之前立刻被调用)。  
2、vue如何实现数据双向绑定
答：简单回答：采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
3、react和vue的区别
vue实现了数据的双向绑定,react数据流动是单向的；组件写法不一样, React推荐的做法是 JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in js'; Vue推荐的做法是webpack+vue-loader的单文件组件格式,即html,css,jd写在同一个文件;
4、减低页面加载时间的方法  
1，减少页面http请求的次数 
2，使用gulp来合并来压缩js,css代码 
3，优化图片格式 
4，通过内容分发到网络，提高站点的访问速度，稳定性 
5，利用浏览器缓存，最小化重定向措施
雅虎14条web优化规则
1.减少http请求次数；

2.css放在head上

3.js放在页面底部，body上方。

4.使用cdn（内容分发网络）

5.增加expires Header；

6.压缩页面的元素

7.尽量避免css表达式

8.把js和css都放在外部文件中。

9.减少dns的查询次数。

10.最小化js代码（可以之后压缩一下，变成min.js）；

11.避免重定向

12.配置ETags（实体标签,主要是给浏览器缓存用的，服务器告诉浏览器缓存，不是最新的不需要重新在服务器上下载。）

13.删除重复的脚本文件（一样的文件引入重复也会让性能变低）

14.缓存ajax；  


5、原型与原型链               https://hexianzhi.github.io/2017/04/27/JavaScript%E5%8E%9F%E5%9E%8B/  
构造函数实例的_proto_指向构造函数的prototype属性，构造函数的prototype里面的_proto_指向Object.prototype,因为prototype本质上是一个对象，所以是Object的实例；构造函数的也有个_proto_，指向Function的prototype,Function的_proto_指向Object的prototype，因为函数对象也是对象；Object.__proto__ === Function.prototype
JavaScript 中的对象，有一个特殊的 [[prototype]] 属性, 其实就是对于其他对象的引用（委托）。当我们在获取一个对象的属性时，如果这个对象上没有这个属性，那么 JS 会沿着对象的 [[prototype]]链 一层一层地去找，最后如果没找到就返回 undefined;
这条一层一层的查找属性的方式，就叫做原型链。  
二、原型对象即prototype里面有一个属性constructor也是一个指针，指向关联的构造函数，function Person() {}；  Person === Person.prototype.constructor; // true;对象实例是构造函数构造而来,_proto_指向构造函数的prototype，所以const person = new Person();person.constructor === Person  //true    事实上，对象实例本身并没有 constructor 属性，对象实例的 constructor 属性来自于引用了原型对象的 constructor 属性;Object.prototype._proto_ ==null,Object._proto_ 指向Function.prototype





# 工作项目中遇到的一些坑需求

1.怎么实现携程的城市定位这种组件？
2.VUE的生命周期是怎么样的？
3.let,const,var的区别是怎么样的？
4.ES6的新类型是怎么样？Symbol这个类型你怎么理解？
5.ES6之前模块化怎么做？ES6以后呢？
6.JS的面向对象思想是怎么样的？
7.typescript和javascript的区别是什么？
8.怎么理解typescript的泛型？
9.js的高阶函数有没有了解过？
10.es6的导出思想是什么？
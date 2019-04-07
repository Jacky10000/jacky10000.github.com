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
 


# CSS
1、实现左右div宽度固定100px，中间的div占据剩下的全部宽度
答：第一种：flex布局，中间div属性flex：1；第二种：css有一个属性可以动态计算值calc(100%-200px)  
2、如何用一个标签实现一个长方形分为2个小长方形，左边的长方形内容固定，右边是动态数据
答:第一种：用伪元素after或者before，左边的固定内容写在content里面；第二种：将这个大长方形用图片当背景，固定的内容以背景展示，加个padding-left;  
3、css实现一行文字居中，多行文字居左  
答：div里面套一个行内元素，div设置文字居中，行内元素设置文字居左，文字不超过一行的时候行内元素宽度没有达到div的宽度，所以看起来是居中，文字超过1行时，行内元素的宽度已经跟div一样宽，展示出文字居左的效果；  
4、


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
全局变量引起的内存泄漏；闭包引起的内存泄漏；Delete一个Object的属性会让此对象变慢（多耗费15倍的内存）;定时器泄露
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
createElement

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
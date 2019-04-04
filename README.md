# jacky10000.github.com
面试遇到的一些趣题

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
第二种：History 路由  

一、routes 用来存放不同路由对应的回调函数
二、init 用来初始化路由，在 load 事件发生后刷新页面，并且绑定 hashchange 事件，当 hash 值改变时触发对应回调函数

4、简述vue-router进入新路由的基本过程






# 原理题
1、react生命周期与vue的生命周期
答：vue的生命周期从创建，挂载，更新，销毁四个阶段，每个阶段各有2个钩子函数，beforeCreate,created,mounted,updated,destroyed;如果用了keep-alive组件，还有activated和deactivated。  
react的生命周期分为三大块，组件运行前，运行时，卸载；常用的主要函数有componentWillMount(在渲染前调用),componentDidMount(在第一次渲染后调用),componentWillReceiveProps(在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用),componentWillUpdate(在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用),componentDidUpdate (在组件完成更新后立即调用,在初始化时不会被调用),componentWillUnmount(在组件从 DOM 中移除之前立刻被调用)。  
2、vue如何实现数据双向绑定
答：简单回答：采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
3、react和vue的区别
vue实现了数据的双向绑定,react数据流动是单向的；组件写法不一样, React推荐的做法是 JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in js'; Vue推荐的做法是webpack+vue-loader的单文件组件格式,即html,css,jd写在同一个文件;
4、
·


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
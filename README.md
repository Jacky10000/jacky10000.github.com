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






# 原理题
1、react生命周期与vue的生命周期
答：vue的生命周期从创建，挂载，更新，销毁四个阶段，每个阶段各有2个钩子函数，beforeCreate,created,mounted,updated,destroyed;如果用了keep-alive组件，还有activated和deactivated。  
react的生命周期分为三大块，组件运行前，运行时，卸载；常用的主要函数有componentWillMount(在渲染前调用),componentDidMount(在第一次渲染后调用),componentWillReceiveProps(在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用),componentWillUpdate(在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用),componentDidUpdate (在组件完成更新后立即调用,在初始化时不会被调用),componentWillUnmount(在组件从 DOM 中移除之前立刻被调用)。  
2、vue如何实现数据双向绑定
答：简单回答：采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。



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
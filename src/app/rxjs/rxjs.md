Observable: represents the idea of an invokable collection of future values or events.
可观察对象: 表示了一个可被调用的未来值或事件的集合

Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
观察者: 知道如何监听可观察对象所发出的值的回调方法集合
Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
表示了可观察对象的执行，当需要取消可观察对象执行的时候非常有用。
Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
操作符: 是允许使用函数式编程风格处理集合的纯函数们，比如map，filter，concat，reduce。
Subject: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
观察者模式
# inView.js

Keeps track of any given item(s) and adds a classname when it enters the viewport.
Optionally an event can be triggerd at the same time to execute your own stuff.
### Demo
https://repl.it/@Guidovv1997/inView-plugin
### Example

```
inView({
    items: document.querySelectorAll('.item')
});
```


### Options

| Option | Value |
| ------ | ------ |
| `items` | Nodelist (**required**)|
| `classname` | String (**optional**)(Default: 'in-view')|
| `event_callback` | Bool (**optional**). If true, an 'inView' event will be dispatched on the document|
| `timeout` | Number (**optional**)(Default: 100). Timeout between each item when adding the classname|

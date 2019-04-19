# InView.js

Keeps track of any given item(s) and adds a classname when it enters the viewport.
Optionally an event can be triggerd at the same time to execute your own stuff.

**Demo**
https://repl.it/@Guidovv1997/inView-plugin


**Options:**<br>
	- items: (nodelist)<br>
	- classname: (string)(default: 'in-view')<br>
	- event_callback: (bool)(default: false)<br>
  - timeout: (int)(default: 100) // Timeout between each item when adding the classname / triggering the callback event

**Example:**<br>
inView({
&nbsp;&nbsp;&nbsp;&nbsp;items: document.querySelectorAll('.item'),
});

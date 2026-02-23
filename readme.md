1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

getElementById=> getElementById return value in a single Element and select type is Only (Id);
getElementByClassName=>getElementByClassName return in a HTMLCollection and select type is only class;
querySelector=>querySelector return in a single Element Value and selected Types in css Selector;
querySelector=>querySelectorAll Return in a NodeList and selected type with css Selector;



2. How do you create and insert a new element into the DOM?

<!-- Create  Element=> -->
Use document.createElement() to create a new HTML element.
example: const first = document.createElement("div");

<!-- Add content=> -->
first create a element than add this element value is hello william use a textContent or innerText,innerHTML and add a classList ;
Example:
first.textContent = "Hello World!";
first.classList.add("box");

<!-- Insert the Element into the DOM=> -->
Now you i to attach it to an existing element to use appendChild;
Example:
document.body.appendChild(newDiv);



3. What is Event Bubbling? And how does it work?
Event Bubbling  is allows parent elements to respond to events triggered by their child elements; means When I click a child element, the event first runs on that element, then on its parent, then the grandparent… all the way up to Document;


4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?
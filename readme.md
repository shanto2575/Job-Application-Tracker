1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

getElementById=> getElementById return value in a single Element and select type is Only (Id);
getElementByClassName=>getElementByClassName return in a HTMLCollection and select type is only class;
querySelector=>querySelector return in a single Element Value and selected Types in css Selector;
querySelector=>querySelectorAll Return in a NodeList and selected type with css Selector;



2. How do you create and insert a new element into the DOM?

Create  Element=> -->

Use document.createElement() to create a new HTML element.
example: const first = document.createElement("div");

Add content=> -->

first create a element than add this element value is hello william use a textContent or innerText,innerHTML and add a classList ;
Example:
first.textContent = "Hello World!";
first.classList.add("box");

Insert the Element into the DOM=> -->

Now you i to attach it to an existing element to use appendChild;
Example:
document.body.appendChild(newDiv);



3. What is Event Bubbling? And how does it work?

Event Bubbling is allows parent elements to respond to events triggered by their child elements means When I click a child element, the event first runs on that element, then on its parent, then the grandparent all the way up to Document;

Example:

<div id="parent">
  <button id="child">Click Me!</button>
</div>

 javaScript Code -->
    <script>
        document.getElementById("child").addEventListener("click", function () {
            console.log(" Child Button clicked");
        });

        document.getElementById("parent").addEventListener("click", function () {
            console.log("Parent div clicked");
        });
    </script>



4. What is Event Delegation in JavaScript? Why is it useful?

   Event Delegation is a technique where you attach a single event listener to a parent element instead of adding separate event listeners to multiple child elements.

   It works because of Event Bubbling  when a child element is clicked the event bubbles up to its parent and the parent can handle it.



5. What is the difference between preventDefault() and stopPropagation() methods?

preventDefault() -->
It stops the default browser behavior of an element.

stopPropagation() -->
It stops the event from bubbling up to parent elements.
It does NOT stop default behavior — it only stops event flow.



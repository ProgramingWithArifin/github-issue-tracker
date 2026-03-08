# github-issue-tracker

Answers to Questions

1.What is the difference between var, let, and const?
ans: At first, var is the old way of declaring a variable. It is function-scoped and can be re-declared. After that, let is a more modern way of declaring a variable. It is block-scoped. You can only declare it once in the same scope, but you can change its value later. At last, const is also block-scoped; it can't be re-declared, and you can't re-assign it later.


2.What is the spread operator (...)?
ans:The spread operator is an ES6 feature it allows us to unpack the elements of an array or object . We can use it to copy an array or merging two arrays without changing original array's data.

3.What is the difference between map(), filter(), and forEach()?
ans:These three are modern array methods. forEach()is a loop that performs action for each elements and returns nothing.On the other hand map()creates a new array by applying a function to every elements. At last, filter creates a new array containing only the elements that pass the given condition.

4.What is an arrow function?
ans:Arrow function is a modern way of writing functions in JS.Here instead of using the function keyword it uses => to define the function. It is often used for one line operations, because it makes the code much cleaner and easier to read.

5.What are template literals?
ans:Template literals are a modern way to create strings in JS. Instead of using quotes we use backticks here. the advantage of this is we can add variables or expression directly into the string and it also supports multi line strings.
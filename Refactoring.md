# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
 The modifications being made recognize that since we dont check if we have an event in negative way we have to check also that the 
 candidate has value, beside that case if we have "event" we only need to make sure if we have an object type with the key partitionKey
 In which case we want the value of that key as string, the rest of the cases we want to encript the value and return the string, with
 the special case in which the first encripted value result in a string longer than 256 characters in that case we encripte it again. 

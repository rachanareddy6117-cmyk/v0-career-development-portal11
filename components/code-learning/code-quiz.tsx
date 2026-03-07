"use client"

import { useState } from "react"
import { Check, X, ArrowRight, Lightbulb, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  level: "beginner" | "intermediate" | "advanced"
  language: string
}

interface CodeQuizProps {
  language: string
  onComplete: (result: QuizResult) => void
}

const quizQuestions: Record<string, { question: string; options: string[]; correct: number; hint: string }[]> = {
  python: [
    {
      question: "What will print(2 ** 3) output?",
      options: ["6", "8", "5", "23"],
      correct: 1,
      hint: "** is the power operator in Python"
    },
    {
      question: "Which is the correct way to create a list in Python?",
      options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "list = <1, 2, 3>"],
      correct: 1,
      hint: "Lists use square brackets"
    },
    {
      question: "What does len('Hello') return?",
      options: ["4", "5", "6", "Hello"],
      correct: 1,
      hint: "len() returns the length of a string"
    },
    {
      question: "How do you start a comment in Python?",
      options: ["//", "/*", "#", "--"],
      correct: 2,
      hint: "Python uses a special character for comments"
    },
    {
      question: "What is the output of 10 // 3?",
      options: ["3.33", "3", "4", "10/3"],
      correct: 1,
      hint: "// is floor division"
    },
    {
      question: "Which method adds an element to the end of a list?",
      options: ["add()", "append()", "insert()", "push()"],
      correct: 1,
      hint: "It's a common list method in Python"
    },
    {
      question: "What is the output of bool('')?",
      options: ["True", "False", "None", "Error"],
      correct: 1,
      hint: "Empty strings are considered falsy in Python"
    },
    {
      question: "How do you create a dictionary in Python?",
      options: ["dict = []", "dict = ()", "dict = {}", "dict = <>"],
      correct: 2,
      hint: "Dictionaries use curly braces"
    },
    {
      question: "What does 'range(5)' generate?",
      options: ["1 to 5", "0 to 5", "0 to 4", "1 to 4"],
      correct: 2,
      hint: "range() starts at 0 and excludes the end value"
    },
    {
      question: "Which keyword is used to define a function?",
      options: ["function", "func", "def", "define"],
      correct: 2,
      hint: "It's short for 'define'"
    },
    {
      question: "What is the output of [1, 2, 3][-1]?",
      options: ["1", "3", "Error", "-1"],
      correct: 1,
      hint: "Negative indexing starts from the end"
    },
    {
      question: "Which method removes whitespace from both ends of a string?",
      options: ["trim()", "strip()", "clean()", "remove()"],
      correct: 1,
      hint: "Think about stripping away the extra characters"
    },
    {
      question: "What does 'is' operator check in Python?",
      options: ["Value equality", "Identity (same object)", "Type equality", "String comparison"],
      correct: 1,
      hint: "It checks if two variables point to the same object in memory"
    },
    {
      question: "How do you handle exceptions in Python?",
      options: ["try/catch", "try/except", "catch/throw", "handle/error"],
      correct: 1,
      hint: "Python uses a different keyword than most languages"
    },
    {
      question: "What is a lambda function?",
      options: ["A named function", "An anonymous function", "A recursive function", "A generator function"],
      correct: 1,
      hint: "Lambda functions don't have a name"
    },
  ],
  javascript: [
    {
      question: "What will console.log(typeof []) output?",
      options: ["array", "object", "list", "undefined"],
      correct: 1,
      hint: "Arrays are a type of object in JavaScript"
    },
    {
      question: "Which keyword declares a constant variable?",
      options: ["var", "let", "const", "static"],
      correct: 2,
      hint: "Think about which one sounds like 'constant'"
    },
    {
      question: "What does '===' check for?",
      options: ["Only value", "Only type", "Value and type", "Assignment"],
      correct: 2,
      hint: "It's stricter than =="
    },
    {
      question: "How do you create an arrow function?",
      options: ["function => {}", "() => {}", "=> function()", "arrow() {}"],
      correct: 1,
      hint: "The arrow comes after the parameters"
    },
    {
      question: "What is null == undefined?",
      options: ["true", "false", "null", "undefined"],
      correct: 0,
      hint: "With loose equality, they are considered equal"
    },
    {
      question: "What does 'NaN === NaN' return?",
      options: ["true", "false", "NaN", "undefined"],
      correct: 1,
      hint: "NaN is not equal to anything, including itself"
    },
    {
      question: "Which method removes the last element from an array?",
      options: ["pop()", "shift()", "slice()", "splice()"],
      correct: 0,
      hint: "Think of popping a balloon - it's at the end"
    },
    {
      question: "What is the output of '5' + 3?",
      options: ["8", "'53'", "Error", "undefined"],
      correct: 1,
      hint: "JavaScript converts numbers to strings when concatenating"
    },
    {
      question: "Which method is used to parse JSON?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.decode()", "JSON.convert()"],
      correct: 0,
      hint: "Parse means to analyze and convert"
    },
    {
      question: "What does 'this' refer to in a regular function?",
      options: ["The function itself", "Global object or caller", "undefined always", "The parent function"],
      correct: 1,
      hint: "It depends on how the function is called"
    },
    {
      question: "What does the spread operator (...) do?",
      options: ["Multiplies values", "Expands an iterable into elements", "Creates a loop", "Defines a rest parameter only"],
      correct: 1,
      hint: "It 'spreads' out the elements"
    },
    {
      question: "What is a Promise in JavaScript?",
      options: ["A guaranteed value", "An object representing eventual completion", "A synchronous operation", "A type of loop"],
      correct: 1,
      hint: "It represents a value that may be available now, later, or never"
    },
    {
      question: "What does 'async/await' help with?",
      options: ["Synchronous code", "Asynchronous code readability", "Error handling only", "Memory management"],
      correct: 1,
      hint: "It makes asynchronous code look synchronous"
    },
    {
      question: "What is the output of [1, 2, 3].map(x => x * 2)?",
      options: ["[1, 2, 3]", "[2, 4, 6]", "6", "[1, 4, 9]"],
      correct: 1,
      hint: "map() applies the function to each element"
    },
    {
      question: "What does Object.keys({a: 1, b: 2}) return?",
      options: ["[1, 2]", "['a', 'b']", "{a, b}", "['a': 1, 'b': 2]"],
      correct: 1,
      hint: "It returns the keys, not the values"
    },
  ],
  java: [
    {
      question: "Which is the correct way to declare a main method?",
      options: ["public void main()", "public static void main(String[] args)", "void main()", "static main()"],
      correct: 1,
      hint: "The main method needs specific modifiers and parameters"
    },
    {
      question: "What is the default value of an int variable?",
      options: ["null", "0", "undefined", "-1"],
      correct: 1,
      hint: "Primitive types have default numeric values"
    },
    {
      question: "Which keyword is used for inheritance?",
      options: ["inherits", "implements", "extends", "super"],
      correct: 2,
      hint: "A class _____ another class"
    },
    {
      question: "What does 'final' keyword mean for a variable?",
      options: ["Last variable", "Cannot be changed", "Public variable", "Static variable"],
      correct: 1,
      hint: "Final means the end - no more changes"
    },
    {
      question: "Which is NOT a primitive type in Java?",
      options: ["int", "boolean", "String", "char"],
      correct: 2,
      hint: "One of these is actually a class"
    },
    {
      question: "What is the parent class of all classes in Java?",
      options: ["Object", "Class", "Main", "Super"],
      correct: 0,
      hint: "Everything in Java is an..."
    },
    {
      question: "Which access modifier makes a member accessible only within its class?",
      options: ["public", "protected", "private", "default"],
      correct: 2,
      hint: "It's the most restrictive access level"
    },
    {
      question: "What does 'static' mean for a method?",
      options: ["Cannot be changed", "Belongs to the class, not instance", "Runs at startup", "Is synchronized"],
      correct: 1,
      hint: "You can call it without creating an object"
    },
    {
      question: "Which collection allows duplicate elements?",
      options: ["Set", "List", "Map", "HashSet"],
      correct: 1,
      hint: "It maintains insertion order and allows duplicates"
    },
    {
      question: "What is the result of 5/2 in Java (both are int)?",
      options: ["2.5", "2", "3", "2.0"],
      correct: 1,
      hint: "Integer division truncates the decimal"
    },
    {
      question: "What is an interface in Java?",
      options: ["A class with implementation", "A contract with method signatures", "A type of variable", "An abstract class"],
      correct: 1,
      hint: "It defines what methods a class must implement"
    },
    {
      question: "What does 'super' keyword do?",
      options: ["Creates a superclass", "References parent class", "Makes a variable public", "Calls main method"],
      correct: 1,
      hint: "It's used to access parent class members"
    },
    {
      question: "What is autoboxing in Java?",
      options: ["Automatic packaging", "Converting primitive to wrapper", "Creating objects automatically", "Memory management"],
      correct: 1,
      hint: "int becomes Integer automatically"
    },
    {
      question: "Which exception is checked at compile time?",
      options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "ArithmeticException"],
      correct: 2,
      hint: "File operations throw this type of exception"
    },
    {
      question: "What is the purpose of 'synchronized' keyword?",
      options: ["Speed up execution", "Prevent thread interference", "Create threads", "Handle exceptions"],
      correct: 1,
      hint: "It's used for thread safety"
    },
  ],
  c: [
    {
      question: "What is the correct file extension for C source files?",
      options: [".c", ".cpp", ".h", ".cs"],
      correct: 0,
      hint: "C uses a simple single letter extension"
    },
    {
      question: "Which header file is required for printf()?",
      options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<conio.h>"],
      correct: 1,
      hint: "stdio stands for standard input/output"
    },
    {
      question: "What does the '&' operator do in C?",
      options: ["Logical AND", "Returns address of variable", "Bitwise OR", "Pointer declaration"],
      correct: 1,
      hint: "It's used with scanf() to pass variable addresses"
    },
    {
      question: "Which is the correct way to declare a pointer in C?",
      options: ["int ptr;", "int *ptr;", "pointer int ptr;", "int &ptr;"],
      correct: 1,
      hint: "The asterisk (*) is used for pointer declaration"
    },
    {
      question: "What is the size of 'int' in C (typically on 32-bit systems)?",
      options: ["2 bytes", "4 bytes", "8 bytes", "Depends on compiler"],
      correct: 1,
      hint: "It's usually 4 bytes on most modern systems"
    },
    {
      question: "What does malloc() return on failure?",
      options: ["0", "NULL", "-1", "undefined"],
      correct: 1,
      hint: "It returns a null pointer when memory allocation fails"
    },
    {
      question: "Which loop is guaranteed to execute at least once?",
      options: ["for", "while", "do-while", "None of them"],
      correct: 2,
      hint: "The condition is checked at the end"
    },
    {
      question: "What is the correct way to allocate memory for an array of 10 integers?",
      options: ["malloc(10)", "malloc(10 * int)", "malloc(10 * sizeof(int))", "alloc(10, int)"],
      correct: 2,
      hint: "You need to multiply count by the size of each element"
    },
    {
      question: "What does the 'static' keyword do for a local variable?",
      options: ["Makes it constant", "Preserves value between function calls", "Makes it global", "Prevents modification"],
      correct: 1,
      hint: "The variable retains its value"
    },
    {
      question: "Which operator is used for structure member access via pointer?",
      options: [".", "->", "*", "&"],
      correct: 1,
      hint: "It looks like an arrow"
    },
    {
      question: "What is a void pointer in C?",
      options: ["A null pointer", "A pointer that points to nothing", "A generic pointer type", "An invalid pointer"],
      correct: 2,
      hint: "void* can point to any data type"
    },
    {
      question: "What does the 'const' keyword do for a pointer?",
      options: ["Makes pointer NULL", "Prevents modification of pointed value", "Allocates memory", "Frees memory"],
      correct: 1,
      hint: "It makes the value read-only"
    },
    {
      question: "What is the difference between ++i and i++?",
      options: ["No difference", "++i increments before use, i++ after", "i++ is faster", "++i is deprecated"],
      correct: 1,
      hint: "Pre-increment vs post-increment"
    },
    {
      question: "What does 'typedef' do in C?",
      options: ["Defines a function", "Creates an alias for a type", "Declares a variable", "Includes a header"],
      correct: 1,
      hint: "It creates a new name for an existing type"
    },
    {
      question: "What is the purpose of #include in C?",
      options: ["Define a macro", "Include header files", "Create a function", "Declare variables"],
      correct: 1,
      hint: "It brings in external code definitions"
    },
  ],
  cpp: [
    {
      question: "What is the correct file extension for C++ files?",
      options: [".c", ".cpp", ".cc", "Both B and C"],
      correct: 3,
      hint: "C++ allows multiple extensions"
    },
    {
      question: "Which operator is used for dereferencing a pointer?",
      options: ["&", "*", "->", "::"],
      correct: 1,
      hint: "The opposite of getting address"
    },
    {
      question: "What does 'cout' stand for?",
      options: ["Character out", "Console output", "Count output", "C output"],
      correct: 1,
      hint: "It outputs to the console"
    },
    {
      question: "Which header is needed for cout?",
      options: ["<stdio.h>", "<iostream>", "<string>", "<output>"],
      correct: 1,
      hint: "It's related to input/output streams"
    },
    {
      question: "What is a destructor prefix?",
      options: ["~", "!", "@", "#"],
      correct: 0,
      hint: "It's the tilde character"
    },
    {
      question: "What is the difference between 'new' and 'malloc'?",
      options: ["No difference", "new calls constructor, malloc doesn't", "malloc is faster", "new is for arrays only"],
      correct: 1,
      hint: "new is object-oriented and initializes objects"
    },
    {
      question: "Which keyword is used for runtime polymorphism?",
      options: ["static", "virtual", "override", "dynamic"],
      correct: 1,
      hint: "It allows derived classes to override methods"
    },
    {
      question: "What does 'std::' indicate?",
      options: ["Static member", "Standard namespace", "String type", "Structure definition"],
      correct: 1,
      hint: "std stands for standard"
    },
    {
      question: "What is a reference in C++?",
      options: ["A pointer", "An alias for another variable", "A copy of variable", "A constant"],
      correct: 1,
      hint: "It's another name for an existing variable"
    },
    {
      question: "Which container provides O(1) access by index?",
      options: ["list", "set", "vector", "map"],
      correct: 2,
      hint: "It's like a dynamic array"
    },
    {
      question: "What is RAII in C++?",
      options: ["A design pattern", "Resource Acquisition Is Initialization", "A compiler feature", "A memory leak"],
      correct: 1,
      hint: "Resources are tied to object lifetime"
    },
    {
      question: "What does 'const' after a member function mean?",
      options: ["Function returns const", "Function doesn't modify object", "Function is static", "Function is inline"],
      correct: 1,
      hint: "It promises not to change member variables"
    },
    {
      question: "What is a smart pointer?",
      options: ["A faster pointer", "A pointer with automatic memory management", "A pointer to functions", "A constant pointer"],
      correct: 1,
      hint: "unique_ptr and shared_ptr are examples"
    },
    {
      question: "What does 'template' keyword enable?",
      options: ["Code formatting", "Generic programming", "Memory templates", "Class inheritance"],
      correct: 1,
      hint: "It allows writing code that works with any data type"
    },
    {
      question: "What is the difference between struct and class in C++?",
      options: ["No difference", "Default access: struct public, class private", "struct can't have methods", "class can't have members"],
      correct: 1,
      hint: "It's about default member accessibility"
    },
  ],
  csharp: [
    {
      question: "What is the C# equivalent of Java's 'extends'?",
      options: ["extends", "inherits", ":", "->"],
      correct: 2,
      hint: "C# uses a simple punctuation mark"
    },
    {
      question: "Which keyword is used for null-conditional access?",
      options: ["?.", "??", "!", "::"],
      correct: 0,
      hint: "It includes a question mark"
    },
    {
      question: "What is a struct in C#?",
      options: ["Reference type", "Value type", "Interface", "Abstract class"],
      correct: 1,
      hint: "Unlike classes, structs are stack-allocated"
    },
    {
      question: "Which namespace contains Console?",
      options: ["System", "Console", "IO", "Core"],
      correct: 0,
      hint: "The most fundamental namespace"
    },
    {
      question: "What does 'var' do in C#?",
      options: ["Creates variant type", "Implicit type inference", "Dynamic typing", "Weak typing"],
      correct: 1,
      hint: "The compiler figures out the type"
    },
    {
      question: "What is LINQ used for?",
      options: ["Network programming", "Querying data collections", "Memory management", "Threading"],
      correct: 1,
      hint: "Language Integrated Query"
    },
    {
      question: "What is the difference between 'ref' and 'out' parameters?",
      options: ["No difference", "ref must be initialized, out doesn't", "out is faster", "ref is for arrays"],
      correct: 1,
      hint: "out parameters must be assigned inside the method"
    },
    {
      question: "What does 'async' keyword indicate?",
      options: ["Synchronous method", "Asynchronous method", "Static method", "Abstract method"],
      correct: 1,
      hint: "It enables the use of await"
    },
    {
      question: "What is a delegate in C#?",
      options: ["A class member", "A type-safe function pointer", "An interface", "A structure"],
      correct: 1,
      hint: "It holds references to methods"
    },
    {
      question: "Which keyword is used to handle exceptions?",
      options: ["error", "catch", "handle", "except"],
      correct: 1,
      hint: "You try and then..."
    },
    {
      question: "What is a property in C#?",
      options: ["A field", "A getter/setter pair", "A method", "A constant"],
      correct: 1,
      hint: "It provides controlled access to a field"
    },
    {
      question: "What does 'using' statement do for resources?",
      options: ["Imports namespaces", "Ensures proper disposal", "Creates variables", "Defines scope"],
      correct: 1,
      hint: "It calls Dispose() automatically"
    },
    {
      question: "What is an extension method?",
      options: ["A method that extends execution time", "A method added to existing types", "An overridden method", "A recursive method"],
      correct: 1,
      hint: "It adds functionality to types you don't own"
    },
    {
      question: "What is the null-coalescing operator (??) used for?",
      options: ["Null checking", "Providing default value if null", "Throwing exceptions", "Type casting"],
      correct: 1,
      hint: "a ?? b returns a if not null, otherwise b"
    },
    {
      question: "What is a partial class?",
      options: ["An incomplete class", "A class split across multiple files", "An abstract class", "A sealed class"],
      correct: 1,
      hint: "Multiple developers can work on the same class"
    },
  ],
  go: [
    {
      question: "How do you declare a short variable in Go?",
      options: ["var x = 5", "x := 5", "let x = 5", "x = 5"],
      correct: 1,
      hint: "Go uses a special operator with colon"
    },
    {
      question: "What is a goroutine?",
      options: ["A type of loop", "A lightweight thread", "A function", "An interface"],
      correct: 1,
      hint: "It's for concurrent execution"
    },
    {
      question: "Which keyword is used for error handling?",
      options: ["try/catch", "defer/recover", "throw/catch", "error/handle"],
      correct: 1,
      hint: "Go uses defer with recover"
    },
    {
      question: "What is a slice in Go?",
      options: ["Fixed-size array", "Dynamic array", "String", "Map"],
      correct: 1,
      hint: "It can grow and shrink"
    },
    {
      question: "How do you export a function in Go?",
      options: ["export keyword", "public keyword", "Capitalize first letter", "Use * prefix"],
      correct: 2,
      hint: "Go uses naming conventions"
    },
    {
      question: "What is a channel used for in Go?",
      options: ["File I/O", "Communication between goroutines", "Network requests", "Error handling"],
      correct: 1,
      hint: "Channels enable safe data exchange between concurrent operations"
    },
    {
      question: "What does 'defer' do in Go?",
      options: ["Delays execution until function returns", "Creates a goroutine", "Handles errors", "Imports packages"],
      correct: 0,
      hint: "Deferred calls are executed in LIFO order"
    },
    {
      question: "How do you declare a constant in Go?",
      options: ["var const x = 5", "const x = 5", "let x = 5", "constant x = 5"],
      correct: 1,
      hint: "Go uses a simple keyword for constants"
    },
    {
      question: "What is the zero value for a string in Go?",
      options: ["null", "nil", "\"\"", "undefined"],
      correct: 2,
      hint: "It's an empty string"
    },
    {
      question: "Which keyword is used to create a new type?",
      options: ["class", "type", "struct", "new"],
      correct: 1,
      hint: "You use 'type' followed by the name and definition"
    },
    {
      question: "What is a method receiver in Go?",
      options: ["A parameter", "A type that a method belongs to", "A return value", "An interface"],
      correct: 1,
      hint: "It's how Go implements methods on types"
    },
    {
      question: "What does 'make' function do?",
      options: ["Creates files", "Initializes slices, maps, channels", "Compiles code", "Creates pointers"],
      correct: 1,
      hint: "It's used for built-in reference types"
    },
    {
      question: "What is an interface in Go?",
      options: ["A class", "A set of method signatures", "A struct", "A package"],
      correct: 1,
      hint: "Types implicitly implement interfaces"
    },
    {
      question: "What does 'select' statement do?",
      options: ["Chooses a value", "Waits on multiple channel operations", "Filters data", "Creates goroutines"],
      correct: 1,
      hint: "It's like switch but for channels"
    },
    {
      question: "What is the blank identifier (_) used for?",
      options: ["Comments", "Ignoring values", "Private variables", "Constants"],
      correct: 1,
      hint: "It discards values you don't need"
    },
  ],
  react: [
    {
      question: "What is JSX in React?",
      options: ["A programming language", "A syntax extension for JavaScript", "A CSS framework", "A testing library"],
      correct: 1,
      hint: "It looks like HTML but compiles to JavaScript"
    },
    {
      question: "What hook is used to manage state in functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correct: 1,
      hint: "It's the most basic state hook"
    },
    {
      question: "What does useEffect hook do?",
      options: ["Manages state", "Handles side effects", "Creates components", "Routes pages"],
      correct: 1,
      hint: "Data fetching, subscriptions, DOM changes"
    },
    {
      question: "What is a React component?",
      options: ["A CSS class", "A reusable piece of UI", "A database query", "A server endpoint"],
      correct: 1,
      hint: "Components are the building blocks of React apps"
    },
    {
      question: "What is the virtual DOM?",
      options: ["A real DOM copy", "A lightweight JS representation of DOM", "A browser feature", "A React component"],
      correct: 1,
      hint: "React uses it for efficient updates"
    },
    {
      question: "What is prop drilling?",
      options: ["Creating props", "Passing props through many levels", "Destructuring props", "Validating props"],
      correct: 1,
      hint: "It's a common problem solved by Context"
    },
    {
      question: "What does 'key' prop do in lists?",
      options: ["Styles elements", "Helps React identify elements", "Sorts elements", "Filters elements"],
      correct: 1,
      hint: "It should be unique among siblings"
    },
    {
      question: "What is React.memo used for?",
      options: ["Memory allocation", "Memoizing components to prevent re-renders", "Creating memos", "State management"],
      correct: 1,
      hint: "It's a performance optimization"
    },
    {
      question: "What is the difference between controlled and uncontrolled components?",
      options: ["Size difference", "State managed by React vs DOM", "Performance difference", "Styling difference"],
      correct: 1,
      hint: "It's about who controls the input value"
    },
    {
      question: "What does useCallback hook return?",
      options: ["A value", "A memoized callback function", "A state", "A ref"],
      correct: 1,
      hint: "It prevents unnecessary function re-creations"
    },
    {
      question: "What is the purpose of useRef?",
      options: ["Create references to DOM elements", "Manage global state", "Handle routing", "Fetch data"],
      correct: 0,
      hint: "It can also store mutable values that don't trigger re-renders"
    },
    {
      question: "What is a custom hook?",
      options: ["A built-in React hook", "A reusable function using hooks", "A class method", "A lifecycle method"],
      correct: 1,
      hint: "Custom hooks start with 'use'"
    },
    {
      question: "What is the Context API used for?",
      options: ["Styling", "Sharing data without prop drilling", "Routing", "Testing"],
      correct: 1,
      hint: "It provides a way to pass data through the component tree"
    },
    {
      question: "What triggers a re-render in React?",
      options: ["Only state changes", "State or prop changes", "Only prop changes", "Manual trigger only"],
      correct: 1,
      hint: "Both can cause components to update"
    },
    {
      question: "What is the purpose of React.Fragment?",
      options: ["Error handling", "Grouping elements without extra DOM node", "Code splitting", "Lazy loading"],
      correct: 1,
      hint: "It can be written as <></>"
    },
  ],
  nodejs: [
    {
      question: "What is Node.js built on?",
      options: ["Python engine", "Chrome's V8 JavaScript engine", "Java Virtual Machine", "Ruby interpreter"],
      correct: 1,
      hint: "It's the same engine that powers Chrome browser"
    },
    {
      question: "What does 'npm' stand for?",
      options: ["Node Package Manager", "New Programming Method", "Network Protocol Module", "Node Project Manager"],
      correct: 0,
      hint: "It manages packages for Node"
    },
    {
      question: "What is the event loop in Node.js?",
      options: ["A for loop", "Mechanism for handling async operations", "A type of array", "A debugging tool"],
      correct: 1,
      hint: "It's what makes Node.js non-blocking"
    },
    {
      question: "What does 'require()' do?",
      options: ["Requires user input", "Imports modules", "Validates data", "Creates servers"],
      correct: 1,
      hint: "It's how you include external modules"
    },
    {
      question: "What is Express.js?",
      options: ["A database", "A web framework for Node.js", "A testing library", "A CSS framework"],
      correct: 1,
      hint: "It's the most popular Node.js web framework"
    },
    {
      question: "What is middleware in Express?",
      options: ["Hardware component", "Functions that execute during request-response cycle", "Database layer", "CSS processor"],
      correct: 1,
      hint: "It can modify request and response objects"
    },
    {
      question: "What does 'module.exports' do?",
      options: ["Imports modules", "Exports values from a module", "Creates modules", "Deletes modules"],
      correct: 1,
      hint: "It makes code available to other files"
    },
    {
      question: "What is package.json used for?",
      options: ["Styling", "Project metadata and dependencies", "Database schema", "Test configuration"],
      correct: 1,
      hint: "It's the heart of any Node.js project"
    },
    {
      question: "What is a callback function in Node.js?",
      options: ["A function that calls itself", "A function passed as argument to be executed later", "A synchronous function", "A constructor"],
      correct: 1,
      hint: "It's called back when an async operation completes"
    },
    {
      question: "What does 'process.env' contain?",
      options: ["Process ID", "Environment variables", "File paths", "Memory usage"],
      correct: 1,
      hint: "It's used for configuration like API keys"
    },
    {
      question: "What is the purpose of 'fs' module?",
      options: ["Full stack operations", "File system operations", "Form submission", "Function storage"],
      correct: 1,
      hint: "fs stands for file system"
    },
    {
      question: "What is a Promise in Node.js?",
      options: ["A guarantee", "An object representing eventual completion of async operation", "A variable type", "A function type"],
      correct: 1,
      hint: "It can be pending, fulfilled, or rejected"
    },
    {
      question: "What does 'async/await' replace?",
      options: ["Variables", "Callback chains and .then()", "For loops", "If statements"],
      correct: 1,
      hint: "It makes async code more readable"
    },
    {
      question: "What is npm install --save-dev used for?",
      options: ["Installing globally", "Installing as development dependency", "Saving to cloud", "Creating backups"],
      correct: 1,
      hint: "Dev dependencies aren't needed in production"
    },
    {
      question: "What is the purpose of .env file?",
      options: ["Environment configuration", "Error handling", "Event logging", "Export settings"],
      correct: 0,
      hint: "It stores sensitive configuration data"
    },
  ],
  sql: [
    {
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"],
      correct: 0,
      hint: "It's structured and used for queries"
    },
    {
      question: "Which command is used to retrieve data?",
      options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
      correct: 2,
      hint: "You SELECT the data you want"
    },
    {
      question: "What does WHERE clause do?",
      options: ["Sorts data", "Filters rows based on condition", "Groups data", "Joins tables"],
      correct: 1,
      hint: "It specifies which rows to include"
    },
    {
      question: "What is a PRIMARY KEY?",
      options: ["The first column", "A unique identifier for rows", "The most important data", "A foreign reference"],
      correct: 1,
      hint: "Each row must have a unique primary key value"
    },
    {
      question: "What does JOIN do?",
      options: ["Combines columns", "Combines rows from multiple tables", "Adds new data", "Deletes data"],
      correct: 1,
      hint: "It brings together related data from different tables"
    },
    {
      question: "What is the difference between INNER JOIN and LEFT JOIN?",
      options: ["No difference", "LEFT JOIN includes unmatched rows from left table", "INNER JOIN is faster", "LEFT JOIN is deprecated"],
      correct: 1,
      hint: "LEFT JOIN keeps all rows from the left table"
    },
    {
      question: "What does GROUP BY do?",
      options: ["Sorts data", "Groups rows with same values", "Filters data", "Joins tables"],
      correct: 1,
      hint: "It's often used with aggregate functions"
    },
    {
      question: "What is an INDEX used for?",
      options: ["Counting rows", "Speeding up queries", "Sorting data", "Backing up data"],
      correct: 1,
      hint: "It makes searches faster like a book index"
    },
    {
      question: "What does INSERT INTO do?",
      options: ["Updates data", "Adds new rows", "Deletes rows", "Creates tables"],
      correct: 1,
      hint: "You're inserting new data into a table"
    },
    {
      question: "What is NULL in SQL?",
      options: ["Zero", "Empty string", "Unknown or missing value", "False"],
      correct: 2,
      hint: "NULL is not the same as 0 or empty"
    },
    {
      question: "What does UPDATE command do?",
      options: ["Creates new rows", "Modifies existing rows", "Deletes rows", "Reads rows"],
      correct: 1,
      hint: "It changes data that already exists"
    },
    {
      question: "What is a FOREIGN KEY?",
      options: ["A key from another database", "A reference to primary key in another table", "An encrypted key", "A backup key"],
      correct: 1,
      hint: "It creates relationships between tables"
    },
    {
      question: "What does ORDER BY do?",
      options: ["Filters data", "Groups data", "Sorts the result set", "Limits data"],
      correct: 2,
      hint: "You can order ASC or DESC"
    },
    {
      question: "What is a subquery?",
      options: ["A small query", "A query inside another query", "A fast query", "An invalid query"],
      correct: 1,
      hint: "Also called a nested query"
    },
    {
      question: "What does DISTINCT keyword do?",
      options: ["Makes query faster", "Removes duplicate rows from results", "Sorts uniquely", "Groups data"],
      correct: 1,
      hint: "It returns only unique values"
    },
  ],
  prompteng: [
    {
      question: "What is prompt engineering?",
      options: ["Building software", "Crafting effective AI prompts", "Hardware design", "Network engineering"],
      correct: 1,
      hint: "It's about communicating effectively with AI"
    },
    {
      question: "What is a 'system prompt'?",
      options: ["Operating system message", "Instructions that define AI behavior", "Error message", "User input"],
      correct: 1,
      hint: "It sets the context and rules for the AI"
    },
    {
      question: "What is 'few-shot prompting'?",
      options: ["Short prompts", "Providing examples in the prompt", "Quick responses", "Limited API calls"],
      correct: 1,
      hint: "You show the AI a few examples of what you want"
    },
    {
      question: "What is 'chain-of-thought' prompting?",
      options: ["Linking multiple AIs", "Asking AI to explain reasoning step by step", "Creating prompt chains", "Automated prompting"],
      correct: 1,
      hint: "It improves reasoning by showing thinking process"
    },
    {
      question: "What does 'temperature' parameter control?",
      options: ["Server heat", "Randomness/creativity of outputs", "Response speed", "Token count"],
      correct: 1,
      hint: "Higher temperature = more creative, lower = more focused"
    },
    {
      question: "What is 'zero-shot prompting'?",
      options: ["Failed prompt", "Prompting without examples", "Empty prompt", "First attempt"],
      correct: 1,
      hint: "The AI responds without being shown examples"
    },
    {
      question: "What are 'tokens' in LLMs?",
      options: ["Payment units", "Pieces of text (words/subwords)", "API keys", "Model parameters"],
      correct: 1,
      hint: "LLMs process text as tokens, not characters"
    },
    {
      question: "What is 'hallucination' in AI?",
      options: ["Visual output", "AI generating false information", "Image processing", "Voice recognition"],
      correct: 1,
      hint: "The AI confidently states incorrect facts"
    },
    {
      question: "What is the purpose of 'role prompting'?",
      options: ["Creating user roles", "Assigning AI a specific persona/role", "Managing permissions", "Testing roles"],
      correct: 1,
      hint: "Example: 'You are an expert Python developer...'"
    },
    {
      question: "What is 'context window'?",
      options: ["GUI element", "Maximum text an LLM can process at once", "Browser window", "Application window"],
      correct: 1,
      hint: "It limits how much the AI can 'remember'"
    },
    {
      question: "What is 'prompt injection'?",
      options: ["Adding more text", "Malicious attempt to override AI instructions", "Code injection", "Data insertion"],
      correct: 1,
      hint: "It's a security concern for AI applications"
    },
    {
      question: "What does 'grounding' mean in prompts?",
      options: ["Electrical grounding", "Providing factual context/sources", "Starting over", "Basic training"],
      correct: 1,
      hint: "It helps reduce hallucinations"
    },
    {
      question: "What is 'RAG' in AI?",
      options: ["Random AI Generation", "Retrieval-Augmented Generation", "Rapid AI Growth", "Regulated AI Guidance"],
      correct: 1,
      hint: "It combines retrieval with generation"
    },
    {
      question: "Why use delimiters in prompts?",
      options: ["For aesthetics", "To clearly separate different parts", "To reduce tokens", "To speed up processing"],
      correct: 1,
      hint: "Triple quotes or XML tags help structure prompts"
    },
    {
      question: "What is 'output formatting' in prompts?",
      options: ["Styling text", "Specifying desired response structure", "Compressing output", "Encrypting response"],
      correct: 1,
      hint: "Example: 'Respond in JSON format'"
    },
  ],
}

export function CodeQuiz({ language, onComplete }: CodeQuizProps) {
  const questions = quizQuestions[language] || quizQuestions.python
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === questions[currentQ].correct) {
      setCorrect(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1)
      setSelected(null)
      setAnswered(false)
      setShowHint(false)
    } else {
      const score = Math.round((correct / questions.length) * 100)
      const level = score < 40 ? "beginner" : score < 70 ? "intermediate" : "advanced"
      onComplete({
        score,
        totalQuestions: questions.length,
        correctAnswers: correct,
        level,
        language
      })
    }
  }

  const question = questions[currentQ]
  const progress = ((currentQ + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-sm text-secondary font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Code2 className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground leading-relaxed">{question.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selected === index
              const isCorrect = index === question.correct
              const showCorrect = answered && isCorrect
              const showWrong = answered && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={answered}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    showCorrect ? "bg-primary/20 border-primary" :
                    showWrong ? "bg-destructive/20 border-destructive" :
                    isSelected ? "bg-secondary/20 border-secondary" :
                    "bg-muted border-transparent hover:border-secondary/30"
                  }`}
                >
                  <span className="text-foreground">{option}</span>
                  {showCorrect && <Check className="w-5 h-5 text-primary" />}
                  {showWrong && <X className="w-5 h-5 text-destructive" />}
                </button>
              )
            })}
          </div>

          {/* Hint */}
          {!answered && (
            <button
              onClick={() => setShowHint(true)}
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Need a hint?
            </button>
          )}
          {showHint && !answered && (
            <div className="mt-3 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
              <p className="text-sm text-secondary">{question.hint}</p>
            </div>
          )}

          {/* Explanation after answer */}
          {answered && (
            <div className={`mt-4 p-3 rounded-lg ${
              selected === question.correct ? "bg-primary/10 border border-primary/20" : "bg-destructive/10 border border-destructive/20"
            }`}>
              <p className="text-sm text-foreground">
                {selected === question.correct ? "Correct! " : "Not quite. "}
                {question.hint}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!answered}
          className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Score indicator */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: questions.length }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < currentQ ? "bg-primary" :
              i === currentQ ? "bg-secondary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

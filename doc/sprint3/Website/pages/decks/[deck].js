import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Timer from './Quiz';
import StopWatch from './StopWatch';
import Navbar from '../../components/Navbar'; 
import axios from 'axios';
import jsPDF from 'jspdf';
import 'font-awesome/css/font-awesome.min.css';

function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}
export const DeckPage = () => {
  const router = useRouter();
  const { deck } = router.query; 
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckData, setDeckData] = useState([]);
  const [deckTitle, setDeckTitle] = useState('');
  const [quizMode, setQuizMode] = useState(false);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  // Define deck data for each topic
  const deckDataMap = {
    "software-design": [
        { question: "What is Object-Oriented Programming (OOP)?",
     answer: "A programming paradigm based on the concept of objects, which can contain data and code.",
     options: [
       "A programming language.",
      "A programming paradigm based on the concept of objects, which can contain data and code.",
       "A database model.",
       "None of the above."
     ]
   },
   {
     question: "What are the four main principles of OOP?",
     answer: "Encapsulation, Abstraction, Inheritance, and Polymorphism.",
     options: [
       "Encapsulation, Abstraction, Inheritance, and Polymorphism.",
       "Encapsulation, Inheritance, Encapsulation, and Polymorphism.",
       "Inheritance, Abstraction, Encapsulation, and Polymorphism.",
       "Abstraction, Inheritance, Polymorphism, and Class."
     ]
   },
   {
     question: "What is encapsulation in OOP?",
     answer: "The bundling of data with the methods that operate on that data.",
     options: [
       "Data protection.",
       "The bundling of data with the methods that operate on that data.",
       "A way to hide code.",
       "Grouping related classes together."
     ]
   },
   {
     question: "What is the purpose of inheritance?",
     answer: "To allow a new class to inherit properties and behavior from an existing class.",
     options: [
       "To allow a new class to inherit properties and behavior from an existing class.",
       "To increase performance of a group of similar classes.",
       "To change behavior of a class.",
       "To restrict class usage"
     ]
   },
   {
     question: "What is polymorphism?",
     answer: "The ability of different classes to respond to the same method call in their own way.",
     options: [
       "The ability of different classes to respond to the same method call in their own way.",
       "Multiple inheritance",
       "Method overriding",
       "Ability to handle multiple types"
     ]
   },
   {
     question: "What does SOLID stand for?",
     answer: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
     options: [
       "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
       "Simple Object, Layered Interface, Dependency Inversion, Object-Oriented Design",
       "Structure-Oriented Design, Interface Segregation, Dependency Inversion",
       "Simplicity, Open/Closed, Layered Design"
     ]
   },
   {
     question: "What is the Single Responsibility Principle?",
     answer: "A class should have only one reason to change, meaning it should only have one job.",
     options: [
       "A class should have only one reason to change, meaning it should only have one job.",
       "Classes should be divided into one purpose",
       "Classes should have multiple responsibilities",
       "Each class should be dependent on other classes"
     ]
   },
   {
     question: "What is the Open/Closed Principle?",
     answer: "Software entities should be open for extension but closed for modification.",
     options: [
       "Classes can be modified freely",
       "Software entities should be open for extension but closed for modification.",
       "Software should be closed for extension and modification",
       "Classes should be closed for modifications but open for deletion"
     ]
   },
   {
     question: "What is Liskov Substitution Principle?",
     answer: "Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.",
     options: [
       "Subclasses must be able to inherit methods",
       "Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.",
       "Superclasses should be extensible",
       "Objects in a class hierarchy should always have the same method"
     ]
   },
   {
     question: "What is the Interface Segregation Principle?",
     answer: "Clients should not be forced to depend on interfaces they do not use.",
     options: [
       "Clients should use every method in an interface",
       "Clients should not be forced to depend on interfaces they do not use.",
       "Classes should be divided based on interface needs",
       "All methods must be used in a class"
     ]
   },
   {
     question: "What is Dependency Inversion Principle?",
     answer: "High-level modules should not depend on low-level modules. Both should depend on abstractions.",
     options: [
       "High-level modules should be dependent on low-level modules",
       "Modules should depend on each other for ease of use",
       "High-level modules should not depend on low-level modules. Both should depend on abstractions.",
       "Low-level modules should depend on high-level modules"
     ]
   },
   {
     question: "What is a UML diagram?",
     answer: "A standardized visual representation of a system's architecture and design.",
     options: [
       "A standardized visual representation of a system's architecture and design.",
       "A form of documentation",
       "A class structure map",
       "A database model"
     ]
   },
   {
     question: "What is a class diagram in UML?",
     answer: "A diagram that shows the classes in a system and their relationships.",
     options: [
       "A diagram that shows the classes in a system and their relationships.",
       "Shows class inheritance",
       "Shows method functionality",
       "Shows database structure"
     ]
   },
   {
     question: "What does a sequence diagram represent?",
     answer: "The order of messages exchanged between objects in a scenario.",
     options: [
       "The structure of the system",
       "The lifecycle of objects",
       "Interaction between objects over time",
       "The order of messages exchanged between objects in a scenario."
     ]
   },
   {
     question: "What is a use case diagram?",
     answer: "A diagram that shows the interactions between users and the system.",
     options: [
       "A diagram showing system architecture",
       "A diagram showing actors and their interactions",
       "A diagram showing class relationships",
       "A diagram that shows the interactions between users and the system."
     ]
   },
   {
     question: "What is a design pattern?",
     answer: "A reusable solution to a common problem in software design.",
     options: [
       "A reusable solution to a common problem in software design.",
       "A coding convention",
       "A model for system architecture",
       "A reusable code library"
     ]
   },
   {
     question: "What is the Singleton pattern?",
     answer: "A design pattern that restricts the instantiation of a class to one single instance.",
     options: [
       "A design pattern that restricts the instantiation of a class to one single instance.",
       "A design pattern that creates multiple instances of a class",
       "A design pattern that allows instantiation of multiple objects",
       "A design pattern that enforces inheritance in classes"
     ]
   },
   {
     question: "What is the Factory pattern?",
     answer: "A design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of created objects.",
     options: [
       "A pattern for creating objects directly",
       "A design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of created objects.",
       "A pattern for object destruction",
       "A pattern that defines relationships between objects"
     ]
   },
   {
     question: "What is the Observer pattern?",
     answer: "A design pattern where an object maintains a list of dependents, called observers, and notifies them of state changes.",
     options: [
       "A design pattern for updating data across objects",
       "A design pattern where an object maintains a list of dependents, called observers, and notifies them of state changes.",
       "A design pattern for creating shared objects",
       "A design pattern for managing object creation"
     ]
   },
   {
     question: "What is the Strategy pattern?",
     answer: "A design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable.",
     options: [
       "A design pattern that defines an algorithm but allows clients to change it",
       "A design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable.",
       "A design pattern that provides one strategy for execution",
       "A design pattern for simplifying algorithms"
     ]
   },
   {
     question: "What is a Composite pattern?",
     answer: "A design pattern that allows you to compose objects into tree structures to represent part-whole hierarchies.",
     options: [
       "A design pattern for breaking down objects into simple components",
       "A design pattern for grouping related objects into a single structure",
       "A design pattern for object reuse",
       "A design pattern that allows you to compose objects into tree structures to represent part-whole hierarchies."
     ]
   }],
     "java-basics": [
       {
         question: "What is the main method in Java?",
         answer: "The entry point of any Java application, defined as public static void main(String[] args).",
         options: [
           "The method that runs a program in Java.",
           "The method that initializes objects.",
           "The entry point of any Java application, defined as public static void main(String[] args).",
           "The method to handle exceptions."
         ]
       },
       {
         question: "What are Java data types?",
         answer: "Categories of data that define how data is stored and manipulated.",
         options: [
           "Data that helps Java programs execute faster.",
           "Categories of data that define how data is stored and manipulated.",
           "The types of objects in Java.",
           "Types of variables used in Java."
         ]
       },
       {
         question: "What is a variable in Java?",
         answer: "A container for storing data values.",
         options: [
           "A reference to an object in memory.",
           "A container for storing data values.",
           "A data type in Java.",
           "A method to store values."
         ]
       },
       {
         question: "What is a constructor in Java?",
         answer: "A special method used to initialize objects.",
         options: [
           "A special method to destroy objects.",
           "A special method used to initialize objects.",
           "A special method to return values from a class.",
           "A default method in a class."
         ]
       },
       {
         question: "What is the difference between '==' and 'equals()' in Java?",
         answer: "'==' compares references, while 'equals()' compares values.",
         options: [
           "'==' compares references, while 'equals()' compares values.",
           "'==' compares object references, while 'equals()' compares data.",
           "'==' is used for primitive types, while 'equals()' is for objects.",
           "'==' compares values, while 'equals()' compares references."
         ]
       },
       {
         question: "What is an interface in Java?",
         answer: "A reference type in Java that can contain only constants, method signatures, default methods, static methods, and nested types.",
         options: [
           "A class that defines objects.",
           "A reference type in Java that can contain only constants, method signatures, default methods, static methods, and nested types.",
           "A method to implement behavior.",
           "A class that is not instantiable."
         ]
       },
       {
         question: "What is inheritance in Java?",
         answer: "A mechanism where one class inherits the properties and behaviors of another class.",
         options: [
           "The process of creating a class from another class",
           "A mechanism where one class inherits the properties and behaviors of another class.",
           "A way of defining new methods in Java",
           "A method of handling exceptions"
         ]
       },
       {
         question: "What is method overloading?",
         answer: "Defining multiple methods with the same name but different parameters.",
         options: [
           "Defining methods with the same name and signature",
           "Defining multiple methods with the same name but different parameters.",
           "Overriding methods in a subclass",
           "Changing method signatures"
         ]
       },
       {
         question: "What is method overriding?",
         answer: "A feature that allows a subclass to provide a specific implementation of a method already defined in its superclass.",
         options: [
           "Changing a method in the superclass",
           "A feature that allows a subclass to provide a specific implementation of a method already defined in its superclass.",
           "Calling methods in other classes",
           "Providing a more efficient version of a method"
         ]
       },
       {
         question: "What are Java Collections?",
         answer: "Frameworks that provide an architecture to store and manipulate a group of objects.",
         options: [
           "Frameworks that help with multithreading",
           "Classes that hold static data",
           "Frameworks that provide an architecture to store and manipulate a group of objects.",
           "Java libraries for database management"
         ]
       },
       {
         question: "What is an ArrayList in Java?",
         answer: "A resizable array implementation of the List interface.",
         options: [
           "A fixed-size array",
           "A resizable array implementation of the List interface.",
           "A map structure in Java",
           "A class to handle primitive data types"
         ]
       },
       {
         question: "What is a HashMap?",
         answer: "A part of the Java Collections Framework that provides a mapping from keys to values.",
         options: [
           "A type of array used to store data",
           "A part of the Java Collections Framework that provides a mapping from keys to values.",
           "A method for sorting arrays",
           "A thread-safe data structure"
         ]
       },
       {
         question: "What is exception handling in Java?",
         answer: "A mechanism to handle runtime errors, allowing the normal flow of the application.",
         options: [
           "A process to improve program performance",
           "A mechanism to handle runtime errors, allowing the normal flow of the application.",
           "A method to manage class inheritance",
           "A feature for simplifying code"
         ]
       },
       {
         question: "What is the try-catch block?",
         answer: "A block of code that can catch and handle exceptions.",
         options: [
           "A block for defining methods",
           "A block of code that can catch and handle exceptions.",
           "A block for managing multithreading",
           "A block used to optimize code execution"
         ]
       },
       {
         question: "What is multithreading?",
         answer: "The ability of a CPU to provide multiple threads of execution concurrently.",
         options: [
           "The process of executing multiple programs at the same time",
           "The ability to handle multiple tasks in one thread",
           "The ability of a CPU to provide multiple threads of execution concurrently.",
           "The process of distributing tasks across multiple CPUs"
         ]
       },
       {
         question: "What is a lambda expression?",
         answer: "A feature in Java that allows you to treat functionality as a method argument or to create a concise way to express instances of single-method interfaces.",
         options: [
           "A type of anonymous function",
           "A way to pass a method as an argument",
           "A feature in Java that allows you to treat functionality as a method argument or to create a concise way to express instances of single-method interfaces.",
           "A method for converting one type to another"
         ]
       },
       {
         question: "What is a Java package?",
         answer: "A namespace that organizes a set of related classes and interfaces.",
         options: [
           "A namespace that organizes a set of related classes and interfaces.",
           "A method to organize code for performance",
           "A collection of objects with shared attributes",
           "A way to handle object references"
         ]
       },
       {
         question: "What is a Java String?",
         answer: "An object that represents a sequence of characters.",
         options: [
           "A class for managing text data",
           "A primitive data type for holding characters",
           "An object that represents a sequence of characters.",
           "A reference type that holds a single character"
         ]
       },
       {
         question: "What is garbage collection in Java?",
         answer: "An automatic process that frees up memory by deleting unreferenced objects.",
         options: [
           "A method for cleaning up memory manually",
           "A mechanism to manage memory usage in programs",
           "An automatic process that frees up memory by deleting unreferenced objects.",
           "A process for deleting unused variables"
         ]
       },
       {
         question: "What is the Java Virtual Machine (JVM)?",
         answer: "An engine that provides a runtime environment to execute Java bytecode.",
         options: [
           "A platform for executing Java code",
           "An engine that provides a runtime environment to execute Java bytecode.",
           "A compiler that translates Java code into machine language",
           "A tool for optimizing Java applications"
         ]
       },
       {
         question: "What is the Java Development Kit (JDK)?",
         answer: "A software development kit used to develop Java applications.",
         options: [
           "A set of tools to execute Java code",
           "A package for running Java applications",
           "A software development kit used to develop Java applications.",
           "A tool for debugging Java code"
         ]
       }],
     "algorithms": [
       {
         question: "What is an Algorithm?",
         answer: "A step-by-step procedure to solve a problem.",
         options: [
           "A mathematical formula",
           "A step-by-step procedure to solve a problem.",
           "A computer program",
           "A data structure"
         ]
       },
       {
         question: "What is Big-O notation?",
         answer: "A notation to express the time complexity of an algorithm.",
         options: [
           "A notation for memory usage of an algorithm",
           "A notation to express the time complexity of an algorithm.",
           "A way to analyze data structure performance",
           "A tool for writing algorithms"
         ]
       },
       {
         question: "What is a sorting algorithm?",
         answer: "An algorithm that puts elements of a list in a certain order.",
         options: [
           "An algorithm that checks for duplicates",
           "An algorithm that puts elements of a list in a certain order.",
           "An algorithm that finds the largest element",
           "An algorithm that deletes items from a list"
         ]
       },
       {
         question: "What is a linear search?",
         answer: "A search algorithm that checks every element in a list until the desired element is found.",
         options: [
           "An algorithm that divides the list into smaller parts to search",
           "A search algorithm that checks every element in a list until the desired element is found.",
           "A search algorithm used for sorted lists",
           "An algorithm for binary search"
         ]
       },
       {
         question: "What is binary search?",
         answer: "An efficient algorithm for finding an item from a sorted list of items.",
         options: [
           "An efficient algorithm for finding an item from a unsorted list of items.",
           "An efficient algorithm for finding an item from a sorted list of items.",
           "A sorting algorithm",
           "A search algorithm that checks every element"
         ]
       },
       {
         question: "What is a recursive algorithm?",
         answer: "An algorithm that calls itself to solve subproblems.",
         options: [
           "An algorithm that iterates over data",
           "An algorithm that calls itself to solve subproblems",
           "An algorithm for sorting",
           "An algorithm used in data compression"
         ]
       },
       {
         question: "What is dynamic programming?",
         answer: "A method for solving complex problems by breaking them into smaller subproblems.",
         options: [
           "An algorithm that solves problems in real time",
           "A method for solving complex problems by breaking them into smaller subproblems.",
           "A type of greedy algorithm",
           "A method to sort large datasets"
         ]
       },
       {
         question: "What is a greedy algorithm?",
         answer: "An algorithm that builds a solution by always choosing the most immediate benefit.",
         options: [
           "An algorithm that uses recursion",
           "An algorithm that builds a solution by always choosing the most immediate benefit.",
           "A sorting algorithm",
           "An algorithm that checks all possibilities"
         ]
       },
       {
         question: "What is a graph algorithm?",
         answer: "An algorithm that operates on data structures called graphs.",
         options: [
           "An algorithm for sorting graphs",
           "An algorithm for traversing a tree",
           "An algorithm that operates on data structures called graphs.",
           "An algorithm for searching arrays"
         ]
       },
       {
         question: "What is Dijkstra's algorithm?",
         answer: "An algorithm for finding the shortest paths between nodes in a graph.",
         options: [
           "An algorithm for sorting a graph",
           "An algorithm for finding the shortest paths between nodes in a graph.",
           "An algorithm for traversing a tree",
           "An algorithm for finding the maximum value in a graph"
         ]
       },
       {
         question: "What is depth-first search (DFS)?",
         answer: "An algorithm for traversing or searching tree or graph data structures.",
         options: [
           "An algorithm for traversing or searching tree or graph data structures.",
           "A graph traversal that explores as far as possible along each branch before backtracking",
           "A breadth-first traversal algorithm",
           "An algorithm for finding the maximum element"
         ]
       },
       {
         question: "What is breadth-first search (BFS)?",
         answer: "A graph traversal that explores nodes level by level.",
         options: [
           "A traversal algorithm that explores each branch first",
           "A search algorithm for sorted data",
           "A graph traversal that explores nodes level by level.",
           "An algorithm for finding the minimum element"
         ]
       },
       {
         question: "What is a hash function?",
         answer: "A function that converts an input into a fixed-size string.",
         options: [
           "A function that checks for duplicates",
           "A function that converts an input into a fixed-size string.",
           "A function used for sorting data",
           "A function that adds two numbers"
         ]
       },
       {
         question: "What is the difference between a stack and a queue?",
         answer: "A stack follows Last In First Out (LIFO) order, while a queue follows First In First Out (FIFO) order.",
         options: [
           "Stacks are faster than queues",
           "A stack follows Last In First Out (LIFO) order, while a queue follows First In First Out (FIFO) order.",
           "Stacks are used in recursive algorithms, queues are used in sorting",
           "A stack follows LIFO, while a queue follows FIFO order"
         ]
       },
       {
         question: "What is a bubble sort?",
         answer: "A sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
         options: [
           "A sorting algorithm that divides the list into two parts",
           "A sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
           "A divide-and-conquer sorting algorithm",
           "A sorting algorithm that uses a priority queue"
         ]
       },
       {
         question: "What is quicksort?",
         answer: "A sorting algorithm that uses recursion and a divide-and-conquer strategy.",
         options: [
           "A sorting algorithm that sorts elements by comparison",
           "A sorting algorithm that uses recursion and a divide-and-conquer strategy.",
           "A simple sorting algorithm that compares adjacent elements",
           "A sorting algorithm used for large datasets only"
         ]
       },
       {
         question: "What is merge sort?",
         answer: "A sorting algorithm that divides the array into halves, sorts, and merges them.",
         options: [
           "A sorting algorithm that repeatedly swaps adjacent elements",
           "A sorting algorithm that divides the array into halves, sorts, and merges them.",
           "A sorting algorithm based on quicksort",
           "A non-recursive sorting algorithm"
         ]
       },
       {
         question: "What is a searching algorithm?",
         answer: "An algorithm that retrieves information stored within some data structure.",
         options: [
           "An algorithm that searches for the smallest element",
           "An algorithm used to traverse a tree",
           "An algorithm that retrieves information stored within some data structure.",
           "An algorithm that removes elements from a list"
         ]
       },
       {
         question: "What is a time complexity?",
         answer: "A measure of how quickly an algorithm runs.",
         options: [
           "The space used by an algorithm",
           "A measure of the number of operations in an algorithm",
           "A measure of how quickly an algorithm runs.",
           "The amount of memory used by an algorithm"
         ]
       },
       {
         question: "What is a space complexity?",
         answer: "The amount of memory used by an algorithm.",
         options: [
           "A measure of the number of operations in an algorithm",
           "The amount of memory used by an algorithm.",
           "A measure of how quickly an algorithm runs",
           "The time it takes for an algorithm to finish"
         ]
       }],
     "data-structures": [
       {
         question: "What is a Data Structure?",
         answer: "A way to organize and store data efficiently.",
         options: [
           "A method of sorting data",
           "A way to organize and store data efficiently",
           "A set of algorithms for searching data",
           "A way to compress data"
         ]
       },
       {
         question: "What is a linked list?",
         answer: "A data structure where each element points to the next, forming a sequence.",
         options: [
           "A data structure with elements in a fixed order",
           "A data structure where each element points to the next, forming a sequence.",
           "A data structure that supports constant time searching",
           "A structure for ordered data"
         ]
       },
       {
         question: "What is a stack?",
         answer: "A collection that follows Last In First Out (LIFO) order.",
         options: [
           "A collection that follows First In First Out (FIFO) order",
           "A collection that follows Last In First Out (LIFO) order.",
           "A collection for unordered data",
           "A collection that supports random access"
         ]
       },
       {
         question: "What is a queue?",
         answer: "A collection that follows First In First Out (FIFO) order.",
         options: [
           "A collection for unordered data",
           "A structure that follows Last In First Out order",
           "A collection that follows First In First Out (FIFO) order.",
           "A collection that supports random access"
         ]
       },
       {
         question: "What is a binary tree?",
         answer: "A tree data structure where each node has at most two children.",
         options: [
           "A tree with multiple branches per node",
           "A tree data structure where each node has at most two children.",
           "A data structure used for sorting",
           "A collection of nodes connected by edges"
         ]
       },
       {
         question: "What is a binary search tree (BST)?",
         answer: "A binary tree where the left child is less than the parent node, and the right child is greater.",
         options: [
           "A binary tree where the left child is less than the parent node, and the right child is greater.",
           "A tree where the left child is greater than the parent",
           "A tree with no children",
           "A tree that does not require sorting"
         ]
       },
       {
         question: "What is a hash table?",
         answer: "A data structure that implements an associative array, mapping keys to values using a hash function.",
         options: [
           "A tree-like structure for quick searching",
           "A collection of linked lists",
           "A data structure that implements an associative array, mapping keys to values using a hash function.",
           "A sorted list of elements"
         ]
       },
       {
         question: "What is a graph?",
         answer: "A collection of nodes connected by edges, representing relationships.",
         options: [
           "A structure where nodes are connected by pointers",
           "A collection of nodes connected by edges, representing relationships.",
           "A data structure used for searching",
           "A structure for organizing arrays"
         ]
       },
       {
         question: "What is an adjacency matrix?",
         answer: "A 2D array used to represent a finite graph.",
         options: [
           "A list of nodes in a graph",
           "A 2D array used to represent a finite graph.",
           "A set of linked lists representing edges",
           "A collection of edges only"
         ]
       },
       {
         question: "What is an adjacency list?",
         answer: "A collection of lists used to represent a graph, where each list corresponds to a vertex.",
         options: [
           "A set of nodes in a graph",
           "A collection of lists used to represent a graph, where each list corresponds to a vertex.",
           "A matrix representation of a graph",
           "A collection of isolated nodes"
         ]
       },
       {
         question: "What is a heap?",
         answer: "A tree-based data structure that satisfies the heap property.",
         options: [
           "A tree with fixed-size nodes",
           "A tree-based data structure that satisfies the heap property.",
           "A list of nodes sorted by value",
           "A structure for storing sorted elements"
         ]
       },
       {
         question: "What is a priority queue?",
         answer: "An abstract data type that allows for efficient retrieval of the highest or lowest priority element.",
         options: [
           "A data structure for queueing tasks",
           "An abstract data type that allows for efficient retrieval of the highest or lowest priority element.",
           "A queue with unordered elements",
           "A data structure with no prioritization"
         ]
       },
       {
         question: "What is a set?",
         answer: "A collection of distinct objects.",
         options: [
           "A collection that allows duplicates",
           "A collection of distinct objects.",
           "A collection of ordered elements",
           "A collection of key-value pairs"
         ]
       },
       {
         question: "What is a dictionary?",
         answer: "A data structure that stores key-value pairs.",
         options: [
           "A collection of ordered elements",
           "A data structure that stores key-value pairs.",
           "A data structure used for searching",
           "A collection of unique elements"
         ]
       },
       {
         question: "What is a trie?",
         answer: "A tree-like data structure used to store a dynamic set of strings.",
         options: [
           "A structure used for searching numeric data",
           "A tree-like data structure used to store a dynamic set of strings.",
           "A list of key-value pairs",
           "A data structure that stores integers"
         ]
       },
       {
         question: "What is a circular linked list?",
         answer: "A linked list where all nodes are connected to form a circle.",
         options: [
           "A linked list with no head node",
           "A linked list where all nodes are connected to form a circle.",
           "A doubly linked list",
           "A linked list with cyclic connections between nodes"
         ]
       },
       {
         question: "What is a graph traversal?",
         answer: "The process of visiting all the nodes in a graph.",
         options: [
           "The process of sorting the graph",
           "The process of visiting all the nodes in a graph.",
           "The process of finding the shortest path in a graph",
           "A method for deleting nodes in a graph"
         ]
       },
       {
         question: "What is a depth-first traversal?",
         answer: "A graph traversal method that explores as far as possible along each branch before backtracking.",
         options: [
           "A graph traversal method that explores nodes level by level",
           "A graph traversal method that explores as far as possible along each branch before backtracking.",
           "A graph traversal method that uses breadth-first exploration",
           "A non-recursive graph traversal method"
         ]
       },
       {
         question: "What is a breadth-first traversal?",
         answer: "A graph traversal method that explores nodes level by level.",
         options: [
          "A graph traversal method that explores nodes level by level",
          "A graph traversal method that explores as far as possible along each branch before backtracking.",
          "A graph traversal method that uses breadth-first exploration",
          "A non-recursive graph traversal method"
        ]
       },
       {
         question: "What is a disjoint set?",
         answer: "A data structure that keeps track of a set of elements partitioned into disjoint subsets.",
         options: [
           "A collection of elements that overlap",
           "A data structure that keeps track of a set of elements partitioned into disjoint subsets.",
           "A type of linked list",
           "A binary tree structure"
         ]
       },
       {
         question: "What is an AVL tree?",
         answer: "A self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one.",
         options: [
           "A tree that stores sorted elements",
           "A self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one.",
           "A tree used for graph traversal",
           "A type of heap"
         ]
       }]
   };
   useEffect(() => {
    if (!deck) return;
    if (deckDataMap[deck]) {
      setDeckData(deckDataMap[deck]);
      setDeckTitle(deck.replace('-', ' ').toUpperCase());
      setSelectedAnswers(new Array(deckDataMap[deck].length).fill(null)); // Initialize with null
    } else {
      const fetchDeckData = async () => {
        try {
          let res;
          if (isValidObjectId(deck)) {
            res = await axios.get(`/api/decks?id=${deck}`);
          } else {
            const encodedDeckName = encodeURIComponent(deck);
            res = await axios.get(`/api/deck?deckName=${encodedDeckName}`);
          }
          setDeckData(res.data.cards);
          setDeckTitle(res.data.deckName);
          setSelectedAnswers(new Array(res.data.cards.length).fill(null)); // Initialize with null
        } catch (error) {
          console.error('Error fetching deck data:', error);
        }
      };
      fetchDeckData();
    }
  }, [deck]);

  const handleAnswerSelect = (option) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentCard] = option; // Set the selected answer for the current question
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const submitQuiz = () => {
    setQuizEnded(true); // Mark the quiz as ended
    setQuizMode(false);

    // Calculate the final score by checking if selected answers match correct answers
    const finalScore = selectedAnswers.filter((answer, index) => answer === deckData[index].answer).length;
    setScore(finalScore); // Set the final score
  };

  const downloadPDF = (deck) => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(deck.deckName, 10, 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    const margin = 10;
    const maxWidth = 190;
    const pageHeight = doc.internal.pageSize.height;
    let yOffset = 20;

    if (deck.cards && deck.cards.length > 0) {
      deck.cards.forEach((card, index) => {
        if (yOffset + 20 > pageHeight) {
          doc.addPage();
          yOffset = 20;
        }

        const questionLines = doc.splitTextToSize(`${index + 1}. Question: ${card.question}`, maxWidth);
        doc.text(questionLines, margin, yOffset);
        yOffset += questionLines.length * 5;

        const answerLines = doc.splitTextToSize(`   Answer: ${card.answer}`, maxWidth);
        doc.text(answerLines, margin, yOffset);
        yOffset += answerLines.length * 5 + 10;
      });
    } else {
      doc.text('No cards in this deck.', margin, yOffset);
    }

    doc.save(`${deck.deckName}.pdf`);
  };

  const flipCard = () => setIsFlipped(!isFlipped);
  const renderResults = () => {
    return (
      <div className="quiz-results-container">
        <h3>Quiz Review</h3>
        {deckData.map((card, index) => (
          <div key={index} className="question-result">
            <p><strong>Question:</strong> {card.question}</p>
            <p><strong>Correct Answer:</strong> {card.answer}</p>
            <p><strong>Your Answer:</strong> {selectedAnswers[index]}</p> {/* Use selectedAnswers instead of userSelections */}
            <p style={{ color: selectedAnswers[index] === card.answer ? 'green' : 'red' }}>
              {selectedAnswers[index] === card.answer ? 'Correct' : 'Incorrect'}
            </p>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="flashcard-container">
      <div className="timer">
        <Timer 
          startTimer={quizMode} 
          setStartTimer={setQuizMode} 
          setQuizMode={setQuizMode} 
          setCurrentCard={setCurrentCard}
          setScore={setScore}
        />
      </div>
      <h2 className="deck-title">{deckTitle}</h2>
      
      {quizMode && !quizEnded ? (
        <div className="quiz-container">
          {deckData.length > 0 && currentCard < deckData.length ? (
            <div className="question-card">
              <h3>Question: {deckData[currentCard].question}</h3>
              <div className="options">
                {deckData[currentCard].options && deckData[currentCard].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)} // Update selected answer
                    className={selectedAnswers[currentCard] === option ? 'selected' : ''}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button 
                onClick={submitQuiz} 
                className="Submit" 
                title={currentCard + 1 === deckData.length ? 'Submit Quiz' : 'Next Question'}
                style={{ 
                  visibility: currentCard === deckData.length - 1 ? 'visible' : 'hidden' 
                }}
              >
                {currentCard + 1 === deckData.length ? 'Submit Quiz' : '→'}
              </button>
            </div>
          ) : (
            <div className="quiz-result">
              <h3>Quiz Over! Your Score: {score}/{deckData.length}</h3>
            </div>
          )}
        </div>
      ) : quizEnded ? (
        <div className="quiz-result">
          {/* Centralized Quiz Over Text */}
          <div className="centralize-quiz-over">
            <h3>Quiz Over! Your Score: {score}/{deckData.length}</h3>
          </div>
          {renderResults()}
          <div className="centralize-button">
    <button
      onClick={() => window.location.reload()} // Reload the page
      className="back-to-flashcards"
    >
      Back to Flashcards
    </button>
  </div>
        </div>
      ) : (
        <div className="flashcard-container">
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
            <div className="front">
              {deckData[currentCard]?.question}
            </div>
            <div className="back">
              {deckData[currentCard]?.answer}
            </div>
          </div>
        </div>
      )}
  
      {!quizEnded && (
        <>
          <div className="stopwatch"><StopWatch /></div>
          <div className="cardNum">Card: {currentCard + 1}/{deckData.length}</div>
          <div className="controls">
            <button onClick={() => setCurrentCard((currentCard - 1 + deckData.length) % deckData.length)}>←</button>
            <button onClick={() => setCurrentCard((currentCard + 1) % deckData.length)}>→</button>
          </div>
          <div className="shuffle">
            <button onClick={() => setCurrentCard(Math.floor(Math.random() * deckData.length))} title="Shuffle deck">
              <i className="fa fa-random"></i>
            </button>
          </div>
         
      <button onClick={() => downloadPDF({ deckName: deckTitle, cards: deckData })} className="download-btn" title="Download flashcard deck">
        <i className="fa fa-download"></i>
      </button>
        </>
      )}
  
  <div className="sidebar"><Navbar /></div>
    </div>
  );
};

export default DeckPage;
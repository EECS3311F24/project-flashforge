import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'; 

const DeckPage = () => {
  const router = useRouter();
  const { deck } = router.query; // Get the deck name from the route
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Define deck data for each topic
  const deckDataMap = {
   "software-design": [
        { question: "What is Object-Oriented Programming (OOP)?", answer: "A programming paradigm based on the concept of objects, which can contain data and code." },
        { question: "What are the four main principles of OOP?", answer: "Encapsulation, Abstraction, Inheritance, and Polymorphism." },
        { question: "What is encapsulation in OOP?", answer: "The bundling of data with the methods that operate on that data." },
        { question: "What is the purpose of inheritance?", answer: "To allow a new class to inherit properties and behavior from an existing class." },
        { question: "What is polymorphism?", answer: "The ability of different classes to respond to the same method call in their own way." },
        { question: "What does SOLID stand for?", answer: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion." },
        { question: "What is the Single Responsibility Principle?", answer: "A class should have only one reason to change, meaning it should only have one job." },
        { question: "What is the Open/Closed Principle?", answer: "Software entities should be open for extension but closed for modification." },
        { question: "What is Liskov Substitution Principle?", answer: "Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program." },
        { question: "What is the Interface Segregation Principle?", answer: "Clients should not be forced to depend on interfaces they do not use." },
        { question: "What is Dependency Inversion Principle?", answer: "High-level modules should not depend on low-level modules. Both should depend on abstractions." },
        { question: "What is a UML diagram?", answer: "A standardized visual representation of a system's architecture and design." },
        { question: "What is a class diagram in UML?", answer: "A diagram that shows the classes in a system and their relationships." },
        { question: "What does a sequence diagram represent?", answer: "The order of messages exchanged between objects in a scenario." },
        { question: "What is a use case diagram?", answer: "A diagram that shows the interactions between users and the system." },
        { question: "What is a design pattern?", answer: "A reusable solution to a common problem in software design." },
        { question: "What is the Singleton pattern?", answer: "A design pattern that restricts the instantiation of a class to one single instance." },
        { question: "What is the Factory pattern?", answer: "A design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of created objects." },
        { question: "What is the Observer pattern?", answer: "A design pattern where an object maintains a list of dependents, called observers, and notifies them of state changes." },
        { question: "What is the Strategy pattern?", answer: "A design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable." },
        { question: "What is a Composite pattern?", answer: "A design pattern that allows you to compose objects into tree structures to represent part-whole hierarchies." }
    ],
    "java-basics": [
    { question: "What is the main method in Java?", answer: "The entry point of any Java application, defined as public static void main(String[] args)." },
    { question: "What are Java data types?", answer: "Java data types are categories of data that tell the compiler how to store and manipulate data." },
    { question: "What is a variable in Java?", answer: "A variable is a container for storing data values." },
    { question: "What is a constructor in Java?", answer: "A special method used to initialize objects." },
    { question: "What is the difference between '==' and 'equals()' in Java?", answer: "'==' compares references, while 'equals()' compares values." },
    { question: "What is an interface in Java?", answer: "An interface is a reference type in Java that can contain only constants, method signatures, default methods, static methods, and nested types." },
    { question: "What is inheritance in Java?", answer: "Inheritance is a mechanism where one class acquires the properties and behaviors of another class." },
    { question: "What is method overloading?", answer: "Defining multiple methods with the same name but different parameters." },
    { question: "What is method overriding?", answer: "A feature that allows a subclass to provide a specific implementation of a method already defined in its superclass." },
    { question: "What are Java Collections?", answer: "Frameworks that provide an architecture to store and manipulate a group of objects." },
    { question: "What is an ArrayList in Java?", answer: "A resizable array implementation of the List interface." },
    { question: "What is a HashMap?", answer: "A part of the Java Collections Framework that provides a mapping from keys to values." },
    { question: "What is exception handling in Java?", answer: "A mechanism to handle runtime errors, allowing the normal flow of the application." },
    { question: "What is the try-catch block?", answer: "A block of code that can catch and handle exceptions." },
    { question: "What is multithreading?", answer: "The ability of a CPU to provide multiple threads of execution concurrently." },
    { question: "What is a lambda expression?", answer: "A feature in Java that allows you to treat functionality as a method argument or to create a concise way to express instances of single-method interfaces." },
    { question: "What is a Java package?", answer: "A namespace that organizes a set of related classes and interfaces." },
    { question: "What is a Java String?", answer: "An object that represents a sequence of characters." },
    { question: "What is garbage collection in Java?", answer: "An automatic process that frees up memory by deleting unreferenced objects." },
    { question: "What is the Java Virtual Machine (JVM)?", answer: "An engine that provides a runtime environment to execute Java bytecode." },
    { question: "What is the Java Development Kit (JDK)?", answer: "A software development kit used to develop Java applications." },
],
    "algorithms": [
    { question: "What is an Algorithm?", answer: "A step-by-step procedure to solve a problem." },
    { question: "What is Big-O notation?", answer: "A notation to express the time complexity of an algorithm." },
    { question: "What is a sorting algorithm?", answer: "An algorithm that puts elements of a list in a certain order." },
    { question: "What is a linear search?", answer: "A search algorithm that checks every element in a list until the desired element is found." },
    { question: "What is binary search?", answer: "An efficient algorithm for finding an item from a sorted list of items." },
    { question: "What is a recursive algorithm?", answer: "An algorithm that calls itself to solve smaller instances of the same problem." },
    { question: "What is dynamic programming?", answer: "A method for solving complex problems by breaking them down into simpler subproblems." },
    { question: "What is a greedy algorithm?", answer: "An algorithm that builds up a solution piece by piece, always choosing the next piece that offers the most immediate benefit." },
    { question: "What is a graph algorithm?", answer: "An algorithm that operates on data structures called graphs." },
    { question: "What is Dijkstra's algorithm?", answer: "An algorithm for finding the shortest paths between nodes in a graph." },
    { question: "What is depth-first search (DFS)?", answer: "An algorithm for traversing or searching tree or graph data structures." },
    { question: "What is breadth-first search (BFS)?", answer: "An algorithm for traversing or searching tree or graph data structures that explores neighbors before moving on to the next level." },
    { question: "What is a hash function?", answer: "A function that converts an input into a fixed-size string of bytes, typically used in hash tables." },
    { question: "What is the difference between a stack and a queue?", answer: "A stack follows Last In First Out (LIFO) order, while a queue follows First In First Out (FIFO) order." },
    { question: "What is a bubble sort?", answer: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order." },
    { question: "What is quicksort?", answer: "A highly efficient sorting algorithm that uses a divide-and-conquer strategy to sort elements." },
    { question: "What is merge sort?", answer: "A sorting algorithm that divides the array into halves, sorts them, and then merges them back together." },
    { question: "What is a searching algorithm?", answer: "An algorithm that retrieves information stored within some data structure." },
    { question: "What is a time complexity?", answer: "A computational complexity that describes the amount of time it takes to run an algorithm." },
    { question: "What is a space complexity?", answer: "A computational complexity that describes the amount of memory space required by an algorithm." }
],
    "data-structures": [
    { question: "What is a Data Structure?", answer: "A way to organize and store data efficiently." },
    { question: "What is a linked list?", answer: "A data structure where each element points to the next, forming a sequence." },
    { question: "What is a stack?", answer: "A collection that follows Last In First Out (LIFO) order." },
    { question: "What is a queue?", answer: "A collection that follows First In First Out (FIFO) order." },
    { question: "What is a binary tree?", answer: "A tree data structure where each node has at most two children." },
    { question: "What is a binary search tree (BST)?", answer: "A binary tree where the left child is less than the parent node, and the right child is greater." },
    { question: "What is a hash table?", answer: "A data structure that implements an associative array, mapping keys to values using a hash function." },
    { question: "What is a graph?", answer: "A collection of nodes connected by edges, representing relationships." },
    { question: "What is an adjacency matrix?", answer: "A 2D array used to represent a finite graph." },
    { question: "What is an adjacency list?", answer: "A collection of lists used to represent a graph, where each list corresponds to a vertex." },
    { question: "What is a heap?", answer: "A special tree-based data structure that satisfies the heap property." },
    { question: "What is a priority queue?", answer: "An abstract data type that allows for efficient retrieval of the highest or lowest priority element." },
    { question: "What is a set?", answer: "A collection of distinct objects, considered as an object in its own right." },
    { question: "What is a dictionary?", answer: "A data structure that stores key-value pairs." },
    { question: "What is a trie?", answer: "A tree-like data structure used to store a dynamic set of strings." },
    { question: "What is a circular linked list?", answer: "A linked list where all nodes are connected to form a circle." },
    { question: "What is a graph traversal?", answer: "The process of visiting all the nodes in a graph." },
    { question: "What is a depth-first traversal?", answer: "A graph traversal method that explores as far as possible along each branch before backtracking." },
    { question: "What is a breadth-first traversal?", answer: "A graph traversal method that explores all the neighbor nodes at the present depth before moving on to nodes at the next depth level." },
    { question: "What is a disjoint set?", answer: "A data structure that keeps track of a set of elements partitioned into disjoint subsets." },
    { question: "What is an AVL tree?", answer: "A self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one." }
]
  };

  // Get the relevant data based on the deck name
  const deckData = deckDataMap[deck] || []; // Fallback to empty if deck not found

  const flipCard = () => setIsFlipped(!isFlipped);

  return (
    <div className="flashcard-container">
      <h2>{deck?.replace('-', ' ').toUpperCase()}</h2> {/* Display deck title */}
      
      {deckData.length > 0 ? (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
          <div className="front">
            {deckData[currentCard].question}
          </div>
          <div className="back">
            {deckData[currentCard].answer}
          </div>
        </div>
      ) : (
        <p>No questions available for this topic.</p>
      )}
      
      <div className="controls">
        <button onClick={() => setCurrentCard((currentCard - 1 + deckData.length) % deckData.length)}>←</button>
        <button onClick={() => setCurrentCard((currentCard + 1) % deckData.length)}>→</button>
      </div>
      
      <div className="sidebar"><Navbar /></div>
    </div>   
  );
};

export default DeckPage;
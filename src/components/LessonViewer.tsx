import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Code, 
  CheckCircle, 
  PlayCircle,
  Lightbulb,
  Target,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface CodeExample {
  title: string;
  code: string;
  explanation: string;
  output?: string;
}

interface LessonSection {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  keyPoints?: string[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  sections: LessonSection[];
  objectives: string[];
}

interface LessonViewerProps {
  topicId: string;
  onBack: () => void;
  onComplete: (topicId: string) => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ topicId, onBack, onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

  const lessons: Record<string, Lesson> = {
    '1': {
      id: '1',
      title: 'Object-Oriented Programming',
      description: 'Master the fundamental concepts of OOP in Java',
      difficulty: 'Intermediate',
      estimatedTime: '45 minutes',
      objectives: [
        'Understand the four pillars of OOP',
        'Learn to create classes and objects',
        'Master inheritance and polymorphism',
        'Apply encapsulation and abstraction'
      ],
      sections: [
        {
          id: 'intro',
          title: 'Introduction to OOP',
          content: `Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects and classes. It's based on four fundamental principles that help create more maintainable, reusable, and organized code.

**Why OOP?**
- **Code Reusability**: Write once, use many times
- **Modularity**: Break complex problems into smaller, manageable pieces  
- **Maintainability**: Easier to update and modify code
- **Real-world Modeling**: Represents real-world entities naturally

Java is a pure object-oriented language, meaning everything in Java is an object (except primitive data types).`,
          keyPoints: [
            'OOP organizes code into objects and classes',
            'Based on four main principles: Encapsulation, Inheritance, Polymorphism, Abstraction',
            'Promotes code reusability and maintainability',
            'Java is a pure OOP language'
          ]
        },
        {
          id: 'classes-objects',
          title: 'Classes and Objects',
          content: `A **Class** is a blueprint or template for creating objects. An **Object** is an instance of a class.

Think of a class as a cookie cutter and objects as the cookies made from that cutter. Each cookie (object) has the same shape (structure) but can have different decorations (values).`,
          codeExamples: [
            {
              title: 'Creating a Simple Class',
              code: `public class Car {
    // Instance variables (attributes)
    private String brand;
    private String model;
    private int year;
    private String color;
    
    // Constructor
    public Car(String brand, String model, int year, String color) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
    }
    
    // Methods (behaviors)
    public void startEngine() {
        System.out.println(brand + " " + model + " engine started!");
    }
    
    public void displayInfo() {
        System.out.println(year + " " + color + " " + brand + " " + model);
    }
    
    // Getter methods
    public String getBrand() {
        return brand;
    }
    
    public String getModel() {
        return model;
    }
}`,
              explanation: 'This Car class defines the blueprint for car objects with attributes (brand, model, year, color) and methods (startEngine, displayInfo).'
            },
            {
              title: 'Creating and Using Objects',
              code: `public class Main {
    public static void main(String[] args) {
        // Creating objects (instances) of Car class
        Car car1 = new Car("Toyota", "Camry", 2023, "Blue");
        Car car2 = new Car("Honda", "Civic", 2022, "Red");
        
        // Using object methods
        car1.startEngine();
        car1.displayInfo();
        
        car2.startEngine();
        car2.displayInfo();
        
        // Accessing object properties through getters
        System.out.println("Car 1 brand: " + car1.getBrand());
    }
}`,
              explanation: 'Here we create two Car objects with different values and call their methods to perform actions.',
              output: `Toyota Camry engine started!
2023 Blue Toyota Camry
Honda Civic engine started!
2022 Red Honda Civic
Car 1 brand: Toyota`
            }
          ],
          keyPoints: [
            'Class = Blueprint, Object = Instance of the class',
            'Classes contain attributes (variables) and methods (functions)',
            'Use "new" keyword to create objects',
            'Each object has its own copy of instance variables'
          ]
        },
        {
          id: 'encapsulation',
          title: 'Encapsulation',
          content: `**Encapsulation** is the bundling of data (variables) and methods that operate on that data within a single unit (class). It also involves hiding the internal details of how an object works.

**Key Concepts:**
- **Data Hiding**: Making variables private
- **Access Control**: Using public, private, protected modifiers
- **Getter/Setter Methods**: Controlled access to private data`,
          codeExamples: [
            {
              title: 'Proper Encapsulation Example',
              code: `public class BankAccount {
    // Private variables (data hiding)
    private String accountNumber;
    private double balance;
    private String ownerName;
    
    // Constructor
    public BankAccount(String accountNumber, String ownerName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = initialBalance >= 0 ? initialBalance : 0;
    }
    
    // Public methods to access private data (controlled access)
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            return true;
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds");
            return false;
        }
    }
    
    // Getter methods (read-only access)
    public double getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public String getOwnerName() {
        return ownerName;
    }
}`,
              explanation: 'The BankAccount class encapsulates account data and provides controlled access through methods. Direct access to balance is prevented, ensuring data integrity.'
            },
            {
              title: 'Using the Encapsulated Class',
              code: `public class BankDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("12345", "John Doe", 1000.0);
        
        // Can't directly access private variables
        // account.balance = -500; // This would cause compilation error
        
        // Must use public methods
        System.out.println("Initial balance: $" + account.getBalance());
        
        account.deposit(250.0);
        System.out.println("Balance after deposit: $" + account.getBalance());
        
        account.withdraw(100.0);
        System.out.println("Balance after withdrawal: $" + account.getBalance());
        
        // Try invalid operations
        account.withdraw(2000.0); // Should fail
        account.deposit(-50.0);   // Should fail
    }
}`,
              explanation: 'This demonstrates how encapsulation protects data integrity by preventing direct access to private variables.',
              output: `Initial balance: $1000.0
Deposited: $250.0
Balance after deposit: $1250.0
Withdrawn: $100.0
Balance after withdrawal: $1150.0
Invalid withdrawal amount or insufficient funds
Invalid deposit amount`
            }
          ],
          keyPoints: [
            'Hide internal data using private access modifier',
            'Provide controlled access through public methods',
            'Validate data before modifying it',
            'Protects object integrity and prevents misuse'
          ]
        },
        {
          id: 'inheritance',
          title: 'Inheritance',
          content: `**Inheritance** allows a class to inherit properties and methods from another class. The class that inherits is called a **subclass** (child), and the class being inherited from is called a **superclass** (parent).

**Benefits:**
- **Code Reusability**: Don't repeat common code
- **Method Overriding**: Customize inherited behavior
- **Hierarchical Classification**: Model real-world relationships`,
          codeExamples: [
            {
              title: 'Basic Inheritance Example',
              code: `// Parent class (Superclass)
public class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
    
    public void makeSound() {
        System.out.println(name + " makes a sound");
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Child class (Subclass)
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }
    
    // Method overriding
    @Override
    public void makeSound() {
        System.out.println(name + " barks: Woof! Woof!");
    }
    
    // Additional method specific to Dog
    public void wagTail() {
        System.out.println(name + " is wagging tail");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent method
        System.out.println("Breed: " + breed);
    }
}`,
              explanation: 'Dog class inherits from Animal class, gaining access to eat(), sleep(), and other methods while adding its own specific behavior.'
            },
            {
              title: 'Using Inheritance',
              code: `public class InheritanceDemo {
    public static void main(String[] args) {
        // Create Animal object
        Animal genericAnimal = new Animal("Generic Animal", 5);
        genericAnimal.displayInfo();
        genericAnimal.makeSound();
        
        System.out.println("---");
        
        // Create Dog object
        Dog myDog = new Dog("Buddy", 3, "Golden Retriever");
        myDog.displayInfo(); // Uses overridden method
        myDog.eat();         // Inherited from Animal
        myDog.makeSound();   // Overridden method
        myDog.wagTail();     // Dog-specific method
        
        System.out.println("---");
        
        // Polymorphism: Dog object treated as Animal
        Animal animalRef = new Dog("Max", 2, "Labrador");
        animalRef.makeSound(); // Calls Dog's overridden method
    }
}`,
              explanation: 'This shows how inherited methods work and demonstrates polymorphism where a Dog object can be treated as an Animal.',
              output: `Name: Generic Animal, Age: 5
Generic Animal makes a sound
---
Name: Buddy, Age: 3
Breed: Golden Retriever
Buddy is eating
Buddy barks: Woof! Woof!
Buddy is wagging tail
---
Max barks: Woof! Woof!`
            }
          ],
          keyPoints: [
            'Use "extends" keyword to inherit from a class',
            'Child class gets all public/protected members of parent',
            'Use "super" to call parent constructor or methods',
            'Override methods to customize inherited behavior'
          ]
        },
        {
          id: 'polymorphism',
          title: 'Polymorphism',
          content: `**Polymorphism** means "many forms." It allows objects of different classes to be treated as objects of a common base class while maintaining their specific behaviors.

**Types of Polymorphism:**
- **Runtime Polymorphism**: Method overriding
- **Compile-time Polymorphism**: Method overloading

**Key Benefits:**
- Write more flexible and maintainable code
- Treat different objects uniformly
- Easy to extend with new types`,
          codeExamples: [
            {
              title: 'Polymorphism with Method Overriding',
              code: `// Base class
abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method - must be implemented by subclasses
    public abstract double calculateArea();
    
    // Concrete method
    public void displayColor() {
        System.out.println("Color: " + color);
    }
}

// Subclasses
class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double width, height;
    
    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
}

class Triangle extends Shape {
    private double base, height;
    
    public Triangle(String color, double base, double height) {
        super(color);
        this.base = base;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return 0.5 * base * height;
    }
}`,
              explanation: 'Different shape classes implement the same calculateArea() method differently, demonstrating polymorphism.'
            },
            {
              title: 'Using Polymorphism',
              code: `public class PolymorphismDemo {
    public static void main(String[] args) {
        // Array of Shape references pointing to different objects
        Shape[] shapes = {
            new Circle("Red", 5.0),
            new Rectangle("Blue", 4.0, 6.0),
            new Triangle("Green", 3.0, 8.0),
            new Circle("Yellow", 3.0)
        };
        
        // Polymorphic behavior - same method call, different implementations
        System.out.println("Calculating areas of different shapes:");
        for (Shape shape : shapes) {
            shape.displayColor();
            System.out.println("Area: " + String.format("%.2f", shape.calculateArea()));
            System.out.println("Shape type: " + shape.getClass().getSimpleName());
            System.out.println("---");
        }
        
        // Method to demonstrate polymorphism
        printShapeInfo(new Circle("Purple", 4.0));
        printShapeInfo(new Rectangle("Orange", 5.0, 3.0));
    }
    
    // This method accepts any Shape object (polymorphism)
    public static void printShapeInfo(Shape shape) {
        System.out.println("Processing shape:");
        shape.displayColor();
        System.out.println("Area: " + String.format("%.2f", shape.calculateArea()));
    }
}`,
              explanation: 'The same method calls work on different shape objects, with each object executing its own version of the method.',
              output: `Calculating areas of different shapes:
Color: Red
Area: 78.54
Shape type: Circle
---
Color: Blue
Area: 24.00
Shape type: Rectangle
---
Color: Green
Area: 12.00
Shape type: Triangle
---
Color: Yellow
Area: 28.27
Shape type: Circle
---
Processing shape:
Color: Purple
Area: 50.27
Processing shape:
Color: Orange
Area: 15.00`
            }
          ],
          keyPoints: [
            'Same interface, different implementations',
            'Use abstract classes/interfaces for common structure',
            'Runtime method resolution based on actual object type',
            'Enables flexible and extensible code design'
          ]
        },
        {
          id: 'abstraction',
          title: 'Abstraction',
          content: `**Abstraction** hides complex implementation details and shows only the essential features of an object. It focuses on what an object does rather than how it does it.

**Implementation Methods:**
- **Abstract Classes**: Classes that cannot be instantiated
- **Interfaces**: Contracts that define what methods a class must implement

**Benefits:**
- Simplifies complex systems
- Reduces code duplication
- Provides clear contracts between components`,
          codeExamples: [
            {
              title: 'Abstract Class Example',
              code: `// Abstract class
abstract class Vehicle {
    protected String brand;
    protected String model;
    protected int year;
    
    public Vehicle(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    // Abstract methods - must be implemented by subclasses
    public abstract void startEngine();
    public abstract void stopEngine();
    public abstract double calculateFuelEfficiency();
    
    // Concrete method - shared by all vehicles
    public void displayBasicInfo() {
        System.out.println(year + " " + brand + " " + model);
    }
    
    // Concrete method with common logic
    public void performMaintenance() {
        System.out.println("Performing basic maintenance on " + brand + " " + model);
    }
}

// Concrete implementations
class Car extends Vehicle {
    private double engineSize;
    
    public Car(String brand, String model, int year, double engineSize) {
        super(brand, model, year);
        this.engineSize = engineSize;
    }
    
    @Override
    public void startEngine() {
        System.out.println("Car engine started with key ignition");
    }
    
    @Override
    public void stopEngine() {
        System.out.println("Car engine stopped");
    }
    
    @Override
    public double calculateFuelEfficiency() {
        // Simple calculation based on engine size
        return 25.0 - (engineSize * 2);
    }
}

class Motorcycle extends Vehicle {
    private boolean hasElectricStart;
    
    public Motorcycle(String brand, String model, int year, boolean hasElectricStart) {
        super(brand, model, year);
        this.hasElectricStart = hasElectricStart;
    }
    
    @Override
    public void startEngine() {
        if (hasElectricStart) {
            System.out.println("Motorcycle started with electric starter");
        } else {
            System.out.println("Motorcycle started with kick starter");
        }
    }
    
    @Override
    public void stopEngine() {
        System.out.println("Motorcycle engine stopped");
    }
    
    @Override
    public double calculateFuelEfficiency() {
        return hasElectricStart ? 45.0 : 50.0;
    }
}`,
              explanation: 'The Vehicle abstract class defines common structure while leaving specific implementations to subclasses.'
            },
            {
              title: 'Interface Example',
              code: `// Interface defining contract
interface Drawable {
    void draw();
    void resize(double factor);
    double getArea();
}

interface Colorable {
    void setColor(String color);
    String getColor();
}

// Class implementing multiple interfaces
class Square implements Drawable, Colorable {
    private double side;
    private String color;
    
    public Square(double side, String color) {
        this.side = side;
        this.color = color;
    }
    
    // Implementing Drawable interface
    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " square with side " + side);
    }
    
    @Override
    public void resize(double factor) {
        side *= factor;
        System.out.println("Square resized. New side: " + side);
    }
    
    @Override
    public double getArea() {
        return side * side;
    }
    
    // Implementing Colorable interface
    @Override
    public void setColor(String color) {
        this.color = color;
        System.out.println("Square color changed to " + color);
    }
    
    @Override
    public String getColor() {
        return color;
    }
}`,
              explanation: 'Interfaces define contracts that classes must follow, enabling multiple inheritance of behavior.'
            },
            {
              title: 'Using Abstraction',
              code: `public class AbstractionDemo {
    public static void main(String[] args) {
        // Cannot instantiate abstract class
        // Vehicle vehicle = new Vehicle(); // Compilation error
        
        // Create concrete objects
        Vehicle car = new Car("Toyota", "Camry", 2023, 2.5);
        Vehicle motorcycle = new Motorcycle("Honda", "CBR", 2023, true);
        
        // Use abstraction - same interface, different implementations
        Vehicle[] vehicles = {car, motorcycle};
        
        for (Vehicle vehicle : vehicles) {
            vehicle.displayBasicInfo();
            vehicle.startEngine();
            System.out.println("Fuel efficiency: " + vehicle.calculateFuelEfficiency() + " mpg");
            vehicle.performMaintenance();
            vehicle.stopEngine();
            System.out.println("---");
        }
        
        // Interface usage
        Square square = new Square(5.0, "Red");
        processDrawable(square);
        processColorable(square);
    }
    
    // Methods accepting interface types (abstraction)
    public static void processDrawable(Drawable drawable) {
        drawable.draw();
        System.out.println("Area: " + drawable.getArea());
        drawable.resize(1.5);
    }
    
    public static void processColorable(Colorable colorable) {
        System.out.println("Current color: " + colorable.getColor());
        colorable.setColor("Blue");
    }
}`,
              explanation: 'This demonstrates how abstraction allows us to work with objects through their abstract interfaces.',
              output: `2023 Toyota Camry
Car engine started with key ignition
Fuel efficiency: 20.0 mpg
Performing basic maintenance on Toyota Camry
Car engine stopped
---
2023 Honda CBR
Motorcycle started with electric starter
Fuel efficiency: 45.0 mpg
Performing basic maintenance on Honda CBR
Motorcycle engine stopped
---
Drawing a Red square with side 5.0
Area: 25.0
Square resized. New side: 7.5
Current color: Red
Square color changed to Blue`
            }
          ],
          keyPoints: [
            'Abstract classes cannot be instantiated directly',
            'Interfaces define contracts for implementing classes',
            'Focus on "what" rather than "how"',
            'Enables flexible and maintainable code architecture'
          ]
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Exception Handling',
      description: 'Learn to handle errors gracefully with try-catch blocks',
      difficulty: 'Intermediate',
      estimatedTime: '30 minutes',
      objectives: [
        'Understand different types of exceptions',
        'Master try-catch-finally blocks',
        'Learn to create custom exceptions',
        'Apply best practices for error handling'
      ],
      sections: [
        {
          id: 'intro',
          title: 'Introduction to Exceptions',
          content: `**Exceptions** are events that occur during program execution that disrupt the normal flow of instructions. Java provides a robust exception handling mechanism to deal with runtime errors gracefully.

**Why Exception Handling?**
- **Program Stability**: Prevents crashes from unexpected errors
- **User Experience**: Provides meaningful error messages
- **Debugging**: Helps identify and fix problems
- **Resource Management**: Ensures proper cleanup of resources

**Types of Exceptions:**
- **Checked Exceptions**: Must be handled at compile time
- **Unchecked Exceptions**: Runtime exceptions that can be avoided
- **Errors**: Serious problems that applications shouldn't handle`,
          keyPoints: [
            'Exceptions disrupt normal program flow',
            'Java has built-in exception handling mechanisms',
            'Three types: Checked, Unchecked, and Errors',
            'Proper handling improves program reliability'
          ]
        }
      ]
    },
    '3': {
      id: '3',
      title: 'Collections Framework',
      description: 'Explore ArrayList, HashMap, and other data structures',
      difficulty: 'Advanced',
      estimatedTime: '60 minutes',
      objectives: [
        'Master ArrayList and LinkedList',
        'Understand HashMap and TreeMap',
        'Learn Set implementations',
        'Apply collections in real scenarios'
      ],
      sections: [
        {
          id: 'intro',
          title: 'Introduction to Collections',
          content: `The **Java Collections Framework** provides a set of interfaces and classes to store and manipulate groups of objects. It's one of the most important parts of Java programming.

**Key Benefits:**
- **Standardized APIs**: Consistent way to work with data structures
- **Performance**: Optimized implementations for different use cases
- **Flexibility**: Choose the right collection for your needs
- **Interoperability**: Collections work well together

**Main Interfaces:**
- **List**: Ordered collection (ArrayList, LinkedList)
- **Set**: No duplicate elements (HashSet, TreeSet)
- **Map**: Key-value pairs (HashMap, TreeMap)
- **Queue**: FIFO operations (LinkedList, PriorityQueue)`,
          keyPoints: [
            'Collections store and manipulate groups of objects',
            'Framework provides standardized interfaces',
            'Different implementations for different needs',
            'Essential for efficient Java programming'
          ]
        }
      ]
    }
  };

  const lesson = lessons[topicId];
  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Found</h2>
          <p className="text-gray-600 mb-6">The requested lesson could not be found.</p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentSectionData = lesson.sections[currentSection];
  const progress = ((currentSection + 1) / lesson.sections.length) * 100;

  const markSectionComplete = () => {
    setCompletedSections(prev => new Set([...prev, currentSection]));
    if (currentSection === lesson.sections.length - 1) {
      onComplete(topicId);
    }
  };

  const nextSection = () => {
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
        <p className="text-gray-600 mb-4">{lesson.description}</p>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {lesson.estimatedTime}
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            {lesson.sections.length} sections
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Section Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
            <h3 className="font-semibold text-gray-800 mb-4">Sections</h3>
            <div className="space-y-2">
              {lesson.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentSection === index
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {completedSections.has(index) && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Learning Objectives */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                Objectives
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{currentSectionData.title}</h2>
              <div className="text-sm text-gray-500">
                Section {currentSection + 1} of {lesson.sections.length}
              </div>
            </div>

            {/* Content */}
            <div className="prose max-w-none mb-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentSectionData.content}
              </div>
            </div>

            {/* Key Points */}
            {currentSectionData.keyPoints && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Key Points
                </h3>
                <ul className="space-y-2">
                  {currentSectionData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-blue-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Code Examples */}
            {currentSectionData.codeExamples && (
              <div className="space-y-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-500" />
                  Code Examples
                </h3>
                {currentSectionData.codeExamples.map((example, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-medium text-gray-800">{example.title}</h4>
                    </div>
                    <div className="bg-gray-900 p-4">
                      <pre className="text-gray-100 text-sm overflow-x-auto">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    <div className="p-4 bg-gray-50">
                      <p className="text-gray-700 text-sm mb-3">{example.explanation}</p>
                      {example.output && (
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                            <PlayCircle className="w-4 h-4 text-green-500" />
                            Output:
                          </h5>
                          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                            {example.output}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <button
                onClick={prevSection}
                disabled={currentSection === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-3">
                {!completedSections.has(currentSection) && (
                  <button
                    onClick={markSectionComplete}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Complete
                  </button>
                )}

                {currentSection < lesson.sections.length - 1 ? (
                  <button
                    onClick={nextSection}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => onComplete(topicId)}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    Complete Lesson
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
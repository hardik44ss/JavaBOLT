import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb,
  BookOpen,
  Code,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
  type?: 'suggestion' | 'explanation' | 'encouragement';
}

const Mentor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Java mentor. I\'m here to help you learn Java programming step by step. What would you like to explore today?',
      sender: 'mentor',
      timestamp: new Date(),
      type: 'encouragement'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    { text: 'Explain Object-Oriented Programming', type: 'explanation' },
    { text: 'Show me array examples', type: 'code' },
    { text: 'What are Java collections?', type: 'explanation' },
    { text: 'Help with debugging my code', type: 'help' },
    { text: 'Best practices for Java coding', type: 'suggestion' }
  ];

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const mentorResponse = generateMentorResponse(content);
      setMessages(prev => [...prev, mentorResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMentorResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    
    let response = '';
    let type: 'suggestion' | 'explanation' | 'encouragement' = 'explanation';

    if (lowerInput.includes('object') || lowerInput.includes('oop')) {
      response = `Great question about Object-Oriented Programming! 🎯

OOP in Java has four main principles:

**1. Encapsulation** - Bundling data and methods together in classes
**2. Inheritance** - Creating new classes based on existing ones
**3. Polymorphism** - Objects taking multiple forms
**4. Abstraction** - Hiding complex implementation details

Would you like me to show you a practical example of any of these concepts?`;
      type = 'explanation';
    } else if (lowerInput.includes('array')) {
      response = `Arrays are fundamental in Java! Here's a quick example:

\`\`\`java
// Declaring and initializing an array
int[] numbers = {1, 2, 3, 4, 5};

// Or declare first, then initialize
String[] names = new String[3];
names[0] = "Alice";
names[1] = "Bob";
names[2] = "Charlie";

// Accessing elements
System.out.println(numbers[0]); // Output: 1
\`\`\`

Arrays are zero-indexed and have a fixed size. Need help with array operations like sorting or searching?`;
      type = 'explanation';
    } else if (lowerInput.includes('collection')) {
      response = `Java Collections are powerful! 💪

Here are the most commonly used ones:

**ArrayList** - Dynamic arrays that can grow
**HashMap** - Key-value pairs for fast lookups
**HashSet** - Unique elements only
**LinkedList** - Efficient insertion/deletion

Example:
\`\`\`java
ArrayList<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
list.add("JavaScript");
\`\`\`

Which collection would you like to explore in detail?`;
      type = 'explanation';
    } else if (lowerInput.includes('debug') || lowerInput.includes('error')) {
      response = `Debugging can be tricky, but I'm here to help! 🔍

Common debugging strategies:
1. **Read the error message carefully** - It often tells you exactly what's wrong
2. **Use println statements** - Add System.out.println() to trace your code
3. **Check your logic** - Walk through your code step by step
4. **Look for typos** - Missing semicolons, wrong variable names

Share your code or error message, and I'll help you fix it!`;
      type = 'suggestion';
    } else if (lowerInput.includes('best practice')) {
      response = `Excellent question about best practices! 🌟

Here are key Java coding standards:

**Naming Conventions:**
- Classes: PascalCase (e.g., \`StudentRecord\`)
- Methods/Variables: camelCase (e.g., \`calculateGrade\`)
- Constants: UPPER_SNAKE_CASE (e.g., \`MAX_SIZE\`)

**Code Structure:**
- Keep methods short and focused
- Use meaningful variable names
- Add comments for complex logic
- Handle exceptions properly

**Performance:**
- Use StringBuilder for string concatenation
- Choose appropriate data structures
- Avoid unnecessary object creation

Want me to elaborate on any of these?`;
      type = 'suggestion';
    } else {
      response = `I understand you're asking about "${userInput}". Let me help you with that! 

Java is a rich language with many concepts. Could you be more specific about what you'd like to learn? For example:
- A specific concept (like loops, methods, classes)
- A coding problem you're facing
- A feature you want to understand better

I'm here to make Java learning as clear and enjoyable as possible! 😊`;
      type = 'encouragement';
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: 'mentor',
      timestamp: new Date(),
      type
    };
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'explanation': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'encouragement': return <Sparkles className="w-4 h-4 text-purple-500" />;
      default: return <Bot className="w-4 h-4 text-orange-500" />;
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen max-h-[calc(100vh-6rem)] flex flex-col">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Java AI Mentor</h1>
              <p className="text-gray-600">Your personal Java programming assistant</p>
            </div>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-600 mb-3">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickSuggestion(suggestion.text)}
                className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-full border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
              >
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'mentor' && (
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  {getMessageIcon(message.type)}
                </div>
              )}
              
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {message.content.startsWith('```java') ? (
                    <pre className="bg-gray-900 text-green-200 rounded-lg p-3 text-sm overflow-x-auto">
                      {message.content.replace(/```java|```/g, '')}
                    </pre>
                  ) : (
                    message.content
                  )}
                </div>
                <div className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              placeholder="Ask me anything about Java programming..."
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
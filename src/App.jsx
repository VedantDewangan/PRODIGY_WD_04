import { useState, useEffect, useRef } from 'react';
import './App.css';

const commands = {
  help: "Available commands: help, about-me, skills, projects, contact",
  "about-me": `I am Vedant Dewangan, currently pursuing a B.Tech in Information Technology at the National Institute of Technology Raipur. I am in my fifth semester and have maintained a CPI of 8.25/10. I completed my 12th and 10th grades from Kendriya Vidyalaya Durg, scoring 92.8% and 88.6%, respectively. During my school years, I was a national player in handball. In my free time, I enjoy video editing and listening to music.`,
  skills: `- HTML\n- CSS\n- Tailwind CSS\n- JavaScript\n- Git\n- GitHub\n- React\n- Chakra UI\n- Material UI\n- Node.js\n- Express.js\n- MongoDB\n- MySQL\n- Next.js\n- WebSocket\n- Firebase Authentication`,
  "currently-learning": `- Next.js`,
  "future-plans": `I plan to learn WebRTC, Amazon Web Services, and advanced Data Structures and Algorithms.`,
  projects: `1. E-commerce Website: Developed a comprehensive e-commerce platform featuring user authentication and a secure payment gateway.\n2. Social Media Website: Built a social media platform to enable users to connect and share content.\n3. Chat Website: Created a chat application using Next.js, providing real-time communication features.`,
  contact: `Email: vedantdewangan75@gmail.com\nLinkedIn: https://www.linkedin.com/in/vedant-dewangan-844a1825b/`,
};

function App() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalContentRef = useRef(null);

  useEffect(() => {
    const welcomeMessage = "Welcome to Vedant Dewangan's Portfolio! Type 'help' to see available commands.";
    typeMessage(welcomeMessage);
  }, []);

  useEffect(() => {
    terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
  }, [history, isTyping]);

  const handleCommand = (command) => {
    const response = commands[command] || 'Command not found';
    setHistory((prev) => [...prev, { command, response: '' }]);
    typeMessage(response);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleCommand(input);
      setInput('');
    }
  };

  const typeMessage = (message) => {
    setIsTyping(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      setTyping(message.slice(0, i + 1));
      i++;
      if (i >= message.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        setHistory((prev) => prev.map((entry, index) => 
          index === prev.length - 1 ? { ...entry, response: message } : entry
        ));
        setTyping('');
      }
    }, 50);
  };

  return (
    <div className="desktop">
      <div className="terminal">
        <div className="terminal-header">
          <div className="buttons">
            <span className="close"></span>
            <span className="minimize"></span>
            <span className="maximize"></span>
          </div>
          <div className="title">vedant@portfolio: ~</div>
        </div>
        <div className="terminal-body">
          <div className="terminal-content" ref={terminalContentRef}>
            {history.map((entry, index) => (
              <div key={index}>
                <div className="command">vedant@portfolio:~$ {entry.command}</div>
                <div className="response">{entry.response}</div>
              </div>
            ))}
            {isTyping && <div className="typing">{typing}</div>}
          </div>
          <div className="terminal-input">
            <span className="prompt">vedant@portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              disabled={isTyping}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// src/components/TerminalDisplay.jsx

import React from 'react';
import { FaCircle } from 'react-icons/fa'; // Importa un icono para los botones de ventana

const TerminalDisplay = () => {
  return (
    <div className="terminal-display">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <FaCircle className="terminal-button close" />
          <FaCircle className="terminal-button minimize" />
          <FaCircle className="terminal-button maximize" />
        </div>
        <span className="terminal-title">camilo@portfolio:~</span>
      </div>
      <div className="terminal-body">
        <pre>
          <span className="terminal-line">root@camilo-portfolio:~# ls -la</span>
          <span className="terminal-line">drwxr-xr-x 4 camilo camilo 4096 Jun 28 2025 .</span>
          <span className="terminal-line">drwxr-xr-x 3 camilo camilo 4096 Jun 28 2025 ..</span>
          <span className="terminal-line">drwxr-xr-x 2 camilo camilo 4096 Jun 28 2025 backend/</span>
          <span className="terminal-line">drwxr-xr-x 2 camilo camilo 4096 Jun 28 2025 frontend/</span>
          <span className="terminal-line">drwxr-xr-x 2 camilo camilo 4096 Jun 28 2025 tools/</span>
          <span className="terminal-line">root@camilo-portfolio:~# git status</span>
          <span className="terminal-line">On branch main</span>
          <span className="terminal-line">Your branch is up to date with 'origin/main'.</span>
          <span className="terminal-line"></span>
          <span className="terminal-line">nothing to commit, working tree clean</span>
          <span className="terminal-line">root@camilo-portfolio:~# _<span className="terminal-cursor-blink">█</span></span> {/* Cursor parpadeante */}
        </pre>
      </div>
    </div>
  );
};

export default TerminalDisplay;
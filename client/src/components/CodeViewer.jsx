import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

export const CodeViewer = ({ code = {} }) => {
  const languages = [
    { key: 'javascript', label: 'JavaScript' },
    { key: 'python', label: 'Python' },
    { key: 'cpp', label: 'C++' },
    { key: 'java', label: 'Java' },
  ];

  const availableLanguages = languages.filter((lang) => !!code[lang.key]);
  const [activeLang, setActiveLang] = useState(
    availableLanguages.length > 0 ? availableLanguages[0].key : 'javascript'
  );
  const [copied, setCopied] = useState(false);

  const activeCode = code[activeLang] || '// No code implementation available';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-viewer">
      <div className="code-header">
        <div className="code-tabs">
          {availableLanguages.map((lang) => (
            <button
              key={lang.key}
              className={`code-tab ${activeLang === lang.key ? 'active' : ''}`}
              onClick={() => setActiveLang(lang.key)}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <button className="copy-btn" onClick={handleCopy}>
          {copied ? <FaCheck style={{ color: '#46d369' }} /> : <FaCopy />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      <pre className="code-content">
        <code>{activeCode}</code>
      </pre>
    </div>
  );
};

export default CodeViewer;

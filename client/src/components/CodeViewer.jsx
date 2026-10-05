import React, { useState, useEffect } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import 'highlight.js/styles/atom-one-dark.css';

// Register specific languages for smaller bundle size
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('java', java);

export const CodeViewer = ({ code = {} }) => {
  const languages = [
    { key: 'javascript', label: 'JavaScript', hljsLang: 'javascript' },
    { key: 'python', label: 'Python', hljsLang: 'python' },
    { key: 'cpp', label: 'C++', hljsLang: 'cpp' },
    { key: 'java', label: 'Java', hljsLang: 'java' },
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

  const getHighlightedCode = () => {
    try {
      const currentLang = languages.find((l) => l.key === activeLang);
      if (currentLang) {
        return hljs.highlight(activeCode, { language: currentLang.hljsLang }).value;
      }
      return hljs.highlightAuto(activeCode).value;
    } catch {
      return activeCode;
    }
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
        <code
          dangerouslySetInnerHTML={{ __html: getHighlightedCode() }}
        />
      </pre>
    </div>
  );
};

export default CodeViewer;

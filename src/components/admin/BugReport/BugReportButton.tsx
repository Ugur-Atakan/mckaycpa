import React from 'react';
import { Bug } from 'lucide-react';

export function BugReportButton() {
  const handleBugReport = () => {
    const date = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Get browser information
    const browserInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
    };

    const subject = encodeURIComponent(`McKay Panel Bug Report [${date}]`);
    const body = encodeURIComponent(`
Bug Report Details:

Date and Time: ${date}

System Information:
- Browser: ${browserInfo.userAgent}
- Platform: ${browserInfo.platform}
- Language: ${browserInfo.language}
- Screen Resolution: ${browserInfo.screenResolution}
- Window Size: ${browserInfo.windowSize}

Please describe the bug:
[Please provide a detailed description of the issue you encountered]

Steps to reproduce:
1. 
2. 
3. 

Expected behavior:
[What did you expect to happen?]

Actual behavior:
[What actually happened?]

Additional notes:
[Any other relevant information]
    `);

    window.location.href = `mailto:cto@mckaycpa.com?subject=${subject}&body=${body}`;
  };

  return (
    <button
      onClick={handleBugReport}
      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#002F49] 
                 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <Bug className="w-5 h-5" />
      Report a Bug
    </button>
  );
}
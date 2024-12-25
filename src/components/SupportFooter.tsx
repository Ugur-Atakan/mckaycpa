import React from 'react';
import { HelpCircle } from 'lucide-react';

interface SupportFooterProps {
  pageName: string;
}

export function SupportFooter({ pageName }: SupportFooterProps) {
  const handleSupportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Support Request: Delaware Franchise Tax Report Form');
    const body = encodeURIComponent(`Hello,\n\nI need assistance with the ${pageName} page of the Delaware Franchise Tax Report Form.\n\n[Please describe your problem here]`);
    window.location.href = `mailto:team@mckaycpa.com?cc=cto@mckaycpa.com&subject=${subject}&body=${body}`;
  };

  return (
    <div className="mt-8 text-center">
      <a
        href="#"
        onClick={handleSupportClick}
        className="inline-flex items-center gap-2 text-[#002F49] hover:text-[#003a5d] transition-colors"
      >
        <HelpCircle className="w-5 h-5" />
        <span>Do you have a question about this page? Please click here for support.</span>
      </a>
    </div>
  );
}
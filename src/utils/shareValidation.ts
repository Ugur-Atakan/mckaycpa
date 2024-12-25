import { Shares } from '../types/shares';

export function validateShares(shares: Shares): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Convert string values to numbers for comparison
  const authorizedCommon = parseInt(shares.authorizedCommon) || 0;
  const authorizedPreferred = parseInt(shares.authorizedPreferred) || 0;
  const issuedCommon = parseInt(shares.issuedCommon) || 0;
  const issuedPreferred = parseInt(shares.issuedPreferred) || 0;

  // Validate common shares
  if (issuedCommon > authorizedCommon) {
    errors.push('Issued common shares cannot exceed authorized common shares');
  }

  // Validate preferred shares
  if (issuedPreferred > authorizedPreferred) {
    errors.push('Issued preferred shares cannot exceed authorized preferred shares');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormLayout } from './FormLayout';
import { SinglePageClientForm } from './SinglePageClientForm';
import { verifyToken } from '../services/verificationService';
import { AlertTriangle } from 'lucide-react';

export function ClientVerification() {
  const { formId, token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  console.log('formId:', formId);
  console.log('token:', token);
  useEffect(() => {
    const validateToken = async () => {
      if (!formId || !token) {
        setError('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        const valid = await verifyToken(formId, token);
        if (!valid) {
          setError('This verification link is invalid or has expired');
        } else {
          setIsValid(true);
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('Error validating verification link');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [formId, token]);

  if (loading) {
    return (
      <FormLayout>
        <div className="flex items-center justify-center p-8">
          <div className="text-gray-600">Verifying link...</div>
        </div>
      </FormLayout>
    );
  }

  if (error || !isValid) {
    return (
      <FormLayout>
        <div className="text-center space-y-6 p-8">
          <div className="flex justify-center">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#002F49] mb-2">Verification Error</h2>
            <p className="text-gray-600">{error || 'Invalid verification link'}</p>
          </div>
        </div>
      </FormLayout>
    );
  }

  return (
    <FormLayout>
      {formId && token && <SinglePageClientForm formId={formId} token={token} />}
    </FormLayout>
  );
}
import  { useState } from 'react';
import { FormLayout } from './FormLayout';
import { WelcomeStep } from './WelcomeStep';
import { CompanyNameStep } from './CompanyNameStep';
import { SharesStep } from './SharesStep';
import { TotalAssetsStep } from './TotalAssetsStep';
import { AddressStep } from './AddressStep';
import { OfficersStep } from './OfficersStep/OfficersStep';
import { DirectorsStep } from './DirectorsStep/DirectorsStep';
import { SubmitterStep } from './SubmitterStep/SubmitterStep';
import { ThanksStep } from './ThanksStep';
import { submitForm } from '../services/formService';

export function FormFlow() {
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [shares, setShares] = useState({
    authorizedCommon: '',
    authorizedPreferred: '',
    issuedCommon: '',
    issuedPreferred: ''
  });
  const [totalAssets, setTotalAssets] = useState({
    value: '',
    preference: 'provide'
  });
  const [address, setAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [officers, setOfficers] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [submitter, setSubmitter] = useState('');

  const handleSubmit = async () => {
    const formData = {
      companyName,
      shares,
      totalAssets,
      address,
      officers,
      directors,
      submitter
    };

    try {
      await submitForm(formData);
      setStep(step + 1);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const nextStep = () => setStep(step + 1);

  return (
    <FormLayout companyName={step > 1 ? companyName : undefined}>
      {step === 0 && <WelcomeStep onNext={nextStep} />}
      {step === 1 && (
        <CompanyNameStep
          companyName={companyName}
          setCompanyName={setCompanyName}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <SharesStep
          shares={shares}
          setShares={setShares}
          onNext={nextStep}
        />
      )}
      {step === 3 && (
        <TotalAssetsStep
          totalAssets={totalAssets}
          setTotalAssets={setTotalAssets}
          onNext={nextStep}
        />
      )}
      {step === 4 && (
        <AddressStep
          address={address}
          setAddress={setAddress}
          onNext={nextStep}
        />
      )}
      {step === 5 && (
        <OfficersStep
          officers={officers}
          setOfficers={setOfficers}
          onNext={nextStep}
        />
      )}
      {step === 6 && (
        <DirectorsStep
          directors={directors}
          setDirectors={setDirectors}
          onNext={nextStep}
        />
      )}
      {step === 7 && (
        <SubmitterStep
          officers={officers}
          directors={directors}
          submitter={submitter}
          setSubmitter={setSubmitter}
          onSubmit={handleSubmit}
        />
      )}
      {step === 8 && <ThanksStep />}
    </FormLayout>
  );
}
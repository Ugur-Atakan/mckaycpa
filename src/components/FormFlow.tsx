import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { WelcomeStep } from "./WelcomeStep";
import { CompanyNameStep } from "./CompanyNameStep";
import { SharesStep } from "./SharesStep";
import { TotalAssetsStep } from "./TotalAssetsStep";
import { AddressStep } from "./AddressStep";
import { OfficersStep } from "./OfficersStep/OfficersStep";
import { DirectorsStep } from "./DirectorsStep/DirectorsStep";
import { SubmitterStep } from "./SubmitterStep";
import { ThanksStep } from "./ThanksStep";
import { submitForm } from "../services/formService";
import ReviewStep from "./ReviewStep";

export function FormFlow() {
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [shares, setShares] = useState({
    authorizedCommon: "",
    authorizedPreferred: "",
    issuedCommon: "",
    issuedPreferred: "",
  });
  const [totalAssets, setTotalAssets] = useState({
    value: "",
    preference: "provide",
  });
  const [address, setAddress] = useState({
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [officers, setOfficers] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [submitter, setSubmitter] = useState("");

  let formData = {
    companyName,
    shares,
    totalAssets,
    address,
    officers,
    directors,
    submitter,
  };

  const handleSubmit = async () => {
    formData = {
      companyName,
      shares,
      totalAssets,
      address,
      officers,
      directors,
      submitter,
    };

    console.log("Submitting form:", formData);
    try {
      await submitForm(formData);
      setStep(step + 1);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
          onPrev={prevStep}
        />
      )}
      {step === 3 && (
        <TotalAssetsStep
          totalAssets={totalAssets}
          setTotalAssets={setTotalAssets}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
      {step === 4 && (
        <AddressStep
          address={address}
          setAddress={setAddress}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
      {step === 5 && (
        <OfficersStep
          officers={officers}
          setOfficers={setOfficers}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
      {step === 6 && (
        <DirectorsStep
          directors={directors}
          setDirectors={setDirectors}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
      {step === 7 && (
        <SubmitterStep
          officers={officers}
          directors={directors}
          submitter={submitter}
          onPrev={prevStep}
          onNext={nextStep}
          setSubmitter={setSubmitter}
          onSubmit={handleSubmit}
        />
      )}
      {
      step === 8 && (
        <ReviewStep
          formData={formData}
          onPrev={prevStep}
          onSubmit={handleSubmit}
        />
      )}
      {step === 9 && <ThanksStep />}
    </FormLayout>
  );
}

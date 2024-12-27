import React from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import { SupportFooter } from "./SupportFooter";

interface DataProps {
    companyName: string;
    shares: {
      authorizedCommon: string;
      authorizedPreferred: string;
      issuedCommon: string;
      issuedPreferred: string;
    };
    totalAssets: {
      value: string;
      preference: string;
    };
    address: {
      street1: string;
      street2: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    officers: {
      name: string;
      title: string;
      address: {
        street1: string;
        street2: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
    }[];
    directors: {
      name: string;
      address: {
        street1: string;
        street2: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
    }[];
    submitter: string;
}

interface ReviewProps {
  formData: DataProps;
  submitter: string;
  setSubmitter: (submitter: string) => void;
  onSubmit: () => void;
  onPrev: () => void;
}

const ReviewStep = ({ onSubmit, onPrev,formData }: ReviewProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  console.log(formData);
  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="text-[#002F49] font-medium flex items-center gap-2"
        >
          <ArrowRight className="transform rotate-180 w-5 h-5" />
          Back
        </button>
        <div className="text-gray-500 text-sm">Step 8 of 8</div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#002F49]">
        Review and Submit
        </h2>
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-[#002F49]">Company Details</h1>

        {/* Company Name */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Company Name</h2>
          <p className="text-gray-600">{formData.companyName}</p>
        </div>

        {/* Shares */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Shares</h2>
          <ul className="text-gray-600 space-y-1">
            <li>Authorized Common: {formData.shares.authorizedCommon}</li>
            <li>Authorized Preferred: {formData.shares.authorizedPreferred}</li>
            <li>Issued Common: {formData.shares.issuedCommon}</li>
            <li>Issued Preferred: {formData.shares.issuedPreferred}</li>
          </ul>
        </div>

        {/* Total Assets */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Total Assets</h2>
          <p className="text-gray-600">
            Value: {formData.totalAssets.value} ({formData.totalAssets.preference})
          </p>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Address</h2>
          <p className="text-gray-600">
            {formData.address.street1}, {formData.address.street2}, {formData.address.city}, {formData.address.state}, {formData.address.zipCode}, {formData.address.country}
          </p>
        </div>

        {/* Officers */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Officers</h2>
          {formData.officers.map((officer, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm space-y-2">
              <p className="text-gray-800 font-medium">Name: {officer.name}</p>
              <p className="text-gray-800">Title: {officer.title}</p>
              <p className="text-gray-600">
                Address: {officer.address.street1}, {officer.address.street2}, {officer.address.city}, {officer.address.state}, {officer.address.zipCode}, {officer.address.country}
              </p>
            </div>
          ))}
        </div>

        {/* Directors */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Directors</h2>
          {formData.directors.map((director, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm space-y-2">
              <p className="text-gray-800 font-medium">Name: {director.name}</p>
              <p className="text-gray-600">
                Address: {director.address.street1}, {director.address.street2}, {director.address.city}, {director.address.state}, {director.address.zipCode}, {director.address.country}
              </p>
            </div>
          ))}
        </div>

        {/* Submitter */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Submitter</h2>
          <p className="text-gray-600">{formData.submitter}</p>
        </div>
      </div>
    </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-[#002F49] text-white px-8 py-4 rounded-full font-semibold 
                       flex items-center justify-center gap-2 hover:bg-[#003a5d] transition-colors
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Submit Form
          <Send className="w-5 h-5" />
        </button>
      </div>

      <SupportFooter pageName="Submitter Information" />
    </motion.form>
  );
};
export default ReviewStep;

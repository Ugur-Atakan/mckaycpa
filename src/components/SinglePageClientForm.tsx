import { useState, useEffect } from "react";
import { FormLayout } from "./FormLayout";
import {
  updateFormData,
  getFormById,
  updateVerificationStatus,
} from "../services/formService";
import {
  AlertTriangle,
  Building2,
  Coins,
  MapPin,

  User,
} from "lucide-react";
import { EditableField } from "./EditableField";
import { OfficersEdit } from "./admin/FormEdit/OfficersEdit";
import { DirectorsEdit } from "./admin/FormEdit/DirectorsEdit";
import { useNavigate } from "react-router-dom";

interface SinglePageClientFormProps {
  formId: string;
  token: string;
}

export function SinglePageClientForm({
  formId,
  token,
}: SinglePageClientFormProps) {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitter, setSubmitter] = useState("");
  const [verified, setVerified] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const navigation = useNavigate();

  const formatCurrency = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    // Format as currency
    if (numbers) {
      const amount = parseInt(numbers);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }
    return '';
  };

  const handleSubmit = async () => {
    try {
      await handleUpdate();
      await updateVerificationStatus(formId, formData);
      navigation("/thanks");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const success = await updateFormData(formData.id!, formData);
      if (success) {
        setFormData(formData);
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Error updating field:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchFormData = async () => {
      try {
        const data = await getFormById(formId);
        if (!data) {
          if (isMounted) setError("Form not found");
          return;
        }
        if (isMounted) {
          console.log("Fetched form data:", data); // Debug log
          setFormData(data);
          if (data.verification?.status === "verified") {
            setVerified(true);
          }
        }
      } catch (err) {
        if (isMounted) setError("Error loading form data");
        console.error("Error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFormData();

    return () => {
      isMounted = false;
    };
  }, [formId]);

  const handleFieldUpdate = async (
    section: string,
    field: string,
    value: any
  ) => {
    setUpdateError(null);
    try {
      let updatedData;
      if (field) {
        updatedData = {
          ...formData,
          [section]: {
            ...formData[section],
            [field]: value,
          },
        };
      } else {
        updatedData = {
          ...formData,
          [section]: value,
        };
      }

      const success = await updateFormData(formId, updatedData);
      if (success) {
        setFormData(updatedData);
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Error updating field:", err);
      setUpdateError("Failed to update field. Please try again.");
      setTimeout(() => setUpdateError(null), 3000);
    }
  };

  // ... [Previous loading, error, and verified states remain the same]

  if (!formData) {
    return (
      <FormLayout>
        <div className="p-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div className="ml-3">
                <p className="text-sm text-red-700">No form data available</p>
              </div>
            </div>
          </div>
        </div>
      </FormLayout>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {updateError && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {updateError}
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-[#002F49]">
          Review and Verify Information
        </h2>
        <p className="text-gray-600">
          Please review the following information carefully. You can edit any
          field if needed.
        </p>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3 text-[#002F49] mb-4">
          <Building2 className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Corporation Information</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Corporation Name</p>
          <EditableField
            value={formData.companyName}
            onSave={(value) => handleFieldUpdate("companyName", "", value)}
            label="Corporation Name"
          />
        </div>
      </div>

      {/* Share Structure */}
      {formData.shares && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 text-[#002F49] mb-4">
            <Coins className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Share Structure</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Authorized Shares</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Common Shares</p>
                  <EditableField
                    value={formData.shares.authorizedCommon}
                    onSave={(value) =>
                      handleFieldUpdate("shares", "authorizedCommon", value)
                    }
                    label="Authorized Common Shares"
                    type="number"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Preferred Shares</p>
                  <EditableField
                    value={formData.shares.authorizedPreferred}
                    onSave={(value) =>
                      handleFieldUpdate("shares", "authorizedPreferred", value)
                    }
                    label="Authorized Preferred Shares"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Issued Shares</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Common Shares</p>
                  <EditableField
                    value={formData.shares.issuedCommon}
                    onSave={(value) =>
                      handleFieldUpdate("shares", "issuedCommon", value)
                    }
                    label="Issued Common Shares"
                    type="number"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Preferred Shares</p>
                  <EditableField
                    value={formData.shares.issuedPreferred}
                    onSave={(value) =>
                      handleFieldUpdate("shares", "issuedPreferred", value)
                    }
                    label="Issued Preferred Shares"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Total Assets */}
      {formData.totalAssets && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 text-[#002F49] mb-4">
            <Coins className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Total Assets</h3>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Assets Value</p>
            <EditableField
              value={formatCurrency(formData.totalAssets.preference)}
              onSave={(value) =>
                handleFieldUpdate("totalAssets", "value", value)
              }
              label="Total Assets Value"
              type="currency"
            />
          </div>
        </div>
      )}

      {/* Address */}
      {formData.address && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 text-[#002F49] mb-4">
            <MapPin className="w-5 h-5" />
            <h3 className="text-lg font-semibold">
              Principal Place of Business
            </h3>
          </div>
          <div className="space-y-4">
            {Object.entries(formData.address).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-gray-500 mb-1">
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                </p>
                <EditableField
                  value={value as string}
                  onSave={(newValue) =>
                    handleFieldUpdate("address", key, newValue)
                  }
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Officers */}
      {formData.officers && formData.officers.length > 0 && (
        <OfficersEdit
          officers={formData.officers}
          setOfficers={(updatedOfficers) =>
            setFormData({ ...formData, officers: updatedOfficers })
          }
        />
      )}

      {/* Directors */}
      {formData.directors && formData.directors.length > 0 && (
          <DirectorsEdit
            directors={formData.directors}
            setDirectors={(updatedDirectors) =>
              setFormData({ ...formData, directors: updatedDirectors })
            }
          />
      )}

      {/* Verification */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 text-[#002F49] mb-4">
          <User className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Verification</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Submitter
            </label>
            <select
              value={submitter}
              onChange={(e) => setSubmitter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
              required
            >
              <option value="">Select a person</option>
              {formData.officers?.map((officer: any, index: number) => (
                <option key={`officer-${index}`} value={officer.name}>
                  {officer.name} (Officer - {officer.title})
                </option>
              ))}
              {formData.directors?.map((director: any, index: number) => (
                <option key={`director-${index}`} value={director.name}>
                  {director.name} (Director)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!submitter}
            className="w-full bg-[#002F49] text-white px-8 py-4 rounded-full font-semibold 
                     hover:bg-[#003a5d] transition-colors shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify Information
          </button>
        </div>
      </div>
    </div>
  );
}

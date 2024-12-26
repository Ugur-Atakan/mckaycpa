import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AdminLayout } from "./Layout";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { SharesEdit } from "./FormEdit/SharesEdit";
import { CompanyEdit } from "./FormEdit/CompanyEdit";
import { TotalAssetsEdit } from "./FormEdit/TotalAssetsEdit";
import { AddressEdit } from "./FormEdit/AddressEdit";
import { OfficersEdit } from "./FormEdit/OfficersEdit";
import { SubmitterEdit } from "./FormEdit/SubmitterEdit";
import { GenerateVerificationButton } from "./GenerateVerificationButton";
import {
  Clock,
  CheckCircle,
  Trash2,
  Building2,
  Coins,
  MapPin,
  User,
} from "lucide-react";
import { getStatusLabel, getStatusStyles } from "../../utils/formatters";
import { DirectorsEdit } from "./FormEdit/DirectorsEdit";
import { ensureArray } from "../../utils/common";
import { updateFormData } from "../../services/formService";

export function FormDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {
    let formData;
    const fetchForm = async () => {
      if (!id) {
        setError("No form ID provided");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "forms", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
      
          formData={ id: docSnap.id, ...docSnap.data()}
          //@ts-ignore
          const officers= ensureArray(formData.officers);
          //@ts-ignore
          const directors= ensureArray(formData.directors);
          formData={...formData,officers,directors}
          console.log('Formatlanmış form data:',formData)
          setForm(formData);
        } else {
          setError("Form not found");
        }
      } catch (error) {
        setError("Error loading form");
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, "forms", id));
      navigate("/admin/forms");
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const handleStatusChange = async () => {
    if (!id || !form) return;
    const newStatus = form.status === "pending" ? "completed" : "pending";
    try {
      await updateDoc(doc(db, "forms", id), {
        status: newStatus,
        lastModified: new Date().toISOString(),
      });
      setForm((prevForm: any) => ({
        ...prevForm,
        status: newStatus,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAvaitingClient = async () => {
    if (!id || !form) return;
    const newStatus = "awaiting_client";
    try {
      await updateDoc(doc(db, "forms", id), {
        status: newStatus,
        lastModified: new Date().toISOString(),
      });
      setForm((prevForm: any) => ({
        ...prevForm,
        status: newStatus,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  const handleUpdate = async () => {
      try {
        const success = await updateFormData(id!, form);
        if (success) {
          setForm(form);
        } else {
          throw new Error('Update failed');
        }
      } catch (err) {
        console.error('Error updating field:', err);
      }
    };


  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-gray-600">Loading form details...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !form) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">
                  {error || "Form not found"}
                </p>
                <button
                  onClick={() => navigate("/admin/forms")}
                  className="mt-3 text-sm font-medium text-red-700 hover:text-red-600"
                >
                  Return to Forms List
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-[#002F49]">
              {form.companyName}
            </h1>
            <p className="text-gray-600 mt-1">
              Submitted on {new Date(form.submittedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <GenerateVerificationButton
              formId={id!}
              setFormStatus={handleAvaitingClient}
            />
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                       bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete Form
            </button>
            <button
              onClick={handleStatusChange}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                ${getStatusStyles(form.status)}`}
            >
              {form.status === "pending" ? (
                <Clock className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              {getStatusLabel(form.status)}
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Company Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-3 text-[#002F49]">
              <Building2 className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Corporation Information</h2>
            </div>
            <CompanyEdit
              formId={form.id}
              companyName={form.companyName}
              onUpdate={(value) => setForm({ ...form, companyName: value })}
            />
          </div>

          {/* Share Structure */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-3 text-[#002F49]">
              <Coins className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Share Structure</h2>
            </div>
            <SharesEdit
              formId={form.id}
              shares={form.shares}
              onUpdate={(field, value) =>
                setForm({
                  ...form,
                  shares: { ...form.shares, [field]: value },
                })
              }
            />
          </div>

          {/* Total Assets */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-3 text-[#002F49]">
              <Coins className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Total Assets</h2>
            </div>
            <TotalAssetsEdit
              formId={form.id}
              totalAssets={form.totalAssets}
              onUpdate={(field, value) =>
                setForm({
                  ...form,
                  totalAssets: { ...form.totalAssets, [field]: value },
                })
              }
            />
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-3 text-[#002F49]">
              <MapPin className="w-5 h-5" />
              <h2 className="text-lg font-semibold">
                Principal Place of Business
              </h2>
            </div>
            <AddressEdit
              formId={form.id}
              address={form.address}
              onUpdate={(field, value) =>
                setForm({
                  ...form,
                  address: { ...form.address, [field]: value },
                })
              }
            />
          </div>

          {/* Officers */}
          <div className="bg-white rounded-xl shadow-sm">
            <OfficersEdit
              officers={form.officers}
              setOfficers={(updatedOfficers) => setForm({ ...form, officers: updatedOfficers })}
              handleSubmit={handleUpdate}
            
            />
          </div>
          {/* Directors */}
          <div className="bg-white rounded-xl shadow-sm">
            <DirectorsEdit
                      directors={form.directors}
                      setDirectors={(updatedDirectors) => setForm({ ...form, directors: updatedDirectors })}
                      handleSubmit={handleUpdate}
                      />
          </div>

          {/* Submitter */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-3 text-[#002F49]">
              <User className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Submitter Information</h2>
            </div>
            <SubmitterEdit
              formId={form.id}
              submitter={form.submitter}
              onUpdate={(value) => setForm({ ...form, submitter: value })}
            />
          </div>
        </div>

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          companyName={form.companyName}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      </div>
    </AdminLayout>
  );
}

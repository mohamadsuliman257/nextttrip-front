import { useState } from "react";
import AdminModal from "../../../../components/AdminModal";
import { useDestinations } from "../hooks/useDestinations";
import DestinationForm from "../components/DestinationForm";
import type { Destination } from "../types/destination.type";
import DestinationTable from "../components/DestinationTable";

export default function DestinationsPage() {
  const { destinations, isLoading, deleteDestination, isDeleting } = useDestinations();
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setIsFormVisible(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الوجهة السياحية؟")) {
      deleteDestination(id);
    }
  };

  const handleFormClose = () => {
    setEditingDestination(null);
    setIsFormVisible(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-700">إدارة الوجهات السياحية</h1>
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-secondary-600/70 text-white mx-2 px-4 py-2 rounded-lg hover:bg-primary-400 transition-all"
        >
          إضافة مكان جديد
        </button>
      </div>

      <AdminModal
        isOpen={isFormVisible}
        onClose={handleFormClose}
        title={editingDestination ? "تعديل المكان" : "إضافة مكان جديد"}
        maxWidthClassName="max-w-3xl"
      >
        <DestinationForm
          onSubmit={() => {
            handleFormClose();
          }}
          defaultValues={editingDestination ? {
            ...editingDestination,
            images: undefined,
            existing_images: editingDestination.images || [],
            opening_hours: editingDestination.opening_hours?.join(', ') || undefined,
          } : undefined}
          isSubmitting={false}
        />
      </AdminModal>
      <DestinationTable 
        destinations={destinations} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
        isDeleting={isDeleting} 
      />
    </div>
  );
}

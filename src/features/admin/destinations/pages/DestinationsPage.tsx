import { useState } from "react";
import AdminModal from "../../../../components/AdminModal";
import { useDestinations } from "../hooks/useDestinations";
import DestinationForm from "../components/DestinationForm";
import type { Destination } from "../types/destination.type";
import DestinationTable from "../components/DestinationTable";

const openingHoursToDisplay = (value: Destination["opening_hours"]): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value.map((h) => (typeof h === "string" ? h : JSON.stringify(h))).join(", ");
  }
  return Object.values(value)
    .map((h) => (typeof h === "string" ? h : JSON.stringify(h)))
    .join(", ");
};

const toArray = (value: string | string[] | undefined): string[] | undefined => {
  if (value === undefined || value === null || value === "") return undefined;
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      /* ignore */
    }
  }
  return undefined;
};

export default function DestinationsPage() {
  const { destinations, isLoading, deleteDestination, isDeleting, createDestination, updateDestination, isCreating, isUpdating } = useDestinations();
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

  const handleFormSubmit = (data: any) => {
    if (editingDestination) {
      updateDestination({ id: editingDestination.id, data });
    } else {
      createDestination(data);
    }
    handleFormClose();
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
        <h1 className="text-2xl font-bold text-primary-700">إدارة الأماكن (الوجهات السياحية)</h1>
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
          onSubmit={handleFormSubmit}
          defaultValues={editingDestination ? {
            ...editingDestination,
            images: undefined,
            existing_images: editingDestination.images || [],
            interests: editingDestination.interests?.map((i: any) => (typeof i === 'number' ? i : i.id)) || [],
            best_seasons: toArray(editingDestination.best_seasons) || [],
            recommended_times: toArray(editingDestination.recommended_times) || [],
            opening_hours: openingHoursToDisplay(editingDestination.opening_hours),
          } : undefined}
          isSubmitting={isCreating || isUpdating}
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

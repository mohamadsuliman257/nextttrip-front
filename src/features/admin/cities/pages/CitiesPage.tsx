import { useState } from "react";
import AdminModal from "../../../../components/AdminModal";
import { useCities } from "../hooks/useCities";
import CityTable from "../components/CityTable";
import CityForm from "../components/CityForm";
import type { City, CityFormData } from "../types/city.type";

export default function CitiesPage() {
  const {
    cities,
    isLoading,
    createCity,
    updateCity,
    deleteCity,
    isCreating,
    isUpdating,
    isDeleting,
  } = useCities();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  const handleFormSubmit = (data: CityFormData) => {
    if (editingCity) {
      updateCity({ id: editingCity.id, data });
    } else {
      createCity(data);
    }
    setIsFormOpen(false);
    setEditingCity(null);
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المدينة؟")) {
      deleteCity(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCity(null);
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-700">إدارة المدن</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-secondary-600/70 text-white mx-2 px-4 py-2 rounded-lg hover:bg-primary-400 transition-all"
        >
          إضافة مدينة جديدة
        </button>
      </div>

      <CityTable
        cities={cities}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />

      <AdminModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingCity ? "تعديل المدينة" : "إضافة مدينة جديدة"}
      >
        <CityForm
          onSubmit={handleFormSubmit}
          defaultValues={editingCity ? { name: editingCity.name, description: editingCity.description, image_url: editingCity.image_url } : undefined}
          isSubmitting={isCreating || isUpdating}
        />
      </AdminModal>
    </div>
  );
}

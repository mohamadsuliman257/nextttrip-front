type Props = {
  label: string;
  name: string;
  register: any;
  errors: any;
  type?: string;
  children?: React.ReactNode; // للـ select
};

export default function FormField({ label, name, register, errors, type = "text", children }: Props) {
  return (
    <div>
      <label className="text-secondary-800 font-medium">{label}</label>

      {children ? (
        <select className="w-full border rounded-lg px-3 py-1 md:py-2" {...register(name)}>
          {children}
        </select>
      ) : type === "textarea" ? (
        <textarea className="w-full border rounded-lg px-3 py-1 md:py-2" {...register(name)} />
      ) : (
        <input type={type} className="w-full border rounded-lg px-3 py-1 md:py-2" {...register(name)} />
      )}

      {errors[name] && <p className="text-red-500">{errors[name]?.message}</p>}
    </div>
  );
}

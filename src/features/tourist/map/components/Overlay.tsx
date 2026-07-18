interface OverlayProps {
  text: string;
}

// مكون لعرض رسالة التحميل أو الخطأ
export function Overlay({ text }: OverlayProps) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-white/75 font-medium text-slate-600">
      {text}
    </div>
  );
}

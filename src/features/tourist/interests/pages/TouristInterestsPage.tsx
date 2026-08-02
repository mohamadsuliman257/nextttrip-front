import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTouristInterests } from "../hooks/useTouristInterests";

export default function TouristInterestsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { interests, savedInterests, isLoading, saveInterests, isSaving } = useTouristInterests();

  const from = (location.state as { from?: string } | null)?.from;

  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (savedInterests.length > 0) {
      const initial: Record<number, boolean> = {};
      savedInterests.forEach((id) => {
        initial[id] = true;
      });
      setAnswers((prev) => ({ ...initial, ...prev }));
    }
  }, [savedInterests]);

  const selectedIds = useMemo(
    () => Object.entries(answers).filter(([, yes]) => yes).map(([id]) => Number(id)),
    [answers]
  );

  const toggleAnswer = (interestId: number) => {
    setAnswers((prev) => ({ ...prev, [interestId]: prev[interestId] !== true }));
  };

  const handleSubmit = () => {
    setTouched(true);
    if (selectedIds.length === 0) return;
    saveInterests(selectedIds, {
      onSuccess: () => {
        navigate(from || "/tourist", { replace: true });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-24">
        <div className="text-gray-500">جاري التحميل...</div>
      </div>
    );
  }

  const noAnswerSelected = touched && selectedIds.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-center text-2xl font-bold text-primary-500">حدد اهتماماتك</h1>
        <p className="mb-8 text-center text-gray-600">
          أجب بنعم أو لا عن كل سؤال لنساعدك في تخطيط رحلاتك حسب اهتماماتك
        </p>

        <div className="space-y-4">
          {interests.map((interest) => {
            const isYes = answers[interest.id] === true;
            return (
              <div
                key={interest.id}
                className={`rounded-xl border bg-white p-5 shadow-sm transition ${
                  isYes ? "border-primary-500 ring-2 ring-primary-100" : "border-gray-200"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="flex-1 text-lg font-medium text-gray-800">{interest.question}</p>
                  <span className="flex items-center gap-3">
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        isYes ? "text-primary-600" : "text-gray-400"
                      }`}
                    >
                      {isYes ? "نعم" : "لا"}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isYes}
                      aria-label={interest.question}
                      onClick={() => toggleAnswer(interest.id)}
                      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
                        isYes ? "bg-primary-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                          isYes ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {noAnswerSelected && (
          <p className="mt-6 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
            يجب اختيار إجابة "نعم" واحدة على الأقل
          </p>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(from || "/tourist", { replace: true })}
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "جاري الحفظ..." : "حفظ اهتماماتي"}
          </button>
        </div>
      </div>
    </div>
  );
}

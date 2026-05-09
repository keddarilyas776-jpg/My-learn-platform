import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

// بيانات تجريبية للعرض فقط (سيتم ربطها بـ Supabase لاحقاً)
const mockQuestions: Question[] = [
  {
    question: "ما هي لغة البرمجة المستخدمة في بناء واجهات هذه المنصة؟",
    options: ["Python", "React & TypeScript", "C++", "Java"],
    correctAnswer: 1
  },
  {
    question: "ما هو الهدف من نظام الشهادات في TaalimiLearn؟",
    options: ["إضاعة الوقت", "توثيق مهارات الطالب", "للزينة فقط", "لا يوجد هدف"],
    correctAnswer: 1
  }
];

export default function QuizComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    setCurrentStep((prev) => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (currentStep >= mockQuestions.length) {
    return (
      <div className="bg-emerald-50 p-8 rounded-3xl text-center border-2 border-emerald-100 animate-in fade-in zoom-in duration-500">
        <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
          <CheckCircle2 className="text-white" size={32} />
        </div>
        <h3 className="text-xl font-black text-emerald-900 mb-2">أحسنت! لقد أكملت الاختبار</h3>
        <p className="text-sm text-emerald-700 mb-6">أنت الآن مؤهل للحصول على شهادة إتمام الدورة</p>
        <button className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg">تحميل الشهادة</button>
      </div>
    );
  }

  const q = mockQuestions[currentStep];

  return (
    <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm" dir="rtl">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="text-blue-500" size={20} />
        <span className="text-xs font-bold text-neutral-400">سؤال {currentStep + 1} من {mockQuestions.length}</span>
      </div>
      
      <h3 className="text-lg font-black text-neutral-800 mb-6 leading-tight">{q.question}</h3>
      
      <div className="space-y-3">
        {q.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full p-4 rounded-2xl text-right text-sm font-bold transition-all border-2 flex justify-between items-center
              ${selectedOption === index 
                ? (index === q.correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-red-500 bg-red-50 text-red-700')
                : (isAnswered && index === q.correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-neutral-50 bg-neutral-50 text-neutral-600')
              }`}
          >
            {option}
            {isAnswered && index === q.correctAnswer && <CheckCircle2 size={18} />}
            {isAnswered && selectedOption === index && index !== q.correctAnswer && <XCircle size={18} />}
          </button>
        ))}
      </div>

      {isAnswered && (
        <button 
          onClick={nextQuestion}
          className="w-full mt-6 bg-neutral-900 text-white py-4 rounded-2xl font-bold text-xs animate-in slide-in-from-bottom-2"
        >
          السؤال التالي
        </button>
      )}
    </div>
  );
}

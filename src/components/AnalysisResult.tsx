import React from 'react';
import type { SkincareRoutine, RoutineStep } from '@/types';

interface AnalysisResultProps {
  /**
   * The full skincare analysis and recommendation returned from the AI.
   */
  result: SkincareRoutine;
}

/**
 * A reusable card component used to display simple pieces of information such
 * as the detected skin type or a list of concerns. Styling is consistent
 * across cards and pulls from the custom Tailwind palette defined in
 * `tailwind.config.js`.
 */
const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-slate-800/50 rounded-xl p-6">
    <h3 className="text-sm font-semibold text-primary-500 uppercase tracking-wider">
      {title}
    </h3>
    <div className="mt-2 text-neutral-200">{children}</div>
  </div>
);

/**
 * A step component that displays the order, name of the step, suggested
 * product type and the reasoning. The coloured index pill uses the
 * brand palette for better visibility against the dark card backgrounds.
 */
const RoutineStepCard: React.FC<{ step: RoutineStep; index: number }> = ({
  step,
  index,
}) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary-600 text-white font-bold text-sm">
      {index + 1}
    </div>
    <h4 className="font-bold text-white">
      {step.step}:{' '}
      <span className="font-medium text-neutral-300">{step.productType}</span>
    </h4>
    <p className="mt-1 text-sm text-neutral-400">{step.reason}</p>
  </div>
);

/**
 * Renders the result of a skin analysis using a card-based layout. It
 * separates the AM and PM routines into columns and uses the custom
 * palette for headings, icons and highlights. A disclaimer box at the
 * bottom reminds users that these are AI-generated suggestions.
 */
export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-24 animate-fade-in">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Kết quả Phân tích &amp; Gợi ý cho bạn
        </h2>

        {/* Basic info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard title="Loại Da Của Bạn">
            <p className="text-xl font-semibold">{result.skinType}</p>
          </InfoCard>
          <InfoCard title="Các Vấn Đề Cần Chú Ý">
            {result.concerns.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {result.concerns.map((concern, index) => (
                  <li key={index}>{concern}</li>
                ))}
              </ul>
            ) : (
              <p>Không phát hiện vấn đề đáng kể.</p>
            )}
          </InfoCard>
        </div>

        {/* AM and PM routines side-by-side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Buổi Sáng (AM)
            </h3>
            <div className="space-y-6 border-l-2 border-primary-800/50 ml-3">
              {result.amRoutine.map((step, index) => (
                <RoutineStepCard key={`am-${index}`} step={step} index={index} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 text-darkmode-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              Buổi Tối (PM)
            </h3>
            <div className="space-y-6 border-l-2 border-darkmode-600/50 ml-3">
              {result.pmRoutine.map((step, index) => (
                <RoutineStepCard key={`pm-${index}`} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer box */}
        <div className="mt-10 bg-primary-900/40 border border-primary-700 text-primary-300 px-4 py-3 rounded-lg text-sm">
          <p className="font-bold">Lưu ý quan trọng:</p>
          <p>{result.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};
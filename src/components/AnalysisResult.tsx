import React from 'react';
import type { SkincareRoutine, RoutineStep } from '@/types';

interface AnalysisResultProps {
  result: SkincareRoutine;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const renderRoutine = (routine: RoutineStep[], title: string) => (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-primary-200">{title}</h3>
      <div className="grid gap-4">
        {routine.map((step, index) => (
          <div key={index} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-lg mb-1">{step.step}</div>
                <div className="text-gray-60 mb-2">
                  <span className="font-medium text-gray-700">Sản phẩm:</span> {step.productType}
                </div>
                <div className="text-gray-60">
                  <span className="font-medium text-gray-700">Lý do:</span> {step.reason}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Kết quả phân tích da</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Loại da</h3>
            <p className="text-2xl font-bold text-blue-600">{result.skinType}</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Vấn đề da</h3>
            <p className="text-lg font-medium text-purple-600">{result.concerns.join(', ')}</p>
          </div>
        </div>
      </div>

      {renderRoutine(result.amRoutine, "Chế độ buổi sáng")}
      {renderRoutine(result.pmRoutine, "Chế độ buổi tối")}

      <div className="mt-10 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-yellow-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.34-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
            <p className="text-yellow-70">{result.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { getTranslationDictionary } from '../../data/translations';
import { Language } from '../../types';

interface Props {
  language: Language;
}

export const DisclaimerBanner: React.FC<Props> = ({ language }) => {
  const t = getTranslationDictionary(language);

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 py-2.5 px-4 text-xs md:text-sm font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>{t.disclaimer_banner}</span>
      </div>
    </div>
  );
};

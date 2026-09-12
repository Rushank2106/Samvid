import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
}

export const CaptchaWidget: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const generateChallenge = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setIsVerified(false);
    setErrorMsg('');
    onVerify(false);
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const handleVerify = () => {
    if (parseInt(userAnswer.trim(), 10) === num1 + num2) {
      setIsVerified(true);
      setErrorMsg('');
      onVerify(true);
    } else {
      setIsVerified(false);
      setErrorMsg('Incorrect answer. Please try again.');
      onVerify(false);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-jan-600" />
          <span>Bot & Security Verification</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">CAPTCHA Security Layer</span>
      </div>

      {isVerified ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-3 flex items-center gap-2 text-xs font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Security check passed. You can proceed with eligibility submission.</span>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-600">Solve:</span>
            <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded border border-slate-200 tracking-wider">
              {num1} + {num2} = ?
            </span>
            <button
              type="button"
              onClick={generateChallenge}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
              title="Refresh security challenge"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder="Enter answer"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-jan-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleVerify}
              className="bg-jan-600 hover:bg-jan-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0 shadow-sm"
            >
              Verify
            </button>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

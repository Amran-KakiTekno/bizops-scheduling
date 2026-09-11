import React, { useEffect } from 'react';
import { Settings, Sun, Moon, CheckCircle2, X } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, theme, setTheme, language, setLanguage, t }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-slate-900 dark:text-slate-100 animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 id="settings-title" className="font-bold text-base sm:text-lg">
                {t('settingsTitle')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('settingsSub')}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label={t('close')}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Appearance / Theme */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('themeLabel')}
            </label>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {theme === 'light' ? t('themeLight') : t('themeDark')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Light Mode Card */}
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                theme === 'light'
                  ? 'bg-cyan-50/60 border-cyan-500 ring-2 ring-cyan-500/20 text-cyan-950 dark:text-cyan-100'
                  : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                {theme === 'light' && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t('themeLight')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('themeLightDesc')}</p>
              </div>
            </button>

            {/* Dark Mode Card */}
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-cyan-950/20 border-cyan-500 ring-2 ring-cyan-500/20 text-white'
                  : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-300 flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                {theme === 'dark' && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t('themeDark')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('themeDarkDesc')}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Language Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('languageLabel')}
            </label>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {language === 'en' ? 'English (EN)' : 'Bahasa Melayu (MS)'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* English Card */}
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                language === 'en'
                  ? 'bg-cyan-50/60 dark:bg-cyan-950/20 border-cyan-500 ring-2 ring-cyan-500/20 text-slate-900 dark:text-white'
                  : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                  EN
                </div>
                {language === 'en' && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t('langEn')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('langEnDesc')}</p>
              </div>
            </button>

            {/* Bahasa Melayu Card */}
            <button
              type="button"
              onClick={() => setLanguage('ms')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                language === 'ms'
                  ? 'bg-cyan-50/60 dark:bg-cyan-950/20 border-cyan-500 ring-2 ring-cyan-500/20 text-slate-900 dark:text-white'
                  : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                  BM
                </div>
                {language === 'ms' && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t('langMs')}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('langMsDesc')}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 font-medium text-xs shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}

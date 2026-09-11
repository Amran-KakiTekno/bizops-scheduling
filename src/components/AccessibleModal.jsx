import React, { useEffect, useRef } from 'react';

/**
 * AccessibleModal
 * Reusable accessible modal dialog container.
 * - Handles keyboard Escape key dismissal
 * - Handles backdrop click closing
 * - Locks body scroll when open and restores upon unmount
 * - Provides WAI-ARIA modal attributes (role="dialog", aria-modal="true", aria-labelledby / aria-label)
 */
export default function AccessibleModal({
  isOpen = true,
  onClose,
  titleId,
  ariaLabel,
  maxWidth = 'max-w-2xl',
  className = '',
  contentClassName = '',
  children
}) {
  const dialogRef = useRef(null);

  // Scroll lock: lock document.body scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Keyboard Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.stopPropagation();
        if (onClose) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus trap / initial focus on open
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Backdrop click dismissal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150 ${className}`}
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-label={!titleId ? ariaLabel : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-900 border border-slate-800 rounded-2xl w-full ${maxWidth} shadow-2xl overflow-hidden flex flex-col max-h-[90vh] outline-none animate-in zoom-in-95 duration-150 ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

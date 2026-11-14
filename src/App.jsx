import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOAST_TYPES = new Set(['default', 'info', 'success', 'warning', 'error']);
const TOAST_THEMES = new Set(['light', 'dark', 'colored']);
const TOAST_POSITIONS = new Set([
  'top-right', 'top-center', 'top-left',
  'bottom-right', 'bottom-center', 'bottom-left',
]);

function normalizeType(type) {
  const value = String(type || 'default').toLowerCase();
  return TOAST_TYPES.has(value) ? value : 'default';
}

function normalizeDuration(time, autoClose) {
  if (autoClose === false) return false;
  const value = Number(time);
  return Number.isFinite(value) && value >= 0 ? value : 5000;
}

function normalizeToastOptions(options = {}) {
  const type = normalizeType(options.type);
  const themeValue = String(options.theme || 'light').toLowerCase();
  const positionValue = String(options.position || 'top-right').toLowerCase();
  const duration = normalizeDuration(options.time, options.autoclose);
  const progressbar = options.progressbar !== false;
  const icon = options.icon;
  const color = options.progressbarcolor;

  return {
    type,
    toastOptions: {
      autoClose: duration,
      hideProgressBar: !progressbar,
      theme: TOAST_THEMES.has(themeValue) ? themeValue : 'light',
      position: TOAST_POSITIONS.has(positionValue) ? positionValue : 'top-right',
      ...(icon !== undefined && icon !== null && icon !== ''
        ? { icon: () => <span aria-hidden="true">{icon}</span> }
        : {}),
      ...(color ? { style: { '--toastify-color-progress-light': String(color) } } : {}),
    },
  };
}

export default function App() {
  useEffect(() => {
    const showtoast = (options = {}) => {
      // Also accept a string for compatibility with older callers.
      const config = typeof options === 'string' ? { message: options } : (options || {});
      const { type, toastOptions } = normalizeToastOptions(config);
      const title = config.title == null ? '' : String(config.title);
      const message = config.message == null ? '' : String(config.message);
      const content = (
        <span>
          {title && <strong style={{ display: 'block' }}>{title}</strong>}
          {message && <span>{message}</span>}
        </span>
      );

      return toast(content, {
        ...toastOptions,
        type,
        toastId: config.toastId,
      });
    };

    const showPromiseToast = (promise, messages = {}, options = {}) => {
      const { toastOptions } = normalizeToastOptions(options);
      const id = options.toastId ?? `promise-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      toast.promise(
        Promise.resolve(promise),
        {
          pending: messages.pending ?? 'Loading...',
          success: messages.success ?? 'Success!',
          error: messages.error ?? 'Error!',
        },
        { ...toastOptions, toastId: id },
      );
      return id;
    };

    const dismissToast = (id) => toast.dismiss(id);
    const dismissPromiseToast = (id) => toast.dismiss(id);

    window.showtoast = showtoast;
    window.showToast = (message, type = 'info') => showtoast({ message, type });
    window.showPromiseToast = showPromiseToast;
    window.dismissToast = dismissToast;
    window.dismissPromiseToast = dismissPromiseToast;

    return () => {
      if (window.showtoast === showtoast) delete window.showtoast;
      delete window.showToast;
      if (window.showPromiseToast === showPromiseToast) delete window.showPromiseToast;
      if (window.dismissToast === dismissToast) delete window.dismissToast;
      if (window.dismissPromiseToast === dismissPromiseToast) delete window.dismissPromiseToast;
    };
  }, []);

  return (
    <main className="app-shell" aria-label="Demo empat tombol notifikasi">
      <iframe
        className="legacy-page"
        src="/legacy/index.html"
        title="Demo empat tombol notifikasi"
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="light"
        closeOnClick
        pauseOnHover
      />
    </main>
  );
}

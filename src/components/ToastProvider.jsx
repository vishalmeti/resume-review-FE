import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const ToastContext = createContext({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

let idCounter = 0

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const add = useCallback((message, opts = {}) => {
    const id = ++idCounter
    const toast = { id, message, type: opts.type || 'info', duration: opts.duration ?? 3000 }
    setToasts((list) => [...list, toast])
    if (toast.duration > 0) {
      setTimeout(() => remove(id), toast.duration)
    }
  }, [])
  const remove = useCallback((id) => setToasts(list => list.filter(t => t.id !== id)), [])

  const value = useMemo(() => ({ toast: add }), [add])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed z-50 right-3 bottom-3 space-y-2 w-[calc(100%-24px)] sm:w-auto">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`} onClick={() => remove(t.id)}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}



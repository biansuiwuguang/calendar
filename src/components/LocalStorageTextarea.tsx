import { useState, useEffect, useCallback } from 'react'

interface LocalStorageTextareaProps {
  storageKey: string
  placeholder?: string
  rows?: number
}

export default function LocalStorageTextarea({
  storageKey,
  placeholder = '',
  rows = 4,
}: LocalStorageTextareaProps) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(storageKey) ?? ''
  })

  // Re-read from localStorage whenever storageKey changes
  useEffect(() => {
    setValue(localStorage.getItem(storageKey) ?? '')
  }, [storageKey])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = e.target.value
      setValue(next)
      localStorage.setItem(storageKey, next)
    },
    [storageKey],
  )

  return (
    <div className={"border rounded p-2"}>
      <textarea
        className="w-full resize-none outline-none"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

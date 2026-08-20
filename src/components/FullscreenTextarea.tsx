import LocalStorageTextarea from './LocalStorageTextarea'

interface FullscreenTextareaProps {
  storageKey: string
  placeholder?: string
  onClose: () => void
}

export default function FullscreenTextarea({
  storageKey,
  placeholder = '',
  onClose,
}: FullscreenTextareaProps) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          退出
        </button>
      </div>
      <div className="flex-1 p-4">
        <LocalStorageTextarea
          storageKey={storageKey}
          placeholder={placeholder}
          rows={20}
        />
      </div>
    </div>
  )
}

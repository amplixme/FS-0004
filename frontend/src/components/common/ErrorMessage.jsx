import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <ExclamationTriangleIcon className="h-14 w-14 text-red-500 mb-4" />

      <p className="text-red-500 mb-6">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
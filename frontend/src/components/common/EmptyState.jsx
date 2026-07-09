import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function EmptyState({ message, actionText, actionLink }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <DocumentTextIcon className="h-14 w-14 text-gray-400 mb-4" />

      <p className="text-gray-500 mb-6">{message}</p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
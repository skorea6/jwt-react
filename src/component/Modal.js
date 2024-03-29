export const Modal = ({
  isApiLoading,
  title,
  body,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-20 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="pt-3">
          <span>{body}</span>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            disabled={isApiLoading}
            className={`px-4 py-2 ${
              isApiLoading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
            } text-white rounded`}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white/50 text-center p-6 rounded">
      <p className="text-ieee-red font-semibold mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-ieee-blue text-white rounded hover:bg-ieee-blue-75 cursor-pointer transition-colors 300ms"
        >
          Reload
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

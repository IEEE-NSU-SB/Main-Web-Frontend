type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-red-100 rounded">
      <p className="text-red-700 font-semibold mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-ieee-blue text-white rounded hover:bg-ieee-blue/80"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
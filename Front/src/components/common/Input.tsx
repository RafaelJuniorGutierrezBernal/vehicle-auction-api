
interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  required = false,
  className = ""
}: InputProps) {

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200
          ${error 
            ? 'border-red-500 focus:ring-red-300' 
            : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
          }`
        }
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default Input

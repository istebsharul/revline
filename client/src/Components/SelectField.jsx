export const SelectField = ({ label, value, onChange, options, disabled, error }) => (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <select
        className={`w-full px-4 py-2 border rounded-lg ${error ? 'border-red-500' : ''}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
  
import React from "react";

interface InputFieldProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 font-semibold">{label}</label>
			<input
				type="number"
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
			/>
		</div>
	);
};

export default InputField;

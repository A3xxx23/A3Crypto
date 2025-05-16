import Select from "react-select";

export const CalculatorCard = () => {
    return (
        <div className="border border-white/10 bg-white/5 shadow-md mx-auto max-w-4xl rounded-lg p-4 flex flex-col gap-6 transition-shadow duration-300">
            <input
                type="number"
                className="w-full p-3 bg-white/0 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 text-lg text-stone-400"
                placeholder="Enter amount"
            />

            <div className="w-full">
                <Select
                    placeholder="From currency..."
                    classNamePrefix="custom"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            borderColor: '#4B5563',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0)',
                            padding: '0.5rem',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: '#1F2937',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? '#4B5563' : '#1F2937',
                            color: state.isFocused ? '#FFFFFF' : '#D1D5DB',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#D1D5DB', 
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: '#D1D5DB',
                        }),
                    }}
                />
            </div>

            <div className="w-full">
                <Select
                    placeholder="To crypto..."
                    classNamePrefix="custom"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            borderColor: '#4B5563',
                            borderRadius: '0.5rem',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0)',
                            padding: '0.5rem',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: '#1F2937',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? '#4B5563' : '#1F2937',
                            color: state.isFocused ? '#FFFFFF' : '#D1D5DB',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#D1D5DB', 
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: '#D1D5DB',
                        }),
                    }}
                />
            </div>
        </div>
    );
};

export default CalculatorCard;



import React, { useState, useEffect } from 'react';

export const Button: React.FC<any> = ({ children, variant = 'primary', isLoading = false, className = '', ...props }) => {
  const styles: Record<string, string> = {
    primary: "bg-poker-gold text-poker-black hover:bg-yellow-500 shadow-lg active:scale-95",
    secondary: "bg-poker-greenLight text-white hover:bg-emerald-700 active:scale-95",
    outline: "border-2 border-poker-gold text-poker-gold hover:bg-poker-gold hover:text-poker-black active:scale-95",
    danger: "bg-red-600 text-white hover:bg-red-700 active:scale-95",
    dark: "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600 active:scale-95"
  };
  return (
    <button 
      className={`px-6 py-2.5 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer ${styles[variant] || styles.primary} ${className}`} 
      disabled={isLoading} 
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export const Input: React.FC<any> = ({ label, error, className = "", type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>
      <div className="relative">
        <input 
            className={`w-full bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700 focus:border-poker-gold'} rounded-lg px-4 py-3 text-base text-white outline-none placeholder-gray-500 ${className} ${isPassword ? 'pr-12' : ''}`} 
            type={inputType} 
            {...props} 
        />
        {isPassword && (
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-400 p-2">
                {showPassword ? "Hide" : "Show"}
            </button>
        )}
      </div>
    </div>
  );
};

export const EditableBlueprintField: React.FC<any> = ({ value, maxValue, onChange, isEditMode, type = "text", className = "" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(value || '');

    useEffect(() => { setLocalValue(value || ''); }, [value]);

    if (!isEditMode) return <div className={className}>{value}</div>;

    const length = localValue.length;
    const isOver = length > maxValue;
    const counterColor = isOver ? "text-red-500" : "text-emerald-400";

    return (
        <div className={`relative group transition-all rounded-lg p-1 ${isFocused ? 'z-[60]' : 'z-auto'}`}>
            <div className={`relative border-2 border-dashed transition-colors ${isFocused ? 'border-[#007bff] bg-black/40' : 'border-[#007bff]/40 hover:border-[#007bff]'}`}>
                <div className="absolute top-0 left-0 -translate-y-1/2 translate-x-2 bg-[#007bff] text-white text-[9px] px-2 py-0.5 rounded-sm font-black uppercase tracking-widest shadow-lg">EDIT</div>
                <input 
                    type="text" 
                    value={localValue} 
                    onChange={(e) => { setLocalValue(e.target.value); onChange(e.target.value); }}
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)}
                    className={`${className} bg-transparent outline-none w-full text-center px-4 py-2`}
                />
                <div className={`absolute bottom-0 right-0 translate-y-full mt-2 bg-black border border-white/10 ${counterColor} text-xs px-2 py-1 rounded font-mono font-bold`}>
                    {length} / {maxValue}
                </div>
            </div>
        </div>
    );
};

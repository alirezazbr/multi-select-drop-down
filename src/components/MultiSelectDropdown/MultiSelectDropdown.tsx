import { useState, useEffect, useRef, KeyboardEvent } from "react";

import "./MultiSelectDropdown.scss";
import type { Option } from "../../types/multi-select-dropdown";

interface MultiSelectDropdownProps {
  options: Option[];
  onAddOption: (newOption: Option) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  onAddOption,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const handleOptionClick = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const existingOption = options.find(
        (option) => option.label === searchTerm
      );
      if (!existingOption) {
        const newOption: Option = { value: searchTerm, label: searchTerm };
        onAddOption(newOption); // Call the function to add the new option
        setSelectedValues([...selectedValues, newOption.value]);
      }
      setSearchTerm("");
    }
  };

  return (
    <div className="multi-select-dropdown">
      <input
        type="text"
        className="selected-values"
        placeholder={
          selectedValues.length === 0
            ? "Select options"
            : selectedValues.join(", ")
        }
        onClick={toggleDropdown}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        value={searchTerm}
        onFocus={handleInputFocus}
        ref={inputRef}
      />
      {isOpen && (
        <div className="options" ref={optionsRef}>
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`option ${
                selectedValues.includes(option.value) ? "selected" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

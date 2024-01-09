import { useState } from "react";

import { MultiSelectDropdown } from "../../components";
import type { Option } from "../../types/multi-select-dropdown";

const Landing = () => {
  const initialOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    // ...other initial options
  ];

  const [options, setOptions] = useState<Option[]>(initialOptions);

  const handleAddOption = (newOption: Option) => {
    setOptions([...options, newOption]);
  };

  return (
    <div>
      <MultiSelectDropdown options={options} onAddOption={handleAddOption} />
    </div>
  );
};

export default Landing;

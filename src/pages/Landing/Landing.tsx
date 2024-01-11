import { useState } from "react";

import { MultiSelectDropdown } from "../../components";
import type { Option } from "../../types/multi-select-dropdown";

const Landing = () => {
  const initialOptions = [
    {
      value: "Education",
      label: "Education",
      src: "/images/Graduation Cap.svg",
    },
    { value: "Science", label: "Yeeeah, science!", src: "/images/Alembic.svg" },
    { value: "Art", label: "Art", src: "/images/Performing Arts.svg" },
    { value: "Sport", label: "Sport", src: "/images/Soccer Ball.svg" },
    { value: "Games", label: "Games", src: "/images/Video Game.svg" },
    { value: "Health", label: "Health", src: "/images/Hospital.svg" },
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

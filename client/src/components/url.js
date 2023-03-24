import { useState } from "react";
import Select from "react-select";

function AddBill() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption(value);
  };

  return (
    <div>
      <Select
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "orange", label: "Orange" },
        ]}
        value={selectedOption}
        onChange={(event) => handleSelectChange(event)}
      />
      <p>You have selected: {selectedOption ? selectedOption.label : null}</p>
    </div>
  );
}
export default AddBill;

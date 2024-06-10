import { useState } from "react";
import PropTypes from "prop-types";

function Dropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["React", "Angular", "Vue"];

  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => setIsActive(!isActive)}
      >
        {selected}
      </div>
      
      {isActive && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default Dropdown;
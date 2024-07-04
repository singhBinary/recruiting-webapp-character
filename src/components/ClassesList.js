import { useState } from "react";
import { CLASS_LIST } from "../consts.js";

export default function ClassesList(props) {
  const { isClassActive, characterId } = props;
  const [classAttributes, setClassAttributes] = useState({});

  const showClassAttributes = (className) => {
    setClassAttributes(CLASS_LIST[className]);
  };

  return (
    <div className="text-left">
      <h3>Classes:</h3>
      {Object.keys(CLASS_LIST).map((className) => (
        <div
          key={className}
          className={isClassActive(characterId, className) ? "text-orange" : ""}
          onClick={() => showClassAttributes(className)}
        >
          {className}
        </div>
      ))}
      {Object.keys(classAttributes).length > 0 && (
        <>
          <ul>
            {Object.keys(classAttributes).map((attribute) => (
              <li key={attribute}>
                {attribute}: {classAttributes[attribute]}
              </li>
            ))}
          </ul>
          <button onClick={() => setClassAttributes({})}>OK</button>
        </>
      )}
    </div>
  );
}

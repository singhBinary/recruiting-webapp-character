import { ATTRIBUTE_LIST } from "../consts.js";

import { modifier } from "../utils/helperMethods";

import PointsUpdater from "./PointsUpdater";

export default function AttributesList(props) {
  const { attributes, updateAttribute, characterId } = props;

  return (
    <div className="text-left">
      <h3>Attributes:</h3>
      {ATTRIBUTE_LIST.map((attribute) => (
        <div key={attribute}>
          {attribute}: {attributes[attribute]}{" "}
          <PointsUpdater
            updateHandler={updateAttribute}
            characterId={characterId}
            dataPoint={attribute}
          />{" "}
          - ability modifier: {modifier(attributes[attribute])}
        </div>
      ))}
    </div>
  );
}

import { SKILL_LIST } from "../consts.js";

import { modifier } from "../utils/helperMethods";

import PointsUpdater from "./PointsUpdater";

export default function SkillList(props) {
  const { skills, totalSkillPoints, characterId, updateSkill, attributes } =
    props;

  return (
    <div className="text-left">
      <h3>Skills: {totalSkillPoints}</h3>
      {SKILL_LIST.map((skill) => (
        <div key={skill.name}>
          {skill.name} - points: {skills[skill.name]}{" "}
          <PointsUpdater
            updateHandler={updateSkill}
            characterId={characterId}
            dataPoint={skill.name}
          />{" "}
          modifier ({skill.attributeModifier}):{" "}
          {modifier(attributes[skill.attributeModifier])} total:{" "}
          {modifier(attributes[skill.attributeModifier]) + skills[skill.name]}
        </div>
      ))}
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";

import { CLASS_LIST } from "./consts.js";

import "./App.css";

import AttributesList from "./components/AttributesList";
import ClassesList from "./components/ClassesList";
import SkillList from "./components/SkillList";

import { skillPoints } from "./utils/helperMethods";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const response = await axios.get(
        `https://recruiting.verylongdomaintotestwith.ca/api/singhBinary/character`
      );
      setCharacters(response.data.body.characters);
    } catch (error) {
      console.error("Error loading characters:", error);
    }
  };

  const updateAttribute = (characterId, attribute, type) => {
    const newCharacters = characters.map((character) => {
      if (character.id === characterId) {
        const newAttributes = { ...character.attributes };
        switch (type) {
          case "increase":
            const totalAttributePoints = Object.values(newAttributes).reduce(
              (acc, curr) => acc + curr,
              0
            );
            if (totalAttributePoints === 70) {
              alert(
                "You have reached the maximum attribute points of 70. Please remove some attributes first."
              );
              break;
            }
            newAttributes[attribute] += 1;
            if (attribute === "Intelligence") {
              character.totalSkillPoints = skillPoints(
                newAttributes[attribute]
              );
            }
            break;
          case "decrease":
            if (newAttributes[attribute] > 0) {
              const newAttributePoints = newAttributes[attribute] - 1;
              if (attribute === "Intelligence") {
                const newtotalSkillPoints = skillPoints(newAttributePoints);
                if (character.usedSkillPoints > newtotalSkillPoints) {
                  alert(
                    "This will make the total skill points less than the used skill points. Please remove some skills first."
                  );
                } else {
                  newAttributes[attribute] = newAttributePoints;
                  character.totalSkillPoints = newtotalSkillPoints;
                }
              } else {
                newAttributes[attribute] = newAttributePoints;
              }
            }
            break;
          default:
            break;
        }
        return { ...character, attributes: newAttributes };
      }
      return character;
    });
    setCharacters(newCharacters);
  };

  const isClassActive = (characterId, className) => {
    let isActive = true;
    const characterAttributes = characters.find(
      (character) => character.id === characterId
    ).attributes;
    Object.keys(CLASS_LIST[className]).forEach((attribute) => {
      if (characterAttributes[attribute] < CLASS_LIST[className][attribute]) {
        isActive = false;
      }
    });
    return isActive;
  };

  const updateSkill = (characterId, skillName, type) => {
    const newCharacters = characters.map((character) => {
      if (character.id === characterId) {
        const newSkills = { ...character.skills };
        switch (type) {
          case "increase":
            if (character.totalSkillPoints > character.usedSkillPoints) {
              newSkills[skillName] += 1;
              character.usedSkillPoints += 1;
            } else {
              alert("You have no more skill points to use.");
            }
            break;
          case "decrease":
            if (newSkills[skillName] > 0) {
              newSkills[skillName] -= 1;
              character.usedSkillPoints -= 1;
            }
            break;
          default:
            break;
        }
        return { ...character, skills: newSkills };
      }
      return character;
    });
    setCharacters(newCharacters);
  };

  const saveCharacters = async () => {
    try {
      const response = await axios.post(
        `https://recruiting.verylongdomaintotestwith.ca/api/singhBinary/character`,
        { characters },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.status === 200) {
        alert("Characters saved successfully");
      }
    } catch (error) {
      console.error("Error saving characters:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
        Assumptions:
        <ul className="text-left">
          <li>Attribute cannot be less than 0</li>
          <li>Total skill points cannot be less than 0</li>
        </ul>
        <button onClick={saveCharacters}>Save Characters</button>
        <br />
      </header>
      <section className="App-section">
        {characters.map((character, i) => (
          <div className="flex gap-4" key={character.id}>
            <h2>Character {i + 1}</h2>
            <AttributesList
              attributes={character.attributes}
              updateAttribute={updateAttribute}
              characterId={character.id}
            />
            <ClassesList
              isClassActive={isClassActive}
              characterId={character.id}
            />
            <SkillList
              skills={character.skills}
              totalSkillPoints={character.totalSkillPoints}
              characterId={character.id}
              updateSkill={updateSkill}
              attributes={character.attributes}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;

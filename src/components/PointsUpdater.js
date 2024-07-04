export default function PointsUpdater(props) {
  const { updateHandler, characterId, dataPoint } = props;
  return (
    <>
      <button onClick={() => updateHandler(characterId, dataPoint, "increase")}>
        +
      </button>
      <button onClick={() => updateHandler(characterId, dataPoint, "decrease")}>
        -
      </button>
    </>
  );
}

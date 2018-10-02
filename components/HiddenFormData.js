




const HiddenFormData = ({ data }) => (
  <fieldset>
    {Object.entries(data).map(([key, value]) => (
      <input
        id={key}
        key={key}
        name={key}
        type="hidden"
        value={value} />
    ))}
  </fieldset>
)

export default HiddenFormData

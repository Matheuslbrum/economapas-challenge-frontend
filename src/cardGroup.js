
function CardGroup(props) {
  const {
    selectedOptions,
    groupName,
  } = props;

  return (
    <div>
      <div>
        <h1> { groupName } </h1>
      </div>
      <ul>
        {
          selectedOptions.map((options) => {
            return(
              <li>{options.label}</li>
              )
            })
        }
      </ul>
      <button className="button" >Excluir grupo</button>
    </div>
  );
}

export default CardGroup;
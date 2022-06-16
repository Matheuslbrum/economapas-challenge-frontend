import axios from "axios";
import './cardGroup.css'

function CardGroup(props) {
  const {
    groupId,
    groupName,
    setGroups,
    groups,
    cities,
  } = props;

  const citiesFiltred = cities.replaceAll(/[[\]"//\\]/g, "")

  
  const citiesArray = citiesFiltred.split(',');

  const handleDelete = () => {
    axios.delete(`https://challengeeconomapas-backend.herokuapp.com/${groupId}`).then(() => {
      setGroups(groups.filter((value) => {
        return value.id !== groupId;
      }))
    })
    .catch (error => console.log(error));
  }

  return (
    <div className="groupcard-container">
      <div className="group-name">
        <h1> {groupName} </h1>
      </div>
      <div className="cities">
          <ul>
            {
              citiesArray.map((city, index) => {
                return(
                  <li key={city} className="citie-tag">{city}</li>
                  )
                })
              }
          </ul>
      </div>
      <div className="delete-button">
        <button className="button" onClick={handleDelete}>Excluir grupo</button>
      </div>
    </div>
  );
}

export default CardGroup;
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from "react-select";


function Dashboard() {
  const [cities, setCities] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    .then((response) => {
      setCities(response.data.map((uf) => {
        return {value: uf.nome, label: `${uf.nome} - ${uf.sigla}`,}
      }))
    });
  }, []);


  const handleCreateGroup = () => {
    console.log(selectedOptions);
  };

  return (
    <>
    <Select
      isMulti
      onChange={(e) => setSelectedOptions(e)}
      value={selectedOptions}
      options={cities}
      closeMenuOnSelect={false}
      isOptionDisabled={() => selectedOptions.length >= 5}
    />
    <input type={'text'} placeholder={'digite o nome do grupo'}/>
    <button className="button" onClick={handleCreateGroup}>
      Criar grupo de cidades
    </button>
  </>
  );
}

export default Dashboard;
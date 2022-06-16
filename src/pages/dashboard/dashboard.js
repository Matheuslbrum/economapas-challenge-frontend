import { useEffect, useState } from 'react';
import Select from "react-select";
import axios from 'axios';
import { useAuthContext } from '../../contexts/auth'
import './dashboard.css';

import CardGroup from '../../components/cardgroup/cardGroup';

function Dashboard() {
  const options = [
    {value: 'Rio Branco - AC', label: 'Rio Branco - AC'},
    {value: 'Maceió - AL', label: 'Maceió - AL'},
    {value: 'Macapá - AP', label: 'Macapá - AP'},
    {value: 'Manaus - AM', label: 'Manaus - AM'},
    {value: 'Salvador - BA', label: 'Salvador - BA'},
    {value: 'Fortaleza - CE', label: 'Fortaleza - CE'},
    {value: 'Vitória - ES', label: 'Vitória - ES'},
    {value: 'Goiânia - GO', label: 'Goiânia - GO'},
    {value: 'São Luís - MA', label: 'São Luís - MA'},
    {value: 'Cuiabá - MT', label: 'Cuiabá - MT'},
    {value: 'Campo Grande - MS', label: 'Campo Grande - MS'},
    {value: 'Belo Horizonte - MG', label: 'Belo Horizonte - MG'},
    {value: 'Belém - PA', label: 'Belém - PA'},
    {value: 'João Pessoa - PB', label: 'João Pessoa - PB'},
    {value: 'Curitiba - PR', label: 'Curitiba - PR'},
    {value: 'Recife - PE', label: 'Recife - PE'},
    {value: 'Piauí - PI', label: 'Piauí - PI'},
    {value: 'Rio de Janeiro - RJ', label: 'Rio de Janeiro - RJ'},
    {value: 'Natal - RN', label: 'Natal - RN'},
    {value: 'Porto Alegre - RS', label: 'Natal - RN'},
    {value: 'Porto Velho - RO', label: 'Porto Velho - RO'},
    {value: 'Boa Vista - RR', label: 'Boa Vista - RR'},
    {value: 'Florianópolis - SC', label: 'Florianópolis - SC'},
    {value: 'São Paulo - SP', label: 'São Paulo - SP'},
    {value: 'Aracaju - SE', label: 'Aracaju - SE'},
    {value: 'Palmas - TO', label: 'Palmas - TO'},
    {value: 'Brasília - DF', label: 'Brasília - DF'},
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputGroupName, setGroupName] = useState('');

  const [groups, setGroups] = useState([]);
  
  const { signout, currentUser } = useAuthContext();

  const handleSignout = () => {
    signout();
  };

  const handleCreateGroup = () => {
    if(!inputGroupName || !selectedOptions.length > 0 ) {
      alert("não pode ter input vazio");
      return;
    }

    axios.post("https://challengeeconomapas-backend.herokuapp.com/", {
      userId: currentUser.userId,
      cities: JSON.stringify(selectedOptions.map((option) => option.value)),
      groupName:inputGroupName,
    })
    .then((response) => {
      axios.post(`https://challengeeconomapas-backend.herokuapp.com/search`, {
        groupId: response.data.insertId,
      })
      .then((response) => {
        setGroups([
         ...groups,
         {
           id: response.data[0].id,
           name: response.data[0].name,
           cities: JSON.parse(response.data[0].cities),
         }
       ])
     }).catch((error) => {
        alert(error);
     }); 
    });
  };

  useEffect(() => {
    axios.get(`https://challengeeconomapas-backend.herokuapp.com/${currentUser.userId}`)
    .then((response) => {
      setGroups(response.data)
    }).catch((error) => {
      alert(error);
   }); 
  }, [currentUser])

  return (
    <>
      <div className='header'>
        <figure className='img-container'>
          <img src='https://cdn.pixabay.com/photo/2015/01/15/16/17/hands-600497_960_720.jpg' alt='Logo da empresa'/>
        </figure>
        <div className='header-profile'>
          <h1> Olá, {currentUser.username} </h1>
          <button onClick={handleSignout} className="button">Logout</button>
        </div>
      </div>
    <div className='dashboard-page'>
      <div className='dashboard-form'>
        <p>Crie seu grupo de cidades:</p>
        <input className='input-group-name' type={'text'} placeholder={'Digite o nome do grupo'} name='groupInput' value={inputGroupName} onChange={(e) => setGroupName(e.target.value)}/>
        <Select
          isMulti
          onChange={(e) => setSelectedOptions(e)}
          options={options}
          closeMenuOnSelect={false}
          isOptionDisabled={() => selectedOptions.length >= 5}
          className="select-groups"
        />
        <div className='container-button'>
          <button className="button" onClick={handleCreateGroup}>
            Criar grupo
          </button>
        </div>
      </div>
      <div className='cards-container'>
        {
          groups.length > 0 
          &&(
            groups.map(group => 
              <CardGroup 
                key={group.id} 
                groupId={group.id}
                groupName={group.name} 
                cities={group.cities}
                setGroups={setGroups}
                groups={groups}
                selectedOptions={selectedOptions}
              />
            )

          )
        }
      </div>
    </div>
    </>
  );
}

export default Dashboard;
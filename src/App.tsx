import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { api } from './services/api';
import './styles.css';


function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: ''

  });


  async function handleSearch (){
    //42739005/json
    if(input === ''){
      alert('Preencha algum CEP')
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch {
      alert('Ops erro ao buscar CEP');
      setInput('');
    }
  }



  return (
    <div className="container">
      <h1 className='title'>Buscador Cep</h1>
      <div className='containerInput'>
        <input 
        type="text"
        placeholder='Digite seu cep' 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch'>
          <FiSearch size={25} color= '#FFF' onClick={handleSearch}/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>CEP: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade} - {cep.uf}</span>
      </main>
      )}
    </div>
  );
}

export default App;

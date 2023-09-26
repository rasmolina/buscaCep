import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CepValidationForm() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({});
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[0-9]{5}-?[0-9]{3}$/;
    if(cep !== '' && cep.match(regex)) {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        if (response.data.erro) {
          setErro('CEP não encontrado!');
          setEndereco({});
        } else {
            setEndereco(response.data);
          setErro('');
        }
      })
      .catch((erro) => {
        setErro('Erro ao buscar o CEP!');
        setEndereco({});
      });
    }else{
      alert("Digite um cep no formato válido!");
      var cepEditText = document.getElementById("cep");
      cepEditText.value = "";
      
    }


  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Valida CEP</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cep" className="form-label">
            CEP:
          </label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="form-control"
            placeholder="Digite o CEP"
            
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      {erro && <p className="text-danger mt-3">{erro}</p>}

      {Object.keys(endereco).length > 0 && ( //Exibe o bloco de código apenas se encontrar valores
        <div className="mt-4">
          <h2>CEP Localizado!</h2>
          <p>
            <strong>CEP:</strong> {endereco.cep}
          </p>
          <p>
            <strong>Logradouro:</strong> {endereco.logradouro}
          </p>
          <p>
            <strong>Complemento:</strong> {endereco.complemento}
          </p>
          <p>
            <strong>Bairro:</strong> {endereco.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {endereco.localidade}
          </p>
          <p>
            <strong>Estado:</strong> {endereco.uf}
          </p>
        </div>
      )}
    </div>
  );
}

export default CepValidationForm;
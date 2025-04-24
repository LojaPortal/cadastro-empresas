import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [empresas, setEmpresas] = useState([]);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');

  useEffect(() => {
    fetchEmpresas();
  }, []);

  async function fetchEmpresas() {
    const { data, error } = await supabase.from('empresas').select('*');
    if (error) console.error('Erro ao buscar empresas:', error);
    else setEmpresas(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase.from('empresas').insert([{ nome, cnpj }]);
    if (error) {
      console.error('Erro ao inserir empresa:', error);
    } else {
      setNome('');
      setCnpj('');
      fetchEmpresas();
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Cadastro de Empresas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input type="text" placeholder="Nome da empresa" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Empresas Cadastradas</h2>
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id}>{empresa.nome} - {empresa.cnpj}</li>
        ))}
      </ul>
    </div>
  );
}
import React, { useState } from 'react';
import './Form.css';

const Form: React.FC = () => {
    const [formData, setFormData] = useState({
        nome_completo: '',
        data_nascimento: '',
        endereco_completo: '',
        fez_retiro: false,
        data_batismo: '',
        data_chegada: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const response = await .post('http://localhost:3000/api/pessoas', formData);
    //         alert('Dados cadastrados com sucesso! ID: ' + response.data.id);
    //         setFormData({
    //             nome_completo: '',
    //             data_nascimento: '',
    //             endereco_completo: '',
    //             fez_retiro: false,
    //             data_batismo: '',
    //             data_chegada: ''
    //         });
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             alert('Erro ao cadastrar dados: ' + error.message);
    //         } else {
    //             alert('Erro ao cadastrar dados: ' + JSON.stringify(error));
    //         }
    //     }
    // };

    return (
        <form className="form">
            <label>
                Nome Completo:
                <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} required />
            </label>
            <label>
                Data de Nascimento:
                <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} required />
            </label>
            <label>
                Endereço Completo:
                <textarea name="endereco_completo" value={formData.endereco_completo} onChange={handleChange} required />
            </label>
            <label>
                Fez Retiro Vida Vitoriosa:
                <input type="checkbox" name="fez_retiro" checked={formData.fez_retiro} onChange={handleChange} />
            </label>
            <label>
                Data de Batismo:
                <input type="date" name="data_batismo" value={formData.data_batismo} onChange={handleChange} />
            </label>
            <label>
                Data de Chegada / Decisão:
                <input type="date" name="data_chegada" value={formData.data_chegada} onChange={handleChange} />
            </label>
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default Form;

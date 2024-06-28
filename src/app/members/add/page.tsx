"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../../styles/AddMember.module.css';

interface FormData {
  name: string;
  birthDate: string;
  conversionDate: string;
  baptismDate: string;
  rvv: boolean;
}

const AddMember: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthDate: '',
    conversionDate: '',
    baptismDate: '',
    rvv: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aqui você faria a submissão dos dados para o backend
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar Novo Membro</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="birthDate" className={styles.label}>Data de Nascimento:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            className={styles.dateInput}
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="conversionDate" className={styles.label}>Data de Conversão:</label>
          <input
            type="date"
            id="conversionDate"
            name="conversionDate"
            className={styles.dateInput}
            value={formData.conversionDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="baptismDate" className={styles.label}>Data do Batismo:</label>
          <input
            type="date"
            id="baptismDate"
            name="baptismDate"
            className={styles.dateInput}
            value={formData.baptismDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rvv" className={styles.label}>Fez o RVV:</label>
          <input
            type="checkbox"
            id="rvv"
            name="rvv"
            className={styles.checkbox}
            checked={formData.rvv}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Adicionar Membro</button>
      </form>
    </div>
  );
};

export default AddMember;

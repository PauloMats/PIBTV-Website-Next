"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './AddMember.module.css';

// Definindo o esquema de validação com Zod
const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  birthDate: z.string().nonempty({ message: "Data de Nascimento é obrigatória" }),
  conversionDate: z.string().nonempty({ message: "Data de Conversão é obrigatória" }),
  baptismDate: z.string().nonempty({ message: "Data de Batismo é obrigatória" }),
  rvv: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const AddMember: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aqui será feita a submissão dos dados para o backend
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar Novo Membro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="name"
            className={styles.input}
            {...register('name')}
          />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="birthDate" className={styles.label}>Data de Nascimento:</label>
          <input
            type="date"
            id="birthDate"
            className={styles.dateInput}
            {...register('birthDate')}
          />
          {errors.birthDate && <span className={styles.error}>{errors.birthDate.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="conversionDate" className={styles.label}>Data de Conversão:</label>
          <input
            type="date"
            id="conversionDate"
            className={styles.dateInput}
            {...register('conversionDate')}
          />
          {errors.conversionDate && <span className={styles.error}>{errors.conversionDate.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="baptismDate" className={styles.label}>Data do Batismo:</label>
          <input
            type="date"
            id="baptismDate"
            className={styles.dateInput}
            {...register('baptismDate')}
          />
          {errors.baptismDate && <span className={styles.error}>{errors.baptismDate.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rvv" className={styles.label}>Fez o RVV:</label>
          <input
            type="checkbox"
            id="rvv"
            className={styles.checkbox}
            {...register('rvv')}
          />
        </div>

        <button type="submit" className={styles.submitButton}>Adicionar Membro</button>
      </form>
    </div>
  );
};

export default AddMember;

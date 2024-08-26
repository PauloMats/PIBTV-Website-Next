import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Definindo o esquema de validação com Zod
const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  birthDate: z.string().min(1, 'A data de nascimento é obrigatória'),
  conversionDate: z.string().min(1, 'A data de conversão é obrigatória'),
  baptismDate: z.string().min(1, 'A data de batismo é obrigatória'),
  rvv: z.boolean().optional(),
});

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome:</label>
        <input {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input type="date" {...register('birthDate')} />
        {errors.birthDate && <span>{errors.birthDate.message}</span>}
      </div>
      <div>
        <label>Data de Conversão:</label>
        <input type="date" {...register('conversionDate')} />
        {errors.conversionDate && <span>{errors.conversionDate.message}</span>}
      </div>
      <div>
        <label>Data de Batismo:</label>
        <input type="date" {...register('baptismDate')} />
        {errors.baptismDate && <span>{errors.baptismDate.message}</span>}
      </div>
      <div>
        <label>
          <input type="checkbox" {...register('rvv')} />
          Recebeu VVV (Verdade, Vida, Vitória)
        </label>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container } from './styles';

import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite seu nome'),
    email: Yup.string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    oldPassword: Yup.string().when('password', (password, field) =>
      password ? field.required('Digite sua senha atual') : field
    ),
    password: Yup.string(),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required()
            .oneOf([Yup.ref('password')], 'As senhas não coincidem')
        : field
    ),
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={profile}>
        <Input name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu email" />

        <hr />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Sua nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua nova senha"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Aguarde...' : 'Alterar'}
        </button>
      </Form>
    </Container>
  );
}

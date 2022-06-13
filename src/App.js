import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import './App.css';
import axios from 'axios';

function App() {
  const handleLogin = (values) => {
    console.log(values);
  };

  const handleRegister = (values) => {
    console.log(values);
  };

  const validationsLogin = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome não pode ficar vazio"),
    password: yup
      .string()
      .min(5, "A senha deve ter pelo menos 5 caracteres")
      .required("A senha é obrigatória"),
  });

  const validationsRegister = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome não pode ficar vazio"),
    password: yup
      .string()
      .min(5, "A senha deve ter pelo menos 5 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
  });

  return (
    <div className="App">
      <h1>Login</h1>
      <Formik
      initialValues={{}}
      onSubmit={handleLogin}
      validationSchema={validationsLogin}
      >
        <Form className='form-login'>
          <div className='login-form-container'>
            <Field name='name' className='form-field' placeholder='Name'/>
            <ErrorMessage
              component="span"
              name="name"
              className="form-error"
            />
          </div>

          <div className="form-container">
            <Field name="password" className="form-field" placeholder="Senha" />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Login
          </button>
        </Form>
      </Formik>
     
      <h1>Cadastro</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">
          <div className="register-form-container">
            <Field name="name" className="form-field" placeholder="Name" />

            <ErrorMessage
              component="span"
              name="name"
              className="form-error"
            />
          </div>

          <div className="form-container">
            <Field name="password" className="form-field" placeholder="Senha" />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>

          <div className="form-container">
            <Field
              name="confirmation"
              className="form-field"
              placeholder="Reinsira sua senha"
            />

            <ErrorMessage
              component="span"
              name="confirmation"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;

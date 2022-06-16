import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import './login.css';
import { useAuthContext } from "../../contexts/auth"
import { useNavigate } from "react-router-dom";

function Login() {
  const { signin, signup } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    signin(values.name, values.password);

    navigate("/dashboard");
  };

  const handleRegister = (values) => {
    signup(values.name, values.password);
  };

  const validationsLogin = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome não pode ficar vazio"),
    password: yup
      .string()
      .min(4, "A senha deve ter pelo menos 4 caracteres")
      .required("A senha é obrigatória"),
  });

  const validationsRegister = yup.object().shape({
    name: yup
      .string()
      .required("Seu nome não pode ficar vazio"),
    password: yup
      .string()
      .min(4, "A senha deve ter pelo menos 4 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
  });

  return (
    <div className='login-page'>
      <div className="container">
        <h1>Login</h1>
        <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
        >
          <Form className='login-form'>
            <div className='login-form-group'>
              <Field name='name' className='form-field' placeholder='Name'/>
              <ErrorMessage
                component="span"
                name="name"
                className="form-error"
              />
            </div>

            <div className="form-group">
              <Field name="password" type="password" className="form-field" placeholder="Senha" />

              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              />
            </div>

            <button className="button-login" type="submit">
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
            <div className="register-form-group">
              <Field name="name" className="form-field" placeholder="Name" />

              <ErrorMessage
                component="span"
                name="name"
                className="form-error"
              />
            </div>

            <div className="form-group">
              <Field name="password" type="password" className="form-field" placeholder="Senha" />

              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              />
            </div>

            <div className="form-group">
              <Field
                name="confirmation"
                className="form-field"
                placeholder="Reinsira sua senha"
                type="password"
              />

              <ErrorMessage
                component="span"
                name="confirmation"
                className="form-error"
              />
            </div>

            <button className="button-login" type="submit">
              Cadastrar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { singup } from "../services/auth";

type Inputs = {
  name: String;
  password: String;
};

export default function RegisterPage() {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [statusPost, setStatusPost] = useState("");

  const onSubmit = async (data: object) => {
    let response = await singup(data);
    if (response.status === 200 || response.status === 202) {
      alert("Registro satisfactorio! 😎");
      history.push("/login");
    } else {
      setStatusPost(response.message);
    }
  };
  return (
    <motion.div
      initial={{ x: "-100vh", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vh", opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormWrapper>
        <FormBox>
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <Control>
              <Input
                id="name"
                autoFocus
                {...register("name", { required: true })}
              />
              <Input.Label
                className={`${watch("name")?.length !== 0 ? "filled" : ""}`}
                htmlFor="name"
              >
                Nombre
              </Input.Label>
              <Input.Status>
                {errors.name && <span>Este campo es requerido</span>}
              </Input.Status>
            </Control>

            <Control>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true })}
              />
              <Input.Label
                className={`${watch("password")?.length !== 0 ? "filled" : ""}`}
                htmlFor="password"
              >
                Contraseña
              </Input.Label>
              <Input.Status>
                {errors.password && <span>Este campo es requerido</span>}
              </Input.Status>
            </Control>

            {Boolean(statusPost) ? (
              <StatusPostBox>{statusPost}</StatusPostBox>
            ) : null}

            <SubmitBtn className="mx-auto mt-10" type="submit">
              SUBMIT
            </SubmitBtn>
          </form>
        </FormBox>
      </FormWrapper>
    </motion.div>
  );
}

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const FormBox = styled.div`
  width: 100%;
  max-width: 720px;
  height: 30rem;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 2rem;

  & h1 {
    font-size: 4rem;
    letter-spacing: 2px;
    font-weight: 900;
    text-align: center;
  }

  & form {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
`;

const Control = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1.5rem auto;
  max-width: 32rem;
  width: 100%;

  .filled {
    transform: translate(0.5rem, -6rem) !important;
    transition: 0.3s all;
  }
`;
const Input: any = styled.input`
  background: #000;
  color: #fff;
  border: 3px solid #160841;
  border-radius: 10px;
  height: 3.5rem;
  padding: 1rem;
  box-shadow: 6px 7px 14px 7px rgba(13, 3, 29, 0.5);
  transition: 0.3s all;

  &:focus {
    outline: none;
    border: 3px solid #57009c;
    transition: 0.3s all;
  }
  &:focus + label,
  &:valid label {
    transform: translate(0.5rem, -6rem) !important;
    transition: 0.3s all;
  }
`;
Input.Label = styled.label`
  font-size: 16px;
  font-weight: 200;
  color: #fff;
  margin-bottom: 1rem;
  transform: translate(1rem, -2.5rem);
  transition: 0.3s all;
`;
Input.Status = styled.div`
  font-size: 0.9rem;
  margin-top: -1.5rem;
  padding-left: 1rem;
  color: crimson;
`;
const SubmitBtn = styled.button`
  display: inline-block;
  width: fit-content;
  padding: 1rem 5rem;
  font-size: 22px;
  border: 3px solid #57009c;
  background: #57009c;
  font-weight: 400;
  color: #fff;
  border-radius: 10px;
  transition: 0.3s all;

  &:hover,
  &:focus,
  &:active {
    border: 3px solid #160841;
    transition: 0.3s all;
    outline: none;
  }
`;

const StatusPostBox = styled.div`
  display: block;
  margin: 0 auto;
  padding: 2rem;
  background: #111;
  color: yellow;
  text-align: center;
  border-radius: 10px;
`;

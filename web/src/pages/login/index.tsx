import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useContext } from "react"

import styleForm from "../../styles/register/style.module.css"
import { AuthContext, AuthProvaider } from "context/auth/authContext"
import { RequireAuth } from "context/auth/requireAuth"

interface Login {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().required("Email obrigatorio"),
    password: yup.string().required("Senha obrigatoria"),
  })
  .required()

export default function Login() {
  const auth = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(schema),
  })

  async function Submit(data: Login) {
    auth?.sigin(data.email, data.password)
  }

  return (
    <div className={styleForm.div}>
      <form onSubmit={handleSubmit(Submit)} className={styleForm.form}>
        <div className={styleForm.containerForm}>
          <div className={styleForm.containerInput}>
            <h3 className={styleForm.name}>email</h3>
            <div className={styleForm.divInput}>
              <input
                {...register("email")}
                type="email"
                placeholder="seu email"
                className={styleForm.input}
              />
            </div>
            <span className={styleForm.span}>{errors.email?.message}</span>
          </div>
          <div className={styleForm.containerInput}>
            <h3 className={styleForm.name}>senha</h3>
            <div className={styleForm.divInput}>
              <input
                {...register("password")}
                type="password"
                placeholder="sua senha"
                className={styleForm.input}
              />
            </div>
            <span className={styleForm.span}>{errors.password?.message}</span>
          </div>
        </div>
        <div className={styleForm.divButton}>
          <button className={styleForm.button} type="submit">
            confirmar
          </button>
        </div>
        <div className={styleForm.containerLinks}>
          <div className={styleForm.linkForm}>
            <Link href={"/register"}>cadastrar</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

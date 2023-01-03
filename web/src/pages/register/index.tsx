import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useContext } from "react"
import Link from "next/link"

import { api } from "../../lib/axios"
import style from "../../styles/register/style.module.css"
import { RequireAuth } from "context/auth/requireAuth"

interface Register {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const schema = yup
  .object({
    name: yup.string().required("Nome obrigatorio"),
    email: yup.string().required("Email obrigatorio"),
    password: yup.string().required("Senha obrigatoria"),
    confirmPassword: yup.string().required("Confirme sua senha"),
  })
  .required()

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: yupResolver(schema),
  })

  async function Submit(data: Register) {
    try {
      const { name, email, password } = data
      const response = await api.post("/register", { name, email, password })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.div}>
      <form onSubmit={handleSubmit(Submit)} className={style.form}>
        <div className={style.containerForm}>
          <div className={style.containerInput}>
            <h3 className={style.name}>nome*</h3>
            <div className={style.divInput}>
              <input
                {...register("name")}
                type="text"
                minLength={2}
                placeholder="seu nome"
                className={style.input}
              />
            </div>
            <span className={style.span}>{errors.name?.message}</span>
          </div>
          <div className={style.containerInput}>
            <h3 className={style.name}>email*</h3>
            <div className={style.divInput}>
              <input
                {...register("email")}
                type="email"
                placeholder="seu email"
                className={style.input}
              />
            </div>
            <span className={style.span}>{errors.email?.message}</span>
          </div>
          <div className={style.containerInput}>
            <h3 className={style.name}>senha*</h3>
            <div className={style.divInput}>
              <input
                {...register("password")}
                type="password"
                placeholder="sua senha"
                className={style.input}
              />
            </div>
            <span className={style.span}>{errors.password?.message}</span>
          </div>
          <div className={style.containerInput}>
            <h3 className={style.name}>senha*</h3>
            <div className={style.divInput}>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirme a senha"
                className={style.input}
              />
            </div>
            <span className={style.span}>
              {errors.confirmPassword?.message}
            </span>
          </div>
        </div>
        <div className={style.divButton}>
          <button className={style.button} type="submit">
            confirmar
          </button>
        </div>
        <div className={style.containerLinks}>
          <div className={style.linkForm}>
            <Link href={"/login"}>entrar</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

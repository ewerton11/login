import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import { api } from "../../lib/axios"
import style from "../../styles/login/style.module.css"

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(schema),
  })

  async function Submit(data: Login) {
    try {
      const { email, password } = data
      const response = await api.post("/login", { email, password })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.div}>
      <form onSubmit={handleSubmit(Submit)} className={style.form}>
        <div className={style.containerEmail}>
          <div className={style.divInput}>
            <input
              {...register("email")}
              type="email"
              placeholder="Seu email"
              className={style.input}
            />
          </div>
          <span className={style.span}>{errors.email?.message}</span>
        </div>
        <div className={style.containerPassword}>
          <div className={style.divInput}>
            <input
              {...register("password")}
              type="password"
              placeholder="Sua senha"
              className={style.input}
            />
          </div>
          <span className={style.span}>{errors.password?.message}</span>
        </div>
        <button className={style.button} type="submit">
          confirmar
        </button>
      </form>
    </div>
  )
}

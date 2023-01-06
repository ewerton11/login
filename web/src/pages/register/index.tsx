import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import Link from "next/link"

import { api } from "../../lib/axios"
import style from "../../styles/register/style.module.css"

interface Register {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string().required("Email obrigatório"),
  password: Yup.string().required("Senha obrigatória"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'As senhas devem ser iguais'
  ),
}).required("Todos os campos são obrigatórios");

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
                {...register("passwordConfirmation")}
                type="password"
                placeholder="Confirme a senha"
                className={style.input}
              />
            </div>
            <span className={style.span}>
              {errors.passwordConfirmation?.message}
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

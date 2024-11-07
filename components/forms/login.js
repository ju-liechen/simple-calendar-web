import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

import { queryClient } from 'util/query-client'
import { loginSession } from 'hooks/session'

import { Form, useForm, TextInput, SubmitButton } from 'components/form'

export const Login = ({ onSuccess }) => {
  const router = useRouter()
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
        password: y.string().required(),
      })
    ),
    onSubmit: async (data) => {
      await loginSession(data)
      queryClient.invalidateQueries('basicSession')
      router.replace('/')
    }
  })
  return (
    <Form methods={methods}>
      <TextInput type='email' name='email' placeholder='email@example.com' />
      <TextInput
        name='password'
        type='password'
        placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
      />
      <SubmitButton>Log in</SubmitButton>
    </Form>
  )
}


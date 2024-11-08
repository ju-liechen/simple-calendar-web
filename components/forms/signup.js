import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

import { queryClient } from 'util/query-client'
import { signupSession } from 'hooks/session'
import { Form, useForm, TextInput, SubmitButton } from 'components/form'

export const Signup = ({ onSuccess, useForm: useFormArgs = {}, ...props }) => {
  const router = useRouter()

  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required('Email is required'),
        password: y.string().required('Password is required'),
      })
    ),
    onSubmit: async (data) => {
      await signupSession(data)
      queryClient.invalidateQueries('basicSession')
      router.replace('/')
    },
    ...useFormArgs
  })
  return (
    <Form methods={methods} {...props} >
      <TextInput type='email' name='email' placeholder='email@example.com' />
      <TextInput
        name='password'
        type='password'
        placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
      />
      <SubmitButton>Sign up</SubmitButton>
    </Form>
  )
}


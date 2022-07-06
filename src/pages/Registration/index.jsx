import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'Max Peterson',
      email: 'maxpeterson@test.cz',
      password: '54321'
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Failed to register!')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Create an account
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField error={Boolean(errors.fullName?.message)}
                   helperText={errors.fullName?.message}
                   {...register('fullName', { required: 'Enter full name' })} className={styles.field}
                   label="Full name"
                   fullWidth />
        <TextField error={Boolean(errors.email?.message)}
                   helperText={errors.email?.message}
                   type={'email'}
                   {...register('email', { required: 'Enter email' })} className={styles.field} label="E-Mail"
                   fullWidth />
        <TextField error={Boolean(errors.password?.message)}
                   helperText={errors.password?.message}
                   type={'password'}
                   {...register('password', { required: 'Enter password' })} className={styles.field} label="Password"
                   fullWidth />
        <Button type={'submit'} disabled={!isValid} size={'large'} variant={'contained'} fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  )
}

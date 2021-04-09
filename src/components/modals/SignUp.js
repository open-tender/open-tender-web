import React, { useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectSignUp, signUpCustomer, resetSignUp } from '@open-tender/redux'

import { closeModal, selectOptIns } from '../../slices'
import { ModalContent, ModalView, SignUpForm } from '..'

const SignUp = ({ windowRef }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectSignUp)
  const signUp = useCallback(
    (data, callback) => dispatch(signUpCustomer(data, callback)),
    [dispatch]
  )
  const close = useCallback(() => dispatch(closeModal()), [dispatch])
  const optIns = useSelector(selectOptIns)

  useEffect(() => {
    return () => dispatch(resetSignUp())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      windowRef.current.scrollTop = 0
    }
  }, [error, windowRef])

  return (
    <ModalView>
      <ModalContent
        title="Sign up for an account"
        subtitle={
          <p>Please provide the info below, and you'll be off to the races!</p>
        }
      >
        <SignUpForm
          loading={loading}
          error={error}
          signUp={signUp}
          callback={close}
          optIns={optIns}
        />
      </ModalContent>
    </ModalView>
  )
}

SignUp.displayName = 'SignUp'
SignUp.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default SignUp

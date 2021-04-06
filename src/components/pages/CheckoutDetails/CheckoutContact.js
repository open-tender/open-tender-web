import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { makePhone } from '@open-tender/js'
import { selectCustomer, selectCheckout, updateForm } from '@open-tender/redux'

import { FormHeader, Input } from '../../inputs'
import { Mail, Phone, User, UserId } from '../../icons'
import { useCallback, useEffect, useState } from 'react'

const iconMap = {
  name: <UserId />,
  email: <Mail />,
  phone: <Phone />,
  company: <User />,
}

const fields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    included: true,
    required: true,
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'tel',
    required: true,
  },
]

let companyField = {
  label: 'Company',
  name: 'company',
  type: 'text',
  required: false,
}

const CheckoutContactView = styled('div')`
  margin: 0 0 3rem;
`

const makeContact = (customer) => {
  const {
    first_name = '',
    last_name = '',
    email = '',
    phone = '',
    company = '',
  } = customer || {}
  const name = `${first_name} ${last_name}`.replace(/\s+$/, '')
  return {
    name,
    email,
    phone,
    company,
  }
}

const convertErrors = (errors) => {
  const { first_name, last_name } = errors
  const name =
    first_name || last_name ? 'Please enter both a first and last name' : null
  return name ? { name, ...errors } : errors
}

const CheckoutContact = ({ errors = {} }) => {
  const dispatch = useDispatch()
  const { profile } = useSelector(selectCustomer)
  const { customer_id, first_name, last_name, email, phone, company } =
    profile || {}
  const { check, form } = useSelector(selectCheckout)
  // const contactErrors = errors.customer || {}
  const [contact, setContact] = useState(makeContact(form.customer))
  const config = check ? check.config : {}
  const required = config.required ? config.required.customer : []
  const displayed = config.displayed ? config.displayed.customer : []
  const showCompany =
    displayed.includes('company') || required.includes('company')
  if (required.includes('company')) companyField.required = true
  const missingCompany = first_name && companyField.required && !company
  const formFields = missingCompany
    ? [companyField]
    : showCompany
    ? [...fields, companyField]
    : fields
  const formErrors = convertErrors(errors)

  useEffect(() => {
    if (first_name) {
      const customer = {
        customer_id,
        first_name,
        last_name,
        email,
        phone,
        company,
      }
      setContact(makeContact(customer))
      dispatch(updateForm({ customer }))
    }
  }, [dispatch, customer_id, first_name, last_name, email, phone, company])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((customer) => dispatch(updateForm({ customer })), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const val = id === 'phone' ? makePhone(value) : value
    let customer
    if (id === 'name') {
      const [first_name = '', last_name = ''] = val
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
      customer = { ...form.customer, first_name, last_name }
    } else {
      customer = { ...form.customer, [id]: val }
    }
    const data = { ...contact, [id]: val }
    setContact(data)
    debouncedUpdate(customer)
  }

  return !profile ? (
    <CheckoutContactView>
      <FormHeader>
        <h2>Contact Info</h2>
      </FormHeader>
      {formFields.map((field) => (
        <Input
          key={field.name}
          icon={iconMap[field.name]}
          label={field.label}
          name={field.name}
          type={field.type}
          value={contact[field.name] || ''}
          onChange={handleChange}
          error={formErrors[field.name]}
          required={field.required}
          autoComplete={field.autoComplete}
        />
      ))}
    </CheckoutContactView>
  ) : null
}

CheckoutContact.displayName = 'CheckoutContact'
CheckoutContact.propTypes = {
  revenueCenter: propTypes.object,
  setActive: propTypes.func,
  style: propTypes.object,
}

export default CheckoutContact

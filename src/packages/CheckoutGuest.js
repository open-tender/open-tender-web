import React, { useState, useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'
import { Input } from './Inputs'
import CheckoutLineItem from './CheckoutLineItem'
import { FormContext } from './CheckoutForm'

const initialState = {
  first_name: '',
  last_name: '',
  emaiil: '',
  phone: '',
  company: '',
}

const makeContactConfig = (requiredFields) => {
  return {
    first_name: { label: 'First Name', included: true, required: true },
    last_name: { label: 'Last Name', included: true, required: true },
    email: { label: 'Email', included: true, required: true },
    phone: { label: 'Phone', included: true, required: true },
    company: {
      label: 'Company',
      included: requiredFields.includes('company'),
      required: requiredFields.includes('company'),
    },
  }
}

const fields = [
  { name: 'first_name', type: 'text' },
  { name: 'last_name', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'phone', type: 'tel' },
  { name: 'company', type: 'text' },
]

const CheckoutGuest = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, errors, updateForm } = formContext
  const [customer, setCustomer] = useState(form.customer || initialState)

  // useEffect(() => {
  //   setCustomer(checkoutCustomer || initialState)
  // }, [checkoutCustomer])

  // https://medium.com/p/5489fc3461b3/responses/show
  // https://codesandbox.io/s/functional-component-debounce-cunf7
  const debouncedUpdate = useCallback(
    debounce((newCustomer) => updateForm({ customer: newCustomer }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const field = id.replace('customer-', '')
    const newCustomer = { ...customer, [field]: value }
    setCustomer(newCustomer)
    debouncedUpdate(newCustomer)
  }

  const requiredFields = check.config.required_fields.customer
  const contactConfig = makeContactConfig(requiredFields)
  return (
    <fieldset className="form__fieldset">
      <legend className="form__legend heading ot-font-size-h5">
        {config.guest.title}
      </legend>
      <div className="form__inputs">
        {fields.map((field) => {
          return (
            contactConfig[field.name] &&
            contactConfig[field.name].included && (
              <CheckoutLineItem
                key={field.name}
                label={contactConfig[field.name].label}
                required={contactConfig[field.name].required}
                classes="form__line__input"
              >
                <Input
                  label={contactConfig[field.name].label}
                  name={`customer-${field.name}`}
                  type={field.type}
                  value={customer[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={contactConfig[field.name].required}
                  classes="form__input--small"
                  inputClasses=""
                  showLabel={false}
                />
              </CheckoutLineItem>
            )
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutGuest.displayName = 'CheckoutGuest'

export default CheckoutGuest

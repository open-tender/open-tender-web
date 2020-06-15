import React, { useEffect, useRef, useMemo } from 'react'
import isEqual from 'lodash/isEqual'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import { openModal } from '../slices/modalSlice'
import { logoutCustomer, selectCustomer } from '../slices/customerSlice'
import {
  selectCartTotal,
  selectMenuSlug,
  selectOrder,
  resetOrder,
  resetOrderType,
  selectTimezone,
} from '../slices/orderSlice'
import {
  selectCheckout,
  resetErrors,
  resetTip,
  resetCompletedOrder,
  updateForm,
  updateCustomer,
  validateOrder,
  submitOrder,
} from '../slices/checkoutSlice'
// import { setCompletedOrder } from '../slices/confirmationSlice'
import { CheckoutForm, Check, ButtonMenu, ButtonAccount } from '../packages'
import { prepareOrder } from '../packages/utils/cart'
import BarLoader from 'react-spinners/BarLoader'
import HeaderLogo from './HeaderLogo'

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const CheckoutPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { checkout: checkoutConfig } = useSelector(selectConfig)
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const { account, auth } = useSelector(selectCustomer)
  const { check, form, loading, errors = {}, completedOrder } = useSelector(
    selectCheckout
  )
  const isComplete = completedOrder ? true : false
  const { revenueCenter, serviceType, requestedAt, cart } = order
  const { revenue_center_id: revenueCenterId } = revenueCenter || {}
  const { access_token } = auth || {}
  const { discounts, promoCodes, tenders, tip } = form
  const pending = loading === 'pending'

  useEffect(() => {
    window.scroll(0, 0)
    return () => {
      dispatch(resetErrors())
      dispatch(resetTip())
    }
  }, [dispatch])

  useEffect(() => {
    if (!revenueCenterId || !serviceType) {
      return history.push('/')
    } else if (cartTotal === 0) {
      return history.push(menuSlug)
    } else if (completedOrder) {
      dispatch(resetCompletedOrder())
      dispatch(resetOrder())
      return history.push(`/orders/${completedOrder.order_id}`)
    }
  }, [
    history,
    dispatch,
    cartTotal,
    menuSlug,
    revenueCenterId,
    serviceType,
    completedOrder,
  ])

  useEffect(() => {
    dispatch(resetErrors())
    dispatch(updateCustomer(account))
  }, [dispatch, account])

  const orderValidate = useMemo(() => {
    const customerValidate = account
      ? { customer_id: account.customer_id }
      : null
    const dataValidate = {
      revenueCenterId,
      serviceType,
      requestedAt,
      cart,
      customer: customerValidate,
      address: order.address,
      discounts,
      promoCodes,
      tip,
    }
    return prepareOrder(dataValidate)
  }, [
    account,
    revenueCenterId,
    serviceType,
    requestedAt,
    cart,
    order.address,
    discounts,
    promoCodes,
    tip,
  ])
  const prevOrderValidate = usePrevious(orderValidate)

  useEffect(() => {
    if (!isComplete && !isEqual(orderValidate, prevOrderValidate)) {
      dispatch(validateOrder(orderValidate))
    }
  }, [dispatch, orderValidate, prevOrderValidate, isComplete])

  const handleBackToMenu = (evt) => {
    evt.preventDefault()
    history.push(menuSlug)
    evt.target.blur()
  }

  const handleLogin = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'login' }))
    evt.target.blur()
  }

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  const handleLogout = (evt) => {
    evt.preventDefault()
    dispatch(logoutCustomer(auth.access_token))
    evt.target.blur()
  }

  const handleServiceType = (evt) => {
    evt.preventDefault()
    dispatch(resetOrderType())
    return history.push(`/`)
  }

  const handleRevenueCenter = (evt) => {
    evt.preventDefault()
    return history.push(`/locations`)
  }

  const handleRequestedAt = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'requestedAt' }))
    evt.target.blur()
  }

  return (
    <div className="checkout">
      <div className="checkout__header ot-nav-height bg-color">
        <div className="checkout__header__wrapper">
          <div className="checkout__header__container">
            <div className="checkout__logo__container">
              <div className="checkout__logo">
                <HeaderLogo />
              </div>
              <div className="checkout__actions">
                <ButtonMenu onClick={handleBackToMenu} classes="btn--header" />
                <ButtonAccount
                  account={account}
                  isAccount={false}
                  login={handleLogin}
                  logout={handleLogout}
                  goToAccount={handleAccount}
                  classes="btn--header"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout__content">
        <div className="checkout__content__wrapper">
          <div className="checkout__content__container">
            <div className="checkout__form">
              <div className="checkout__form__header">
                <h1 className="checkout__title">{checkoutConfig.title}</h1>
                <p className="checkout__subtitle">{checkoutConfig.subtitle}</p>
              </div>
              {!check && pending ? (
                <div className="checkout__loading">
                  <div className="checkout__loading__loader">
                    <BarLoader size={36} color={'#000'} />
                    {/* <span>Updating...</span> */}
                  </div>
                </div>
              ) : (
                <CheckoutForm
                  config={checkoutConfig}
                  order={order}
                  tz={tz}
                  check={check}
                  form={form}
                  loading={loading}
                  errors={errors}
                  updateForm={(form) => dispatch(updateForm(form))}
                  submitOrder={() => dispatch(submitOrder())}
                  login={() => dispatch(openModal({ type: 'login' }))}
                  logout={() => dispatch(logoutCustomer(access_token))}
                  updateRequestedAt={handleRequestedAt}
                  updateRevenueCenter={handleRevenueCenter}
                  updateServiceType={handleServiceType}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="checkout__sidebar bg-secondary-color">
        <div className="checkout__sidebar__wrapper">
          <div className="checkout__sidebar__container">
            {check && check.totals && (
              <div className="checkout__totals border-radius bg-color ot-box-shadow">
                <Check
                  title={checkoutConfig.check.title}
                  check={check}
                  tenders={tenders}
                  updating={pending}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

CheckoutPage.displayName = 'CheckoutPage'
export default CheckoutPage
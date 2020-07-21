import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectMenu,
  fetchMenu,
  selectRevenueCenters,
  setCart,
  setRevenueCenter,
} from '@open-tender/redux'
import { CartErrors } from '@open-tender/components'

import { closeModal, selectConfig } from '../../slices'
import ModalClose from '../ModalClose'
import iconMap from '../iconMap'

const CartErrorsModal = () => {
  const dispatch = useDispatch()
  const { cartErrors, previousMenuVars, menuVars } = useSelector(selectMenu)
  const { newCart, errors } = cartErrors || {}
  const { menu } = useSelector(selectConfig)
  const { revenueCenters } = useSelector(selectRevenueCenters)

  const handleRevert = (evt, revenueCenter, menuVars) => {
    evt.preventDefault()
    dispatch(closeModal())
    dispatch(setRevenueCenter(revenueCenter))
    dispatch(fetchMenu(menuVars))
    evt.target.blur()
  }

  const handleProceed = (evt) => {
    evt.preventDefault()
    dispatch(setCart(newCart))
    dispatch(closeModal())
    evt.target.blur()
  }

  return (
    <>
      <ModalClose classes="" onClick={handleProceed} />
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title ot-heading ot-font-size-h3">
            {menu.cartErrors.title}
          </p>
          <p className="modal__subtitle">{menu.cartErrors.subtitle}</p>
        </div>
        <div className="modal__body">
          <CartErrors
            newCart={newCart}
            errors={errors}
            revert={handleRevert}
            revertIcon={iconMap['ChevronLeft']}
            proceed={handleProceed}
            proceedIcon={iconMap['Trash2']}
            revenueCenters={revenueCenters}
            previousMenuVars={previousMenuVars}
            menuVars={menuVars}
          />
        </div>
      </div>
    </>
  )
}

CartErrorsModal.displayName = 'CartErrorsModal'

export default CartErrorsModal

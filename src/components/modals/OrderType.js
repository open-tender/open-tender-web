import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetOrderType, selectOrder } from '@open-tender/redux'
import { serviceTypeNamesMap } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ButtonGroupBig, ModalContent, ModalView } from '..'

const OrderType = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { serviceType } = useSelector(selectOrder)
  const serviceTypeName = serviceTypeNamesMap[serviceType]

  const changeOrderType = () => {
    dispatch(resetOrderType())
    dispatch(closeModal())
    history.push(`/order-type`)
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title="Change your order type"
        footer={
          <ButtonGroupBig>
            <ButtonStyled onClick={cancel} size="big">
              Keep {serviceTypeName}
            </ButtonStyled>
            <ButtonStyled
              onClick={changeOrderType}
              color="secondary"
              size="big"
              style={{ backgroundColor: 'transparent' }}
            >
              Change Order Type
            </ButtonStyled>
          </ButtonGroupBig>
        }
      >
        <div>
          <p>Are you sure you want to change your order type?</p>
          <p>
            This will start you over at the beginning, but the items in your
            cart will not be affected.
          </p>
        </div>
      </ModalContent>
    </ModalView>
  )
}

OrderType.displayName = 'OrderType'

export default OrderType

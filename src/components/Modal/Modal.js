import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAlert, resetAlert } from '@open-tender/redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

import { selectModal, closeModal, openModal, toggleSidebar } from '../../slices'
import ModalOverlay from './ModalOverlay'
import ModalLoading from './ModalLoading'
import {
  Address,
  AdjustRequestedAt,
  Allergens,
  CartCounts,
  CartErrors,
  Closed,
  CreditCard,
  GiftCard,
  GiftCardAssign,
  GiftCardAssignOther,
  GroupOrder,
  LevelUp,
  Login,
  MenuItem,
  OrderRating,
  OrderType,
  QRCode,
  RequestedAt,
  SignUp,
  Working,
} from '../modals'

const makeModal = (type, windowRef, args = {}) => {
  switch (type) {
    case 'address':
      return <Address windowRef={windowRef} {...args} />
    case 'adjustRequestedAt':
      return <AdjustRequestedAt {...args} />
    case 'allergens':
      return <Allergens {...args} />
    case 'cartCounts':
      return <CartCounts {...args} />
    case 'cartErrors':
      return <CartErrors {...args} />
    case 'closed':
      return <Closed {...args} />
    case 'creditCard':
      return <CreditCard windowRef={windowRef} {...args} />
    case 'giftCard':
      return <GiftCard windowRef={windowRef} {...args} />
    case 'giftCardAssign':
      return <GiftCardAssign windowRef={windowRef} {...args} />
    case 'giftCardAssignOther':
      return <GiftCardAssignOther windowRef={windowRef} {...args} />
    case 'groupOrder':
      return <GroupOrder {...args} />
    case 'item':
      return <MenuItem {...args} />
    case 'levelup':
      return <LevelUp windowRef={windowRef} {...args} />
    case 'login':
      return <Login {...args} />
    case 'orderType':
      return <OrderType {...args} />
    case 'qrCode':
      return <QRCode {...args} />
    case 'rating':
      return <OrderRating {...args} />
    case 'requestedAt':
      return <RequestedAt {...args} />
    case 'signUp':
      return <SignUp windowRef={windowRef} {...args} />
    case 'working':
      return <Working {...args} />
    default:
      return null
  }
}

const containerStyleMap = {
  address: { alignItems: 'flex-start' },
  creditCard: { alignItems: 'flex-start' },
  requestedAt: { alignItems: 'flex-start' },
  allergens: { alignItems: 'flex-start' },
  cartErrors: { alignItems: 'flex-start' },
  cartCounts: { alignItems: 'flex-start' },
  groupOrder: { alignItems: 'flex-start' },
  signUp: { alignItems: 'flex-start' },
}

const ModalContainer = styled('div')`
  position: fixed;
  z-index: 102;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`

const Modal = () => {
  const modalRef = useRef()
  const dispatch = useDispatch()
  const alert = useSelector(selectAlert)
  const { loading, type, args } = useSelector(selectModal)
  const preventClose = args && args.preventClose ? true : false
  const showModal = type ? true : false
  const modal = type ? makeModal(type, modalRef, args) : null
  const containerStyle = containerStyleMap[type] || null

  useEffect(() => {
    if (alert) {
      if (alert.type === 'closeAndSidebar') {
        dispatch(closeModal())
        dispatch(toggleSidebar())
      } else if (alert.type === 'close') {
        dispatch(closeModal())
      } else {
        dispatch(openModal(alert))
      }
      dispatch(resetAlert())
    }
  }, [alert, dispatch])

  const handleClose = (evt) => {
    if (!preventClose && evt.target.id === 'modal-container') {
      dispatch(closeModal())
    }
  }

  return (
    <>
      <ModalOverlay show={showModal || loading} />
      <ModalLoading show={loading} />
      <TransitionGroup component={null}>
        {showModal ? (
          <CSSTransition
            key="modal"
            classNames="md"
            timeout={{ enter: 250, exit: 250 }}
          >
            <ModalContainer
              ref={modalRef}
              id="modal-container"
              onClick={handleClose}
              style={containerStyle}
            >
              {modal}
            </ModalContainer>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

Modal.displayName = 'Modal'

export default Modal
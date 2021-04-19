import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  timezoneMap,
  makeRequestedAtStr,
  makeEstimatedTime,
  serviceTypeNamesMap,
} from '@open-tender/js'
import { selectOrder, setRequestedAt } from '@open-tender/redux'
import { RequestedAtTimes } from '@open-tender/components'

import { closeModal, toggleSidebar } from '../../slices'
import { ModalContent, RequestedAtCalendar } from '..'
import ModalView from '../Modal/ModalView'

const RequestedAtModalView = styled(ModalView)`
  width: 42rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    min-height: 100%;
    margin: 0;
    border-radius: 0;
  }

  & > div {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: 3rem ${(props) => props.theme.layout.paddingMobile};
    }
  }
`

const RequestedAtMessage = styled('p')`
  margin: 0 0 2rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  line-height: ${(props) => props.theme.lineHeight};

  span {
    font-weight: 600;
  }
`

const RequestedAt = ({
  forcedUpdate = false,
  openSidebar = false,
  onCloseAction,
}) => {
  const dispatch = useDispatch()
  const { requestedAt, serviceType, revenueCenter } = useSelector(selectOrder)
  const { settings } = revenueCenter || {}
  const { first_times, order_times } = settings || {}
  const st = serviceType === 'WALKIN' ? 'PICKUP' : serviceType
  const firstTimes = first_times ? first_times[st] : null
  const orderTimes = order_times ? order_times[st] : null
  if (!revenueCenter) return null
  const tz = timezoneMap[revenueCenter.timezone]
  const estimatedTime = makeEstimatedTime(
    requestedAt,
    revenueCenter,
    serviceType
  )
  const requestedAtText = makeRequestedAtStr(requestedAt, tz, true)
  const requestedTime = `${requestedAtText}${
    estimatedTime ? ` (${estimatedTime})` : ''
  }`
  const serviceTypeName = serviceTypeNamesMap[serviceType].toLowerCase()

  const handleRequestedAt = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(closeModal())
    if (onCloseAction) dispatch(onCloseAction())
    if (openSidebar) dispatch(toggleSidebar())
  }

  const handleKeepCurrent = () => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(closeModal())
    if (onCloseAction) dispatch(onCloseAction())
    if (openSidebar) dispatch(toggleSidebar())
  }

  return (
    <RequestedAtModalView>
      {firstTimes ? (
        <ModalContent
          title={
            forcedUpdate
              ? 'Order date & time updated'
              : 'Choose an order date & time'
          }
        >
          {forcedUpdate ? (
            <RequestedAtMessage>
              Your previous order time is no longer available and has been
              updated to <span>{requestedTime}</span>. Use the calendar below to
              change this.
            </RequestedAtMessage>
          ) : (
            <RequestedAtMessage>
              Your current order time is <span>{requestedTime}</span>. Use the
              calendar below to change this.
            </RequestedAtMessage>
          )}
          <RequestedAtCalendar
            requestedAt={requestedAt}
            serviceType={serviceType}
            revenueCenter={revenueCenter}
            setRequestedAt={handleRequestedAt}
            keepCurrent={handleKeepCurrent}
          />
        </ModalContent>
      ) : orderTimes ? (
        <ModalContent
          title="Choose an order date & time"
          subtitle={
            <p>
              Please select from the available {serviceTypeName} times below
            </p>
          }
        >
          <RequestedAtTimes
            orderTimes={orderTimes}
            revenueCenter={revenueCenter}
            requestedAt={requestedAt}
            setRequestedAt={handleRequestedAt}
          />
        </ModalContent>
      ) : null}
    </RequestedAtModalView>
  )
}

RequestedAt.displayName = 'RequestedAt'
RequestedAt.propTypes = {
  forcedUpdate: propTypes.bool,
  openSidebar: propTypes.bool,
  onCloseAction: propTypes.func,
}

export default RequestedAt

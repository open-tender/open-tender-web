import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { makeRevenueCenterMsg } from '@open-tender/js'
import {
  selectOrder,
  selectGroupOrder,
  selectAutoSelect,
} from '@open-tender/redux'
import { ButtonStyled, Message, Text } from '@open-tender/components'

import { selectConfig } from '../../slices'
import iconMap from '../iconMap'
import RevenueCenterButtons from './RevenueCenterButtons'

const RevenueCenterOrderView = styled('div')`
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1rem 0 0;
  }

  button {
    margin: 0 1rem 1rem 0;
    &:last-child {
      margin: 0;
    }
  }
`

const RevenueCenterOrderMessage = styled('div')`
  line-height: ${(props) => props.theme.lineHeight};

  + div {
    margin-top: 1.5rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin-top: 1rem;
    }
  }

  p {
  }
`

const RevenueCenterOrderMessageMessage = styled('p')`
  span {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: inline-block;
    }
  }
`

export const RevenueCenterOrder = ({ revenueCenter, isMenu, isLanding }) => {
  const history = useHistory()
  const { serviceType, requestedAt } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)
  const hasGroupOrdering =
    revenueCenter && revenueCenter.settings.group_ordering
  const autoSelect = useSelector(selectAutoSelect)
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const msg = makeRevenueCenterMsg(
    revenueCenter,
    serviceType,
    requestedAt,
    statusMessages
  )

  return (
    <RevenueCenterOrderView>
      {cartId && !hasGroupOrdering ? (
        <RevenueCenterOrderMessage>
          <RevenueCenterOrderMessageMessage>
            <Message color="alert" size="small">
              This location does not offer group ordering.
            </Message>
          </RevenueCenterOrderMessageMessage>
        </RevenueCenterOrderMessage>
      ) : (
        <>
          {msg.message && (
            <RevenueCenterOrderMessage>
              <p>
                <Text
                  color={msg.color}
                  size="small"
                  style={{ borderRadius: '0.3rem' }}
                >
                  {msg.message}
                </Text>
              </p>
            </RevenueCenterOrderMessage>
          )}
          {isMenu ? (
            !autoSelect ? (
              <div>
                <ButtonStyled
                  icon={iconMap.RefreshCw}
                  onClick={() => history.push(`/locations`)}
                >
                  Change Location
                </ButtonStyled>
              </div>
            ) : null
          ) : (
            <div>
              <RevenueCenterButtons
                revenueCenter={revenueCenter}
                isLanding={isLanding}
              />
            </div>
          )}
        </>
      )}
    </RevenueCenterOrderView>
  )
}

RevenueCenterOrder.displayName = 'RevenueCenterOrder'
RevenueCenterOrder.propTypes = {
  revenueCenter: propTypes.object,
  isMenu: propTypes.bool,
  isOrder: propTypes.bool,
}

export default RevenueCenterOrder

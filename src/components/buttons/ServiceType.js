import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder } from '@open-tender/redux'
import { makeServiceTypeName } from '@open-tender/js'

import { openModal, selectOutpostName } from '../../slices'
import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const ServiceType = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { orderType, serviceType, isOutpost } = useSelector(selectOrder)
  const outpostName = useSelector(selectOutpostName)
  const isCatering = orderType === 'CATERING'
  const serviceTypeName = makeServiceTypeName(
    serviceType,
    isCatering,
    isOutpost,
    outpostName
  )
  const icon =
    iconMap[
      isCatering
        ? 'Calendar'
        : serviceType === 'DELIVERY'
        ? 'Truck'
        : 'ShoppingBag'
    ]

  if (!serviceType) return null

  const handleServiceType = () => {
    const startOver = () => history.push(`/`)
    dispatch(openModal({ type: 'orderType', args: { startOver } }))
  }

  const handleCatering = () => {
    history.push(`/catering`)
  }

  const change = isCatering ? handleCatering : handleServiceType

  return <ButtonBoth text={serviceTypeName} icon={icon} onClick={change} />
}

ServiceType.displayName = 'ServiceType'

export default ServiceType
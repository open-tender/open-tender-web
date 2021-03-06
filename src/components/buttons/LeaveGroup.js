import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  resetOrderType,
  resetGroupOrder,
  resetCheckout,
} from '@open-tender/redux'

import iconMap from '../iconMap'
import { ButtonBoth } from '.'

const LeaveGroup = ({
  text = 'Leave Group Order',
  icon = iconMap.ArrowLeft,
  useButton = false,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const leave = () => {
    dispatch(resetOrderType())
    dispatch(resetGroupOrder())
    dispatch(resetCheckout())
    history.push(`/`)
  }

  return (
    <ButtonBoth text={text} icon={icon} onClick={leave} useButton={useButton} />
  )
}

LeaveGroup.displayName = 'LeaveGroup'
LeaveGroup.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  useButton: propTypes.bool,
}

export default LeaveGroup

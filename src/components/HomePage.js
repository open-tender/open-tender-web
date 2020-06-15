import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectConfig } from '../slices/configSlice'
import { selectOrder } from '../slices/orderSlice'
import { resetRevenueCenters } from '../slices/revenueCentersSlice'
import {
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
} from '../slices/geolocationSlice'
import useGeolocation from '../packages/useGeolocation'
import Background from './Background'
import HomeOrderType from './HomeOrderType'

const HomePage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()
  const { home: homeConfig } = useSelector(selectConfig)
  // const bgStyle = { backgroundImage: `url(${home.background}` }
  const order = useSelector(selectOrder)
  const hasTypes = order.orderType && order.serviceType

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(setGeoLoading())
  }, [dispatch])

  useEffect(() => {
    hasTypes ? history.push('/locations') : dispatch(resetRevenueCenters())
  }, [hasTypes, history, dispatch])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  return (
    <div className="content">
      <Background imageUrl={homeConfig.background} />
      <HomeOrderType />
    </div>
  )
}

HomePage.displayName = 'HomePage'
export default HomePage
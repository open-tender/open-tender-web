import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import Hero from './Hero'
import { Location } from './Location'
import { selectLocation, selectMenuVars } from '../slices/orderSlice'
import { fetchMenu, selectMenu } from '../slices/menuSlice'

const Locations = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { menu: menuConfig } = useSelector(selectConfig)
  const location = useSelector(selectLocation)
  const { locationId, serviceType, requestedAt } = useSelector(selectMenuVars)
  const menu = useSelector(selectMenu)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    locationId
      ? dispatch(fetchMenu([locationId, serviceType, requestedAt]))
      : history.push('/locations')
  }, [locationId, serviceType, requestedAt, dispatch, history])

  return (
    <>
      <Hero imageUrl={menuConfig.background} classes="hero--right">
        {location && (
          <Location location={location} classes="location--hero slide-up" />
        )}
      </Hero>
      <div className="content">
        {menu.loading === 'pending' ? (
          <p>Loading menu...</p>
        ) : menu.error ? (
          <h1>{menu.error}</h1>
        ) : (
          menu.entities.map((category) => <h2>{category.full_name}</h2>)
        )}
      </div>
    </>
  )
}

export default Locations

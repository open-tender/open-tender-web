import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectAnnouncementsPage,
  fetchAnnouncementPage,
  selectCustomer,
} from '@open-tender/redux'
import { useGeolocation } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import {
  selectConfig,
  closeModal,
  selectBrand,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
} from '../../../slices'
import { AppContext } from '../../../App'
import { Content, HeaderDefault, Main, PageHero, PageView } from '../..'
import HomeMenu from '../Home/HomeMenu'
import HomeJourneys from '../Home/HomeJourneys'
import HomeRecentOrders from './HomeRecentOrders'
import HomeLifestyle from './HomeLifestyle'
import HomeApp from './HomeApp'

const Home = () => {
  const dispatch = useDispatch()
  const { windowRef } = useContext(AppContext)
  const { geoLatLng, geoError } = useGeolocation()
  const { auth } = useSelector(selectCustomer)
  const brand = useSelector(selectBrand)
  const { home } = useSelector(selectConfig)
  const { background, mobile, showHero } = home
  const page = auth ? 'ACCOUNT' : 'HOME'
  const announcements = useSelector(selectAnnouncementsPage(page))

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  useEffect(() => {
    dispatch(fetchAnnouncementPage(page))
  }, [dispatch, page])

  useEffect(() => {
    dispatch(setGeoLoading())
  }, [dispatch])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageView>
            <PageHero
              announcements={announcements}
              imageUrl={isBrowser ? background : mobile}
              showHero={showHero}
            />
            {auth && <HomeRecentOrders style={{ marginBottom: '0' }} />}
            <HomeMenu />
            <HomeApp />
            <HomeJourneys />
            <HomeLifestyle />
          </PageView>
        </Main>
      </Content>
    </>
  )
}

Home.displayName = 'Home'
export default Home

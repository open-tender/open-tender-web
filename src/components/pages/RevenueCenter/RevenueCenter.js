import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  selectOrder,
  fetchRevenueCenter,
  resetOrderType,
  setOrderServiceType,
} from '@open-tender/redux'
import { useGeolocation } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import {
  selectBrand,
  selectConfig,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
} from '../../../slices'
import { AppContext } from '../../../App'
import {
  Background,
  Container,
  Content,
  HeaderDefault,
  Loading,
  Main,
  RevenueCenter as RevenueCenterCard,
  ScreenreaderTitle,
} from '../..'

const makeImageUrl = (images, defaultImageUrl) => {
  if (!images) return defaultImageUrl || null
  const largeImage = images
    ? images.find((i) => i.type === 'LARGE_IMAGE')
    : null
  let imageUrl = largeImage ? largeImage.url : null
  return imageUrl || defaultImageUrl || null
}

const RevenueCenter = () => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState(null)
  const { slug } = useParams()
  const { geoLatLng, geoError } = useGeolocation()
  const { title: siteTitle } = useSelector(selectBrand)
  const { revenueCenters: config } = useSelector(selectConfig)
  const order = useSelector(selectOrder)
  const { revenueCenter, loading } = order
  const isLoading = loading === 'pending'
  const { windowRef } = useContext(AppContext)
  const title = revenueCenter ? revenueCenter.name : config.title

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(setGeoLoading())
    dispatch(resetOrderType())
    dispatch(fetchRevenueCenter(slug))
  }, [dispatch, slug, windowRef])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  useEffect(() => {
    if (revenueCenter) {
      const { images, settings, revenue_center_type } = revenueCenter
      setImageUrl(makeImageUrl(images, config.background))
      const { service_types } = settings
      let serviceType = service_types.length
        ? service_types.includes('PICKUP')
          ? 'PICKUP'
          : 'DELIVERY'
        : null
      if (serviceType) {
        dispatch(setOrderServiceType(revenue_center_type, serviceType))
      }
    }
  }, [revenueCenter, config.background, dispatch])

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={imageUrl || config.background} />
      <Content maxWidth="76.8rem">
        <HeaderDefault maxWidth="76.8rem" />
        <Main>
          <Container>
            <ScreenreaderTitle>{title}</ScreenreaderTitle>
            <div style={{ margin: '4rem 0 0' }}>
              {isLoading ? (
                <Loading text="Retrieving nearest locations..." />
              ) : revenueCenter ? (
                <RevenueCenterCard
                  revenueCenter={revenueCenter}
                  showImage={true}
                  isLanding={true}
                />
              ) : (
                <p>
                  Location not found. Please try a different URL or{' '}
                  <Link to="/">head back to our home page</Link>.
                </p>
              )}
            </div>
          </Container>
        </Main>
      </Content>
    </>
  )
}

RevenueCenter.displayName = 'RevenueCenter'
export default RevenueCenter

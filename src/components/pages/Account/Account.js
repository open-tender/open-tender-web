import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  fetchCustomer,
  fetchCustomerCreditCards,
  selectAnnouncements,
  fetchAnnouncementPage,
} from '@open-tender/redux'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand, selectConfig, closeModal } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  Greeting,
  Main,
  PageContainer,
  PageHero,
  PageView,
  HeaderDefault,
} from '../..'
import AccountActions from './AccountActions'
import AccountTabs from './AccountTabs'
import AccountOrders from './AccountOrders'
import AccountLoyalty from './AccountLoyalty'
import AccountGroupOrders from './AccountGroupOrders'
import AccountDeals from './AccountDeals'

const AccountLinks = () => (
  <p>
    <Link to="/gift-cards">Purchase gift cards</Link> |{' '}
    <Link to="/donations">make a donation</Link>
    {/* <Link to="/contact">get in touch</Link> */}
  </p>
)

const Account = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const announcements = useSelector(selectAnnouncements)
  const { title: siteTitle } = useSelector(selectBrand)
  const { account: accountConfig } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, showHero } = accountConfig
  const { auth, profile } = useSelector(selectCustomer)
  const pageTitle = profile ? `${title}, ${profile.first_name}` : ''
  const token = auth ? auth.access_token : null
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
    dispatch(closeModal())
  }, [windowRef, dispatch])

  useEffect(() => {
    if (!token) return history.push('/')
    dispatch(fetchAnnouncementPage('ACCOUNT'))
    dispatch(fetchCustomer())
    dispatch(fetchCustomerCreditCards(true))
  }, [token, dispatch, history])

  return profile ? (
    <>
      <Helmet>
        <title>Welcome Back | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          {!isBrowser && <AccountTabs />}
          <PageView>
            <PageHero
              announcements={announcements}
              imageUrl={isBrowser ? background : mobile}
              showHero={showHero}
            >
              <Greeting
                title={pageTitle}
                subtitle={subtitle}
                actions={<AccountActions />}
              >
                <AccountLinks />
              </Greeting>
            </PageHero>
            <PageContainer style={{ marginTop: '0' }}>
              <AccountGroupOrders />
              <AccountOrders />
              <AccountDeals />
              <AccountLoyalty />
            </PageContainer>
          </PageView>
        </Main>
      </Content>
    </>
  ) : null
}

Account.displayName = 'Account'
export default Account

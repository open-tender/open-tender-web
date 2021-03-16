import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'

import { maybeRefreshVersion } from '../../../app/version'
import { selectBrand } from '../../../slices'
import { AppContext } from '../../../App'
import {
  Content,
  HeaderDefault,
  Main,
  PageContainer,
  PageTitle,
  VerifyAccount,
} from '../..'
import AccountSettingsButtons from './AccountSettingsButtons'
import { isBrowser } from 'react-device-detect'
import AccountTabs from '../Account/AccountTabs'

const AccountSettings = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth, profile } = useSelector(selectCustomer)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scrollTop = 0
    maybeRefreshVersion()
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  return profile ? (
    <>
      <Helmet>
        <title>Account Settings | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          {!isBrowser && <AccountTabs />}
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle
              title="Account"
              subtitle="Manage saved credit cards, addresses, etc."
            >
              <div style={{ margin: '1rem 0 2rem' }}>
                <p>
                  <ButtonLink onClick={() => dispatch(logoutCustomer())}>
                    Log out of your account
                  </ButtonLink>
                </p>
                <VerifyAccount style={{ margin: '2rem 0 0' }} />
              </div>
            </PageTitle>
            <AccountSettingsButtons />
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

AccountSettings.displayName = 'AccountSettings'
export default AccountSettings

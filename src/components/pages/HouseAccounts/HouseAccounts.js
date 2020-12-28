import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  selectCustomerHouseAccounts,
  fetchCustomerHouseAccounts,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import { isBrowser } from 'react-device-detect'

import { selectAccountConfig, selectBrand } from '../../../slices'
import {
  Background,
  Container,
  Content,
  HeaderAccount,
  Loading,
  Main,
  PageTitle,
  PageContent,
} from '../..'
import { AppContext } from '../../../App'
import HouseAccountsList from './HouseAccountsList'
import { useHistory } from 'react-router-dom'

const AccountHouseAccounts = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const account = useSelector(selectAccountConfig)
  const { entities, loading, error } = useSelector(selectCustomerHouseAccounts)
  const isLoading = loading === 'pending'
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    windowRef.current.scroll(0, 0)
  }, [windowRef])

  useEffect(() => {
    if (!auth) return history.push('/')
  }, [auth, history])

  useEffect(() => {
    dispatch(fetchCustomerHouseAccounts())
  }, [dispatch])

  return (
    <>
      <Helmet>
        {account.houseAccounts.title} | {siteTitle}
      </Helmet>
      {isBrowser && <Background imageUrl={account.background} />}
      <Content maxWidth="76.8rem">
        <HeaderAccount
          title={account.houseAccounts.title}
          maxWidth="76.8rem"
          text="Back to Settings"
          path="/account/settings"
        />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...account.houseAccounts} />
            <PageContent>
              {entities.length ? (
                <HouseAccountsList houseAccounts={entities} />
              ) : isLoading ? (
                <Loading text="Retrieving your house accounts..." />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p>{account.houseAccounts.empty}</p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

AccountHouseAccounts.displayName = 'AccountHouseAccounts'
export default AccountHouseAccounts
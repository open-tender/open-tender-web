import React, { useState, useEffect, useRef, useContext } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { selectGroupOrder } from '@open-tender/redux'

import { selectDisplaySettings } from '../../../slices'
import { RevenueCenter, NavSticky } from '../..'
import { MenuContext } from './Menu'
import MenuRevenueCenters from './MenuRevenueCenters'
import MenuCategories from './MenuCategories'
import MenuLoading from './MenuLoading'
import MenuError from './MenuError'
import MenuHero from './MenuHero'
import styled from '@emotion/styled'
import { AppContext } from '../../../App'
import MenuDeals from './MenuDeals'

const MenuView = styled('div')`
  position: relative;
`

const MenuContent = () => {
  const {
    revenueCenter,
    categories,
    revenueCenters,
    isLoading,
    error,
    menuConfig,
    deals,
  } = useContext(MenuContext)
  const { menuHero, menuHeroMobile } = useSelector(selectDisplaySettings)
  const { cartGuest } = useSelector(selectGroupOrder)
  const showHero =
    menuHero === undefined ? true : isMobile ? menuHeroMobile : menuHero
  const topRef = useRef()
  const heroRef = useRef()
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState([])
  let navItems = visible ? visible.map((i) => i.name) : []
  navItems = deals && deals.length > 0 ? ['Deals', ...navItems] : navItems
  const heroHeight = heroRef.current
    ? heroRef.current.getBoundingClientRect().height
    : 0
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    if (revenueCenters) {
      if (selected) {
        const id = selected.revenue_center_id
        setVisible(categories.filter((i) => i.revenue_center_id === id))
      } else {
        setVisible([])
      }
    } else {
      setVisible(categories)
    }
  }, [revenueCenters, categories, selected])

  const change = (revenueCenter) => {
    setSelected(revenueCenter)
    if (!revenueCenter) {
      windowRef.current.scrollTo(0, 0)
    } else {
      windowRef.current.scrollTo(0, 0)
    }
  }

  return (
    <>
      {!selected && revenueCenter && showHero && (
        <div ref={heroRef}>
          <MenuHero imageUrl={menuConfig.background}>
            <RevenueCenter
              revenueCenter={revenueCenter}
              isMenu={true}
              style={{ maxWidth: '44rem' }}
            />
          </MenuHero>
        </div>
      )}
      {!error ? (
        <MenuView>
          <MenuLoading />
          <div ref={topRef}>
            <MenuRevenueCenters
              revenueCenters={revenueCenters}
              selected={selected}
              change={change}
            />
            {visible.length > 0 && (
              <>
                <NavSticky
                  items={navItems}
                  offset={heroHeight}
                  revenueCenter={selected}
                  change={change}
                />
                {!cartGuest && <MenuDeals deals={deals} />}
                <MenuCategories categories={visible} />
              </>
            )}
          </div>
        </MenuView>
      ) : !isLoading ? (
        <MenuError />
      ) : null}
    </>
  )
}

MenuContent.displayName = 'MenuContent'

export default MenuContent

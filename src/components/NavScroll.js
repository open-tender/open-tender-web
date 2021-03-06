import React, { useState, useRef, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import { animateScroll as scroll } from 'react-scroll'
import { slugify } from '@open-tender/js'

import { AppContext } from '../App'
import styled from '@emotion/styled'
import { isBrowser, isMobile } from 'react-device-detect'
import { useTheme } from '@emotion/react'

const getActiveElement = (elements, topOffset) => {
  return elements
    .filter((i) => i.getBoundingClientRect().top <= topOffset)
    .reduce(
      (max, i) =>
        max && max.getBoundingClientRect().top > i.getBoundingClientRect().top
          ? max
          : i,
      null
    )
}

const NavScrollButtonView = styled('button')`
  font-family: ${(props) => props.theme.fonts.preface.family};
  font-weight: ${(props) => props.theme.fonts.preface.weight};
  letter-spacing: ${(props) => props.theme.fonts.preface.letterSpacing};
  text-transform: ${(props) => props.theme.fonts.preface.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.fonts.preface.fontSmoothing};
  font-size: ${(props) => props.theme.fonts.preface.fontSize};
  color: ${(props) =>
    props.theme.links.light[props.active ? 'hover' : 'color']};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.links.light.hover};
  }
`

const NavScrollButton = ({ container, name, active, offset = 0 }) => {
  const id = slugify(name)

  const onClick = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const element = document.getElementById(id)
    const position = element.offsetTop + offset
    scroll.scrollTo(position, {
      container,
      duration: 500,
      smooth: true,
      offset: -60,
    })
    const items = element.querySelectorAll('button')
    const firstItem = items.length ? items[0] : null
    if (firstItem) firstItem.focus()
  }

  return (
    <NavScrollButtonView onClick={onClick} active={active}>
      {name}
    </NavScrollButtonView>
  )
}

const NavScrollView = styled('div')`
  width: 100%;
  overflow-x: scroll;
  transition: all 500ms ease;

  ul {
    position: relative;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    height: ${(props) => props.theme.layout.navHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      height: ${(props) => props.theme.layout.navHeightMobile};
    }

    li {
      display: block;
      flex-shrink: 0;
      font-size: ${(props) => props.theme.fonts.preface.fontSize};
      padding: 0 0 0 ${(props) => props.theme.layout.padding};
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        padding-left: ${(props) => props.theme.layout.paddingMobile};
        // padding-right: ${(props) => props.theme.layout.paddingMobile};
        padding-right: 1rem;
      }

      &:last-child {
        padding-right: ${(props) => props.theme.layout.padding};
        @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
          padding-right: ${(props) => props.theme.layout.paddingMobile};
        }
      }
    }
  }
`

// https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari
const smoothHorizontalScrolling = (container, time, amount, start) => {
  let eAmt = amount / 100
  let curTime = 0
  let scrollCounter = 0
  while (curTime <= time) {
    window.setTimeout(shs, curTime, container, scrollCounter, eAmt, start)
    curTime += time / 100
    scrollCounter++
  }
}

const shs = (e, sc, eAmt, start) => {
  e.scrollLeft = eAmt * sc + start
}

const NavScroll = ({ items, offset = 0 }) => {
  const { windowRef } = useContext(AppContext)
  const navRef = useRef(null)
  const listRef = useRef(null)
  const [active, setActive] = useState(null)
  const theme = useTheme()
  const { navHeight, navHeightMobile } = theme.layout
  const height = isBrowser ? navHeight : navHeightMobile
  const heightInPixels = parseInt(height.replace('rem', '')) * 10
  const topOffset = heightInPixels * 2 + 1
  // const topOffset = 121
  const elements = Array.from(document.getElementsByName('section'))
  const navOffset = offset + (isMobile ? -30 : -30)

  useEffect(() => {
    const winRef = windowRef.current
    const handleScroll = () => {
      if (elements.length) {
        setActive(getActiveElement(elements, topOffset))
      }
    }
    winRef.addEventListener('scroll', handleScroll)
    return () => {
      winRef.removeEventListener('scroll', () => handleScroll)
    }
  }, [windowRef, topOffset, elements, active])

  useEffect(() => {
    if (active) {
      const navActive = document.getElementById(`nav-${active.id}`)
      if (navActive) {
        const navOffset = navActive.getBoundingClientRect().x
        const parentOffset = navActive.offsetParent.getBoundingClientRect().x
        // const offsetLeft = navOffset - parentOffset
        if (navRef.current) {
          smoothHorizontalScrolling(
            navRef.current,
            250,
            navOffset,
            -parentOffset
          )
          // navRef.current.scrollTo({
          //   top: 0,
          //   left: offsetLeft,
          //   behavior: 'smooth',
          // })
          // navRef.current.scrollLeft = offsetLeft
        }
      }
    }
  }, [active])

  return (
    <NavScrollView ref={navRef}>
      <ul ref={listRef}>
        {items.map((name, index) => {
          const sectionId = slugify(name)
          const activeId = active ? active.id : null
          return (
            <li key={`${sectionId}-${index}`} id={`nav-${sectionId}`}>
              <NavScrollButton
                container={windowRef.current}
                name={name}
                offset={navOffset}
                active={activeId === sectionId}
              />
            </li>
          )
        })}
      </ul>
    </NavScrollView>
  )
}

NavScroll.displayName = 'NavScroll'
NavScroll.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
}

export default NavScroll

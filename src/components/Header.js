import React, { useContext, useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

import { AppContext } from '../App'
import { isBrowser, isMobile } from 'react-device-detect'

const HeaderView = styled('div')`
  position: fixed;
  z-index: 14;
  top: 0;
  right: 0;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  height: 7.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s ease;
  background-color: ${(props) => props.theme.bgColors[props.bgColor]};
  box-shadow: ${(props) =>
    props.stuck ? props.theme.boxShadow.outer : 'none'};
  border: 0;
  border-bottom-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.bgColors[props.borderColor]};
  padding: ${(props) => (props.isMobile ? '0' : props.theme.layout.padding)};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    height: 6.4rem;
  }
`

const HeaderTitle = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  > span {
    display: block;
    max-width: 26rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    letter-spacing: 0.01em;
    font-size: 2.8rem;
  }
`

const HeaderNav = styled('div')`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;

  ${(props) =>
    props.isBrowser
      ? `
    button {
    margin: 0 0 0 ${props.theme.layout.padding};

    &:first-of-type {
      margin: 0
    }
    }
  `
      : `display: flex; align-items: center;`}
`

const Header = ({
  left,
  title,
  right,
  bgColor = 'primary',
  borderColor = 'primary',
  maxWidth = '100%',
  style = null,
}) => {
  const header = useRef(null)
  const [stuck, setStuck] = useState(false)
  const { windowRef } = useContext(AppContext)

  useEffect(() => {
    const winRef = windowRef.current
    const handleScroll = () => {
      if (header.current) {
        setStuck(header.current.getBoundingClientRect().top < 0)
      }
    }
    winRef.addEventListener('scroll', handleScroll)
    return () => {
      winRef.removeEventListener('scroll', () => handleScroll)
    }
  }, [windowRef])

  const adjustedBorderColor =
    borderColor === 'primary' && stuck ? 'secondary' : borderColor

  return (
    <nav ref={header} role="navigation" aria-label="Primary Navigation">
      <HeaderView
        stuck={stuck}
        bgColor={bgColor}
        borderColor={adjustedBorderColor}
        maxWidth={maxWidth}
        isMobile={isMobile}
        style={style}
      >
        <HeaderNav>{left}</HeaderNav>
        {title && (
          <HeaderTitle>
            <Preface>{title}</Preface>
          </HeaderTitle>
        )}
        <HeaderNav isBrowser={isBrowser}>{right}</HeaderNav>
      </HeaderView>
    </nav>
  )
}

Header.displayName = 'Header'
Header.propTypes = {
  left: propTypes.element,
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  right: propTypes.element,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
  maxWidth: propTypes.string,
}

export default Header

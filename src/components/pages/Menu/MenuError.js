import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { ButtonStyled, Heading } from '@open-tender/components'

import { MenuContext } from './Menu'
import iconMap from '../../iconMap'

const MenuErrorView = styled('div')`
  max-width: 48rem;
  padding: 3rem;
  margin: 3rem auto;
  text-align: center;
  color: ${(props) => props.theme.colors.error};
  background-color: ${(props) => props.theme.bgColors.error};
  border-radius: ${(props) => props.theme.border.radius};
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;

  > p span {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
    color: ${(props) => props.theme.colors.error};
  }

  > div {
    margin: 1rem 0 2rem;

    p {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const MenuError = () => {
  const { error, changeRevenueCenter } = useContext(MenuContext)
  return error ? (
    <MenuErrorView>
      <p>
        <Heading>Menu Not Found</Heading>
      </p>
      <div>
        <p>{error}</p>
      </div>
      <ButtonStyled icon={iconMap.RefreshCw} onClick={changeRevenueCenter}>
        Change Location
      </ButtonStyled>
    </MenuErrorView>
  ) : null
}

MenuError.displayName = 'MenuError'

export default MenuError

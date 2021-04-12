import React, { useContext } from 'react'
import styled from '@emotion/styled'

import { Container, PageTitle } from '../..'
import { MenuContext } from './Menu'
import MenuLoading from './MenuLoading'
import MenuError from './MenuError'
import MenuAllergenFilter from './MenuAllergenFilter'
import MenuCateringCategory from './MenuCateringCategory'

const MenuView = styled('div')`
  position: relative;
`

const MenuCateringView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuCateringCategories = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -1.6rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }
`
const MenuCateringCategoryItem = styled('div')`
  width: 33.33333%;
  padding: 0 1.6rem 3.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 50%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0 0 1.2rem;
    max-width: 40rem;
  }
`

const MenuCatering = () => {
  const { categories, isLoading, error } = useContext(MenuContext)
  const showError = error && !isLoading

  return showError ? (
    <MenuError />
  ) : (
    <MenuView>
      <MenuLoading />
      <MenuCateringView>
        <Container>
          <PageTitle
            title="Our Catering Menu"
            subtitle="From sandwiches to buffets, we have something for every event, meeting, or party."
          >
            <MenuAllergenFilter />
          </PageTitle>
          <MenuCateringCategories>
            {categories.map((category) => (
              <MenuCateringCategoryItem key={category.id}>
                <MenuCateringCategory category={category} />
              </MenuCateringCategoryItem>
            ))}
          </MenuCateringCategories>
        </Container>
      </MenuCateringView>
    </MenuView>
  )
}

MenuCatering.displayName = 'MenuCatering'

export default MenuCatering

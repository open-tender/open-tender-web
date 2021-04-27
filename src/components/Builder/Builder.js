import { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { animateScroll } from 'react-scroll'
import { formatDollars, getWidth } from '@open-tender/js'
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  Preface,
  useBuilder,
} from '@open-tender/components'

import { CartFooter, ImageSpinner } from '..'
import { ButtonSmall } from '../buttons'
import { Checkmark, ChevronDown, ChevronLeft, ChevronUp } from '../icons'
import BuilderImage from './BuilderImage'
import BuilderOption from './BuilderOption'
import BuilderMadeFor from './BuilderMadeFor'
import BuilderNotes from './BuilderNotes'
import BuilderOptionToggle from './BuilderOptionToggle'
import BuilderItemQuantity from './BuilderItemQuantity'
import { isBrowser } from 'react-device-detect'
import { selectTheme } from '../../slices'
import { useSelector } from 'react-redux'
import BuilderAllergens from './BuilderAllergens'

export const makePriceCals = (item, showCals, hidePrice) => {
  const zeroPrice = !!(item.price === '0.00' || item.price === 0)
  const price = zeroPrice || hidePrice ? null : `${formatDollars(item.price)}`
  const cals = showCals && item.cals ? `${item.cals.toFixed(0)} cal` : null
  const separator = price && cals ? ' / ' : ''
  const priceCals = `${cals || ''}${separator}${price || ''}`
  return priceCals || null
}

const chunkArray = (array, size) => {
  let result = []
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size)
    result.push(chunk)
  }
  return result
}

const BuilderView = styled('form')`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${(props) => props.theme.layout.containerMaxWidth};
  padding: 0 ${(props) => props.theme.layout.padding} 14.5rem;
  margin: ${(props) => props.theme.layout.margin} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 14.5rem;
    margin: 0 auto;
  }
`

const BuilderInfo = styled('div')`
  position: relative;
  flex-grow: 1;
  // width: 100%;
`

const BuilderHeader = styled('div')`
  position: relative;
  top: -4rem;
  padding: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    top: 0;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderTitle = styled('div')`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  // background-color: #ccc;
  top: -16rem;
  height: 15rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    top: -10rem;
    height: 10rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    top: -10rem;
    height: 10rem;
  }

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
  }
`

const BuilderCategory = styled('h2')`
  display: block;
  line-height: 1;
  font-size: 18rem;
  margin: -2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 11.5rem;
    margin: -1rem 0 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: 11.5rem;
    margin: -1rem 0 0;
  }
`

const BuilderNameView = styled('div')`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderName = styled(Heading)`
  font-weight: 600;
  letter-spacing: 0.2em;
  font-size: 5rem;
  line-height: 1;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 3rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: 3rem;
  }
`

const BuilderPrice = styled(Preface)`
  text-align: center;
  font-weight: 500;
  font-size: 3.8rem;
  letter-spacing: 0.03em;
  text-transform: none;
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 2.6rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: 2.6rem;
  }
`

const BuilderDescription = styled('p')`
  line-height: ${(props) => props.theme.lineHeight};
  font-size: 1.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 1.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: 1.5rem;
  }
`

const BuilderIngredients = styled('div')`
  flex: 0 0 63rem;
  max-width: 63rem;
  margin: 0 0 0 6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex: 1;
    margin: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-width: 100%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

const BuilderIngredientsHeader = styled('div')`
  padding: 2.5rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: 2.5rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderIngredientsText = styled('div')`
  line-height: ${(props) => props.theme.lineHeight};
  margin: 1rem 0 0;
`

const BuilderIngredientsTitleWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BuilderIngredientsTitle = styled(Preface)`
  font-size: 2.8rem;
  line-height: 1;
  letter-spacing: 0.01em;
  font-weight: 500;
`

const BuilderToggle = styled(ButtonSmall)`
  color: ${(props) => props.theme.colors.beet};
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
  background-color: transparent;
  // display: none;
  // @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
  //   display: block;
  // }

  span span {
    position: relative;
    top: -0.1rem;
    display: inline-block;
    margin: 0 0 0 0.5rem;
  }

  &:focus {
    outline: none;
  }
`

const BuilderGroupsContainer = styled('div')`
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    background-color: ${(props) => props.theme.bgColors.light};
  }
`

const BuilderGroupsNav = styled('div')`
  padding: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: 3rem 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 3rem 0 3rem ${(props) => props.theme.layout.paddingMobile};
    overflow-x: scroll;
  }

  & > div {
    display: flex;
    align-items: center;
    // margin: 0 -1.6rem;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      // margin: 0 -1.2rem;
      justify-content: center;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0;
      justify-content: flex-start;
    }

    & > div {
      padding: 0 0.5rem 0 0;

      &:last-of-type {
        padding: 0;
      }
    }
  }
`

const BuilderGroupsNavButton = styled(ButtonSmall)`
  color: ${(props) =>
    props.isActive || props.isComplete
      ? props.theme.colors.light
      : props.theme.colors.beet};
  background-color: ${(props) =>
    props.isActive
      ? props.theme.colors.beet
      : props.isComplete
      ? props.theme.colors.pepper
      : 'transparent'};
  box-shadow: ${(props) =>
    props.isActive || props.isComplete
      ? '0px 4px 20px rgba(0, 0, 0, 0.25)'
      : 'none'};
  // font-size: 1.6rem;
  // padding: 1.1rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    // font-size: 1.3rem;
    // padding: 0.8rem 1.2rem;
  }

  &:focus {
    outline: none;
  }

  & > span {
    display: block;
  }
`

const BuilderGroupsNavButtonCheck = styled('span')`
  margin: 0.2rem -0.2rem 0 0.5rem;
`

const BuilderGroupContainer = styled('div')`
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderGroup = styled('div')`
  transition: all 0.25s ease-in-out;
  opacity: ${(props) => (props.isActive ? '1' : '0')};
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};
  max-height: ${(props) => (props.isActive ? 'none' : '0')};
  overflow: ${(props) => (props.isActive ? 'visible' : 'hidden')};

  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 -0.5rem;
    // transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  // & > span ~ div {
  //   transform: translateY(5rem);
  // }
`

const BuilderNameNotes = styled('div')`
  padding: 3rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    background-color: ${(props) => props.theme.bgColors.light};
    padding: 3rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderNameNotesWrapper = styled('div')`
  padding: 1.5rem 2rem 2rem;
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
  border-radius: 1.4rem;
`

const BuilderFooter = styled('div')`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  height: 14.5rem;
`

const Builder = ({
  menuItem,
  addItemToCart,
  cancel,
  soldOut,
  allergenAlerts,
  displaySettings,
  cartId,
  windowRef,
}) => {
  const {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(menuItem, soldOut)
  const ingredientsRef = useRef(null)
  const [isOpen, setIsOpen] = useState(true)
  const [activeGroup, setActiveGroup] = useState(0)
  const [activeOption, setActiveOption] = useState(null)
  const [perRow, setPerRow] = useState(3)
  const { groups, notes, madeFor, totalPrice } = item
  const imageUrl = item.imageUrl ? item.imageUrl : null
  const {
    calories: showCals,
    madeFor: showMadeFor,
    notes: showNotes,
    // builderImages: showImage,
    // tags: showTags,
    allergens: showAllergens,
  } = displaySettings
  const priceCals = makePriceCals(item, showCals)
  const priceTotal = formatDollars(item.totalPrice)
  const hasGroups = groups.length > 0
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  const theme = useSelector(selectTheme)
  const mobileWidth = parseInt(theme.breakpoints.mobile.replace('px', ''))
  // const isEdit = item.index !== undefined
  const allergenAlert =
    showAllergens && allergenAlerts && item.allergens.length
      ? item.allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []

  useEffect(() => {
    const width = getWidth()
    const count = width && mobileWidth ? (width > mobileWidth ? 4 : 3) : 3
    setPerRow(count)
  }, [mobileWidth])

  // useEffect(() => {
  //   if (isIncomplete || isEdit) setIsOpen(true)
  // }, [isIncomplete, isEdit])

  useEffect(() => {
    if (isOpen && !isBrowser) {
      const topOffset = ingredientsRef.current.getBoundingClientRect().top
      animateScroll.scrollTo(topOffset, {
        container: windowRef.current,
        duration: 500,
        smooth: true,
      })
    }
  }, [isOpen, windowRef])

  const toggleIngredients = (evt) => {
    evt.preventDefault()
    if (isOpen) {
      if (!isBrowser) {
        animateScroll.scrollTo(0, {
          container: windowRef.current,
          duration: 500,
          smooth: true,
        })
        setTimeout(() => setIsOpen(false), 500)
      } else {
        setIsOpen(false)
      }
    } else {
      setIsOpen(true)
    }
  }

  const toggleGroups = (evt, index) => {
    evt.preventDefault()
    setActiveGroup(index)
    setActiveOption(null)
  }

  return (
    <BuilderView>
      <BuilderInfo>
        <BuilderImage imageUrl={imageUrl} spinner={<ImageSpinner />} />
        <BuilderHeader>
          <BuilderTitle>
            <div>
              <BuilderCategory>{item.category}</BuilderCategory>
              <BuilderNameView>
                <BuilderName as="div">{item.name}</BuilderName>
              </BuilderNameView>
            </div>
          </BuilderTitle>
          {priceCals ? (
            <BuilderPrice as="p">{priceCals}</BuilderPrice>
          ) : (
            <BuilderPrice as="p">&nbsp;</BuilderPrice>
          )}
          <BuilderDescription>{item.description}</BuilderDescription>
          <BuilderAllergens allergens={allergenAlert} />
        </BuilderHeader>
      </BuilderInfo>
      <BuilderIngredients ref={ingredientsRef}>
        <BuilderIngredientsHeader>
          <BuilderIngredientsTitleWrapper>
            <BuilderIngredientsTitle>Ingredients</BuilderIngredientsTitle>
            <BuilderToggle onClick={toggleIngredients}>
              {isOpen ? (
                <span>
                  Close <ChevronUp />
                </span>
              ) : (
                <span>
                  Customize <ChevronDown />
                </span>
              )}
            </BuilderToggle>
          </BuilderIngredientsTitleWrapper>
          <BuilderIngredientsText>
            Go ahead, make it your own. Click to customize.
          </BuilderIngredientsText>
        </BuilderIngredientsHeader>
        {isOpen && (
          <>
            {hasGroups && (
              <BuilderGroupsContainer>
                <BuilderGroupsNav>
                  <div>
                    {groups.map((group, index) => {
                      const isComplete =
                        (group.min > 0 && group.quantity >= group.min) ||
                        (group.max > 0 && group.quantity === group.max)
                      return (
                        <div key={group.name}>
                          <BuilderGroupsNavButton
                            onClick={(evt) => toggleGroups(evt, index)}
                            isActive={index === activeGroup}
                            isComplete={isComplete}
                          >
                            <span>{group.name}</span>
                            {isComplete && (
                              <BuilderGroupsNavButtonCheck>
                                <Checkmark />
                              </BuilderGroupsNavButtonCheck>
                            )}
                          </BuilderGroupsNavButton>
                        </div>
                      )
                    })}
                    {/* <div style={{ width: '3rem' }}>&nbsp;</div> */}
                  </div>
                </BuilderGroupsNav>
                <BuilderGroupContainer>
                  {groups.map((group, index) => {
                    const chunked = chunkArray(group.options, perRow)
                    return (
                      <BuilderGroup isActive={index === activeGroup}>
                        {chunked.map((options) => {
                          const active = options.find(
                            (i) => `${group.id}-${i.id}` === activeOption
                          )
                          const show = active ? true : false
                          const props = {
                            show,
                            option: active,
                            setActiveOption,
                          }
                          return (
                            <>
                              <BuilderOptionToggle {...props} />
                              <div>
                                {options.map((option) => {
                                  const key = `${group.id}-${option.id}`
                                  const props = {
                                    perRow,
                                    group,
                                    option,
                                    soldOut,
                                    allergenAlerts,
                                    displaySettings,
                                    incrementOption,
                                    decrementOption,
                                    setOptionQuantity,
                                    activeOption,
                                    setActiveOption,
                                    setActiveGroup,
                                    index,
                                    lastIndex: groups.length - 1,
                                  }
                                  return <BuilderOption key={key} {...props} />
                                })}
                              </div>
                            </>
                          )
                        })}
                      </BuilderGroup>
                    )
                  })}
                </BuilderGroupContainer>
              </BuilderGroupsContainer>
            )}
            {((showMadeFor && !cartId) || showNotes) && (
              <BuilderNameNotes>
                <BuilderNameNotesWrapper>
                  {showMadeFor && !cartId && (
                    <BuilderMadeFor madeFor={madeFor} setMadeFor={setMadeFor} />
                  )}
                  {showNotes && (
                    <BuilderNotes notes={notes} setNotes={setNotes} />
                  )}
                </BuilderNameNotesWrapper>
              </BuilderNameNotes>
            )}
          </>
        )}
      </BuilderIngredients>
      <BuilderFooter>
        <CartFooter
          label={
            <BuilderItemQuantity
              item={item}
              increment={increment}
              decrement={decrement}
              setQuantity={setQuantity}
            />
          }
          total={
            <span>
              Total Price
              <span>{priceTotal}</span>
            </span>
          }
          back={
            <ButtonLink onClick={cancel}>
              <ChevronLeft />
              <Preface>Back To Menu</Preface>
            </ButtonLink>
          }
          add={
            <ButtonStyled
              onClick={() => addItemToCart(item)}
              disabled={isIncomplete}
              size="big"
              color="cart"
            >
              Add To Cart
            </ButtonStyled>
          }
        />
      </BuilderFooter>
    </BuilderView>
  )
}

Builder.displayName = 'Builder'
Builder.propTypes = {
  menuItem: propTypes.object,
  addItemToCart: propTypes.func,
  cancel: propTypes.func,
  soldOut: propTypes.array,
  allergenAlerts: propTypes.array,
  displaySettings: propTypes.object,
  cartId: propTypes.number,
  windowRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
}

export default Builder

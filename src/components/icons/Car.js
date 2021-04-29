import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CarView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const Car = ({ size = '3.1rem', color = null }) => {
  return (
    <CarView size={size} color={color}>
      <svg viewBox="0 0 32 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.6821 0.744214C3.7875 0.476656 4.04581 0.300781 4.33338 0.300781H19.3334C19.5479 0.300781 19.7505 0.399103 19.8832 0.567571L26.3397 8.76232H27.6667C28.7399 8.76232 29.7669 9.1953 30.5225 9.96247C31.2777 10.7293 31.7001 11.767 31.7001 12.8469V19.6162C31.7001 19.8018 31.6263 19.9799 31.495 20.1111C31.3637 20.2424 31.1857 20.3162 31 20.3162L28.3076 20.3162C27.9803 22.2318 26.3333 23.7008 24.3334 23.7008C22.3334 23.7008 20.6864 22.2318 20.3592 20.3162H11.6409C11.3137 22.2318 9.66669 23.7008 7.66673 23.7008C5.66677 23.7008 4.01979 22.2318 3.69253 20.3162L1.00005 20.3162C0.814398 20.3162 0.63635 20.2424 0.505074 20.1111C0.373799 19.9799 0.300049 19.8018 0.300049 19.6162V9.46232C0.300049 9.3745 0.316574 9.28746 0.348763 9.20575L3.6821 0.744214ZM3.69253 18.9162C4.01979 17.0006 5.66677 15.5316 7.66673 15.5316C9.66669 15.5316 11.3137 17.0006 11.6409 18.9162H20.3592C20.6864 17.0006 22.3334 15.5316 24.3334 15.5316C26.3333 15.5316 27.9803 17.0006 28.3076 18.9162L30.3 18.9162V12.8469C30.3 12.1315 30.0201 11.4475 29.525 10.9448C29.0303 10.4425 28.3616 10.1623 27.6667 10.1623H1.70005V18.9162L3.69253 18.9162ZM2.02816 8.76232H15.3V1.70078H4.80998L2.02816 8.76232ZM16.7 1.70078V8.76232H24.5574L18.9937 1.70078H16.7ZM7.66673 16.9316C6.22242 16.9316 5.0334 18.1234 5.0334 19.6162C5.0334 21.109 6.22242 22.3008 7.66673 22.3008C9.11104 22.3008 10.3001 21.109 10.3001 19.6162C10.3001 18.1234 9.11104 16.9316 7.66673 16.9316ZM24.3334 16.9316C22.8891 16.9316 21.7001 18.1234 21.7001 19.6162C21.7001 21.109 22.8891 22.3008 24.3334 22.3008C25.7777 22.3008 26.9667 21.109 26.9667 19.6162C26.9667 18.1234 25.7777 16.9316 24.3334 16.9316Z"
        />
      </svg>
    </CarView>
  )
}

Car.displayName = 'Car'
Car.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
}

export default Car
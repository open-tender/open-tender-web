import propTypes from 'prop-types'
import styled from '@emotion/styled'

const UserIdView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.inputs.placeholderColor};
  }
`

const UserId = ({ size = '1.7rem', color = null }) => {
  return (
    <UserIdView size={size} color={color}>
      <svg viewBox="0 0 17 16">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.26949 1.90104C2.14191 1.90104 1.22782 2.81513 1.22782 3.94271V12.276C1.22782 13.4036 2.14191 14.3177 3.26949 14.3177H13.2695C14.3971 14.3177 15.3112 13.4036 15.3112 12.276V3.94271C15.3112 2.81513 14.3971 1.90104 13.2695 1.90104H3.26949ZM0.311157 3.94271C0.311157 2.30887 1.63565 0.984375 3.26949 0.984375H13.2695C14.9033 0.984375 16.2278 2.30887 16.2278 3.94271V12.276C16.2278 13.9099 14.9033 15.2344 13.2695 15.2344H3.26949C1.63565 15.2344 0.311157 13.9099 0.311157 12.276V3.94271Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.76965 5.23503C5.10231 5.23503 4.56132 5.77602 4.56132 6.44336C4.56132 7.1107 5.10231 7.65169 5.76965 7.65169C6.437 7.65169 6.97799 7.1107 6.97799 6.44336C6.97799 5.77602 6.437 5.23503 5.76965 5.23503ZM3.64465 6.44336C3.64465 5.26975 4.59605 4.31836 5.76965 4.31836C6.94326 4.31836 7.89465 5.26975 7.89465 6.44336C7.89465 7.61696 6.94326 8.56836 5.76965 8.56836C4.59605 8.56836 3.64465 7.61696 3.64465 6.44336Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3112 4.77669C10.3112 4.52356 10.5164 4.31836 10.7695 4.31836H12.4362C12.6893 4.31836 12.8945 4.52356 12.8945 4.77669C12.8945 5.02982 12.6893 5.23503 12.4362 5.23503H10.7695C10.5164 5.23503 10.3112 5.02982 10.3112 4.77669Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3112 8.10872C10.3112 7.85559 10.5164 7.65039 10.7695 7.65039H12.4362C12.6893 7.65039 12.8945 7.85559 12.8945 8.10872C12.8945 8.36185 12.6893 8.56706 12.4362 8.56706H10.7695C10.5164 8.56706 10.3112 8.36185 10.3112 8.10872Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.64465 11.4427C3.64465 11.1896 3.84986 10.9844 4.10299 10.9844H12.4363C12.6895 10.9844 12.8947 11.1896 12.8947 11.4427C12.8947 11.6958 12.6895 11.901 12.4363 11.901H4.10299C3.84986 11.901 3.64465 11.6958 3.64465 11.4427Z"
        />
      </svg>
    </UserIdView>
  )
}

UserId.displayName = 'UserId'
UserId.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default UserId
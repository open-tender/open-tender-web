import propTypes from 'prop-types'
import styled from '@emotion/styled'

const QuestionMarkView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || 'none'};
  }
`

const QuestionMark = ({ size = '2.6rem', color = null }) => {
  return (
    <QuestionMarkView size={size} color={color}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="13" cy="13" r="12.05" stroke="#FBF8EA" strokeWidth="1.9"/>
        <path d="M12.014 14.7975L11.6765 11.94C12.3465 11.775 12.869 11.595 13.244 11.4C13.619 11.2 13.884 10.9725 14.039 10.7175C14.194 10.4625 14.2715 10.175 14.2715 9.855C14.2715 9.355 14.0965 8.975 13.7465 8.715C13.3965 8.45 12.854 8.3175 12.119 8.3175C11.709 8.3175 11.289 8.355 10.859 8.43C10.434 8.5 10.0315 8.6025 9.65148 8.7375V7.1625C10.0115 7.0375 10.434 6.94 10.919 6.87C11.404 6.795 11.8765 6.7575 12.3365 6.7575C13.6115 6.7575 14.574 7.0125 15.224 7.5225C15.874 8.0325 16.199 8.7575 16.199 9.6975C16.199 10.4975 15.9665 11.1525 15.5015 11.6625C15.0365 12.1725 14.329 12.585 13.379 12.9L13.229 14.7975H12.014ZM12.6215 18.1125C12.2265 18.1125 11.909 18.0075 11.669 17.7975C11.434 17.5825 11.3165 17.2975 11.3165 16.9425C11.3165 16.5775 11.434 16.29 11.669 16.08C11.904 15.865 12.2215 15.7575 12.6215 15.7575C13.0265 15.7575 13.3465 15.8675 13.5815 16.0875C13.8165 16.3025 13.934 16.5875 13.934 16.9425C13.934 17.2875 13.814 17.57 13.574 17.79C13.339 18.005 13.0215 18.1125 12.6215 18.1125Z" fill="#FBF8EA"/>
      </svg>
    </QuestionMarkView>
  )
}

QuestionMark.displayName = 'QuestionMark'
QuestionMark.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default QuestionMark
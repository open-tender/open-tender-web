import React from 'react'
import propTypes from 'prop-types'
import BarLoader from 'react-spinners/BarLoader'
import styled from '@emotion/styled'
import { Text } from '@open-tender/components'

const defaultText = 'Please sit tight. This may take a second.'

const WorkingModalView = styled('div')`
  position: relative;
  width: auto;
  min-width: 24rem;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radius};
`

const WorkingView = styled('div')`
  padding: 2.5rem;
  text-align: center;

  > div:first-of-type {
    margin-bottom: 1.5rem;
  }

  > div:last-of-type {
    display: inline-block;
  }
`

const Working = ({ text = defaultText }) => {
  return (
    <WorkingModalView>
      <WorkingView>
        <div>
          <Text id="dialogTitle" as="p" color="primary">
            {text}
          </Text>
        </div>
        <div>
          <BarLoader size={100} loading={true} />
        </div>
      </WorkingView>
    </WorkingModalView>
  )
}

Working.displayName = 'Working'
Working.propTypes = {
  text: propTypes.string,
}

export default Working

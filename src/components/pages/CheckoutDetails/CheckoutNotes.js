import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectOrder } from '@open-tender/redux'

import { FormHeader } from '../../inputs'
import CheckoutQuickOptions from './CheckoutQuickOptions'
import { AddCondiments, DressingOnTheSide, LeaveAtDoor } from '../../icons'

const optionButtons = [
  {
    text: 'Leave at door',
    icon: <LeaveAtDoor />,
  },
  {
    text: 'Add condiments',
    icon: <AddCondiments />,
  },
  {
    text: 'Dressing on the side',
    icon: <DressingOnTheSide />,
  },
]

const makeNotes = (options, notes) => {
  const optionsStr = options.length ? `${options.join(', ')}, ` : ''
  return optionsStr + notes
}

const makeInitState = (notes) => {
  const parts = notes.split(', ')
  const optionsText = optionButtons.map((i) => i.text)
  const options = optionsText.filter((text) => parts.includes(text))
  const text = parts.filter((part) => !optionsText.includes(part)).join(', ')
  return [options, text]
}

const CheckoutNotes = ({ notes, handleChange }) => {
  const [initOptions, initText] = makeInitState(notes)
  const [options, setOptions] = useState(initOptions)
  const [text, setText] = useState(initText)
  const { serviceType } = useSelector(selectOrder)

  const handleOption = (evt, option) => {
    evt.preventDefault()
    const newOptions = options.includes(option)
      ? options.filter((i) => i !== option)
      : [...options, option]
    setOptions(newOptions)
    const target = {
      id: 'notes',
      type: 'text',
      value: makeNotes(newOptions, text),
    }
    handleChange({ target })
  }

  const handleNotes = (evt) => {
    setText(evt.target.value)
    const target = {
      id: 'notes',
      type: 'text',
      value: makeNotes(options, evt.target.value),
    }
    handleChange({ target })
  }

  return (
    <>
      <CheckoutQuickOptions
        buttons={optionButtons}
        options={options}
        handleOption={handleOption}
      />
      <FormHeader style={{ marginBottom: '0' }}>
        <h2>{serviceType.toLowerCase()} Notes</h2>
      </FormHeader>
      <textarea value={text} onChange={handleNotes} />
    </>
  )
}

export default CheckoutNotes
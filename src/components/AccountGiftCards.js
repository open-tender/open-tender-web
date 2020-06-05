import React from 'react'
import { useSelector } from 'react-redux'
import { slugify } from '../packages/utils/helpers'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectCustomerGiftCards } from '../slices/customerSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionRow from './SectionRow'
import { Button } from '../packages'
import { formatDateStr } from '../packages/utils/datetimes'

const AccountGiftCards = () => {
  const {
    giftCards: { title, subtitle },
  } = useSelector(selectAccountConfigSections)
  const giftCards = useSelector(selectCustomerGiftCards)

  const handleAddValue = (evt, giftCard) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const handlePurchase = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const isLoading = giftCards.loading === 'pending'
  const error = giftCards.error
  const showGiftCards = giftCards.entities.length

  return (
    <div id={slugify(title)} className="section container ot-section">
      <div className="section__container">
        <SectionHeader title={title} subtitle={subtitle} />
        <SectionLoading loading={isLoading} />
        <SectionError error={error} />
        {showGiftCards && (
          <div className="section__content bg-color border-radius">
            <div className="section__rows">
              {giftCards.entities.map((giftCard) => (
                <SectionRow
                  key={giftCard.card_number}
                  title={giftCard.card_number}
                >
                  <div className="section__row__container">
                    <div className="section__row__container__content">
                      <p>${giftCard.balance} remaining balance</p>
                      <p className="font-size-small secondary-color">
                        {giftCard.orders} orders have been placed with this gift
                        card
                      </p>
                      {giftCard.expiration && (
                        <p className="font-size-small ot-alert-color">
                          Expires{' '}
                          {formatDateStr(giftCard.expiration, 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                    <div className="section__row__container__buttons">
                      <Button
                        text="Add Value"
                        icon="PlusCircle"
                        onClick={(evt) => handleAddValue(evt, giftCard)}
                        classes="btn--small font-size-small"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </SectionRow>
              ))}
            </div>
          </div>
        )}
        <div className="section__footer">
          <p className="font-size-small">
            <Button
              text="Purchase a new gift card"
              onClick={handlePurchase}
              classes="btn-link"
            />
          </p>
        </div>
      </div>
    </div>
  )
}

AccountGiftCards.displayName = 'AccountGiftCards'
export default AccountGiftCards
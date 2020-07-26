import React from 'react'
import propTypes from 'prop-types'

const MenuRevenueCenter = ({ revenueCenter, change }) => {
  const logo = revenueCenter.app_image_url
  // const bgImage = revenueCenter.small_image_url || revenueCenter.large_image_url
  // const bgStyle = bgImage ? { backgroundImage: `url(${bgImage}` } : null
  const bgStyle = null

  const handleClick = (evt) => {
    evt.preventDefault()
    console.log(evt)
    console.log(revenueCenter)
    change(revenueCenter)
    evt.target.blur()
  }

  return (
    <div className="menu__item">
      <div className="menu__item__container ot-border-color">
        <button className="ot-font-size" onClick={handleClick}>
          <div
            className="menu__item__image bg-image ot-bg-color-secondary ot-border-radius"
            style={bgStyle}
          >
            <div className="menu__item__overlay">
              <div className="menu__item__overlay__container">
                <img
                  className="menu__item__overlay__logo"
                  src={logo}
                  alt={revenueCenter.name}
                />
              </div>
            </div>
          </div>
          <div className="menu__item__content">
            <p className="menu__item__name ot-heading ot-font-size-big">
              {revenueCenter.name}
            </p>
            {revenueCenter.description && (
              <p className="menu__item__desc ot-color-secondary ot-font-size-small">
                {revenueCenter.description}
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}

MenuRevenueCenter.displayName = 'MenuRevenueCenter'
MenuRevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
  change: propTypes.func,
}

export default MenuRevenueCenter

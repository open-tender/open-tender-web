const contentConfig = {
  home: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594323134_french-toast_1547x2000.jpg',
    title: 'How can we help you today?',
    // preface: "Let's get started, shall we?",
    subtitle:
      'To get started, please choose an order type from the options below.',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui ipsum, feugiat quis urna quis, posuere facilisis tellus. Fusce sit amet purus non arcu venenatis viverra ut a risus. Vestibulum dapibus sapien est.',
      'Morbi ac nisi ac dui ultrices bibendum nec in lorem. Vestibulum ut semper est, eget posuere turpis. Donec quis rhoncus nulla. Fusce id sagittis eros.',
    ],
    orderTypes: {
      OUTPOST: {
        title: 'Order for Outpost',
        subtitle: 'Dropoff at your building or office',
      },
      PICKUP: {
        title: 'Order for Pickup',
        subtitle: 'Pickup at a restaurant',
      },
      DELIVERY: {
        title: 'Order for Delivery',
        subtitle: 'Directly to your address',
      },
      CATERING: {
        title: 'Order Catering',
        subtitle: 'Large group orders via delivery or pikup',
      },
      MERCH: {
        title: 'Order Merch',
        subtitle: 'T-shirts, gift cards, and other non-food items',
      },
    },
  },
  catering: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594417045_5c93dab58fc356b9096a.jpg',
    title: "When's your event?",
    subtitle:
      'We require 24 hours notice for catering orders. Please see the fine print section below for additional info.',
    policy: {
      title: 'Fine Print',
      subtitle: '',
      content: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui ipsum, feugiat quis urna quis, posuere facilisis tellus. Fusce sit amet purus non arcu venenatis viverra ut a risus. Vestibulum dapibus sapien est.',
        'Morbi ac nisi ac dui ultrices bibendum nec in lorem. Vestibulum ut semper est, eget posuere turpis. Donec quis rhoncus nulla. Fusce id sagittis eros.',
      ],
    },
  },
  revenueCenters: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1588303325_976877dbfac85a83d9e9.jpg',
    title: "Let's find the nearest location",
    subtitle: 'Please enter a zip code or address below.',
    statusMessages: {
      CLOSED: {
        title: 'Location currently closed',
        msg: "We're sorry, but this location is currently closed.",
      },
      CLOSED_TEMPORARILY: {
        title: 'Location closed temporarily',
        msg:
          'This location is temporarily closd due to technical or operational difficulties. Please try back later today or tomorrow.',
      },
      COMING_SOON: {
        title: 'Location coming soon',
        msg: "This location isn't accepting orders yet, but it will be soon!",
      },
    },
  },
  menu: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1588456921_burger-with-knife-black-napkin_flipped-cropped_2400x800.jpg',
    loadingMessage: 'Retrieving the menu. Please hang tight.',
    soldOutMessage: 'Sold Out For The Day',
    cartErrors: {
      title: 'Invalid Items in Cart',
      subtitle: 'Uh oh. Certain items in your cart are no longer available.',
    },
  },
  checkout: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594392655_cash-register-black-and-white_1800x1200.jpg',
    title: "Let's get you checked out",
    subtitle: '',
    checkTitle: 'Order Summary',
    details: {
      title: 'Review your order details',
    },
    address: { title: 'Confirm your address' },
    signUp: {
      title: 'Wanna create an account?',
      subtitle:
        'Order history, saved favorites & allergens, saved credit cards, and much more. Signing up takes two seconds - start reaping the benefits today!',
    },
    guest: {
      title: 'Or continue to checkout as a guest',
    },
    account: {
      title: 'Nice to see you again!',
    },
    surcharges: {
      title: 'Optional Services',
      subtitle: 'Choose one or more of these optional services',
    },
    discounts: {
      title: 'Redeem your loyalty rewards',
      subtitle: 'Apply one or more discounts below.',
    },
    promoCodes: {
      title: 'Apply a promo code',
      subtitle: 'Enter a promo code below & hit the apply button',
    },
    giftCards: {
      title: 'Apply a gift card',
      subtitle: 'Apply an existing gift card or add a new one',
    },
    tenders: {
      title: 'How would you like to pay?',
      subtitle: 'Please add one or more payments below',
    },
  },
  confirmation: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594402866_delivery-bag-thank-you_1800x1800.jpg',
    title: 'Thanks for your order!',
    subtitle:
      "Below are the details, and we'll be sending a confirmation email shortly, which will serve as your receipt.",
    error:
      "Please be sure to check your spam folder if you don't receive the confirmation email.",
  },
  account: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594352748_salad-top-down_1500x2250.jpg',
    title: 'Welcome back',
    subtitle: 'How can we help you today?',
    favorites: {
      title: 'Favorites',
      subtitle:
        "Below are the items you've favorited. You can add more favorites by reviewing your past order details.",
      empty: "Looks like you haven't added any favorites yet",
    },
    recentOrders: {
      title: 'Recent Orders',
      subtitle:
        'Make changes to upcoming orders, reorder past orders, and add order ratings & comments',
      empty: "Looks like you don't have any recent orders",
    },
    recentItems: {
      title: 'Recent Items',
      subtitle:
        "Below is a list of the items you've ordered recently. Click to reorder or add to your favorites.",
      empty: "Looks like you haven't ordered any items yet",
    },
    profile: {
      title: 'Account',
      subtitle:
        'Below is the info we have on file for you. Make updates at any time.',
    },
    allergens: {
      title: 'Allergens',
      subtitle:
        "Select any allergens that you'd like for us to highlight on the menu when you're placing an order.",
    },
    addresses: {
      title: 'Addresses',
      subtitle:
        "Below are the last 5 addressed from which you've ordered. To add a new address, start a new order and enter a new address.",
    },
    giftCards: {
      title: 'Gift Cards',
      subtitle: 'A list of your active gift cards.',
      empty: "Looks like you hanen't purchased any gift cards yet.",
    },
    creditCards: {
      title: 'Credit Cards',
      subtitle:
        'A list of the credit cards you have on file with us. Change your default, delete a card, or add a new one.',
      empty:
        "Looks like you haven't saved any cards to your account yet. Use the link below to add a new card.",
    },
    houseAccounts: {
      title: 'House Accounts',
      subtitle:
        'You can checkout using any of the house accounts below subject to any location and service type restrictions listed with each house account.',
      empty:
        "Looks like your account isn't assocaited with any house accounts at this time.",
    },
    loyalty: {
      title: 'Loyalty',
      subtitle:
        'A summary of your active loyalty programs and any available discounts.',
    },
  },
  addresses: {
    title: 'Your Addresses',
    subtitle:
      "Below are all of the addresses from which you've ordered in the past. To add a new address, start a new order and enter a new address.",
  },
  resetPassword: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594425807_ice-cream-cone-spilled.jpg',
    title: 'Reset Your Password',
    subtitle:
      'Please enter a new password below. Must be at least 8 characters.',
    back: 'Start over without resetting your password',
  },
  signUp: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594425195_f6bbb0def5961ba79c8c.jpg',
    title: 'Create An Account',
    subtitle:
      'Order history, saved favorites & allergens, saved credit cards, and much more. Signing up takes two seconds - start reaping the benefits today!',
    back: 'Head back to starting an order',
  },
  notFound: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594650725_f5fcb07c62de0bedd619.jpg',
    title: 'Page Not Found',
    subtitle: "Sorry, but we couldn't find the page you're looking for.",
    back: 'Head back to our homepage and give it another try',
  },
  error: {
    background:
      'https://s3.amazonaws.com/betterboh/u/img/prod/2/1594425807_ice-cream-cone-spilled.jpg',
    title: 'Something Went Wrong',
    subtitle:
      "We're really sorry about this, but our development team has already been alerted about this issue. Please provide additional feedback below in order to help us resolve this issue ASAP.",
  },
}

export default contentConfig

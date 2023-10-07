const config = {
  // emails of customers to not change
  ignoreEmails: [],

  // old price ids that will be getting changed
  oldPriceIds: ['price_1NoheeAHwnLX6AVfhmmM94j7'],

  // the new prices we'll be going on to
  prices: {
    test: {
      year: '',
      month: 'price_1Nu0a5AHwnLX6AVfy3r0GJoC',
    },
    live: {
      year: '',
      month: '',
    },
  },

  // change this to false if you want to do a test run as it won't actually update anything
  updateSubscriptions: true,
}

export default config

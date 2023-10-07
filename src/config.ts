const config = {
  // emails of customers to not change
  ignoreEmails: [],

  // old price ids that will be getting changed
  oldPriceIds: [''],

  // the new prices we'll be going on to
  prices: {
    test: {
      year: '',
      month: '',
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

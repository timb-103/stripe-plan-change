# stripe-plan-change

Iterate all customers and change to a new plan.

### 1. Add a .env file
In the base of the project add a .env file with your STRIPE_SK (can be live or dev key):

```env
STRIPE_SK=your_stripe_sk
```

### 2. Add config

Add old plan ids (that we'll be migrating from), and new plan ids (migrate to) into the config file.

```js
{
  // emails of customers to not change  
  ignoreEmails: [],

  // old price ids that will be getting changed
  oldPriceIds: [],

  // the new prices we'll be going on to, test is for test moda, live is for live customers
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
```

* use at your own risk, would suggest testing with a dev stripe_sk first before trying in live mode.
* before doing a live run, you can toggle `updateSubscriptions` to false to make sure it looks good

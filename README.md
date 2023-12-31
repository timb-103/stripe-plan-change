# Stripe Plan Change

> Automatically migrate your Stripe customers from one plan to another with the Stripe API.

When it comes to increasing your pricing with Stripe, they don't allow you to edit an existing plan if it's already got active subscriptions on it. This means you have to manually go through each customer and move them to a new, higer priced plan - one by one.

This script does it for you automatically. It uses the Stripe API to iterate every customer, and migrate them from one plan to another. It also keeps important things like the quantity & interval the same.

**Please note:**

This is a simple script that I've used to migrate customers. It may need to be changed to your use case, and depending on yours it may or may not work. Please test thoroughly before using, I take no responsibility for any issues that may happen.

* use at your own risk, would suggest testing with a dev stripe_sk first before trying in live mode
* before doing a live run, you can toggle `updateSubscriptions` to false to make sure it looks correct

### 1. Install Dependencies
```sh
npm install
```

### 2. Add a .env file
In the base of the project add a .env file with your STRIPE_SK (can be live or dev key):

```env
STRIPE_SK=your_stripe_sk
```

### 3. Add config

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

### 4. Run
```sh
npm run dev
```



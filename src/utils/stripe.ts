import Stripe from 'stripe'

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SK, { apiVersion: '2019-11-05' })

// emails of customers to not change
const ignoreEmails = []

// old price ids if you want to only migrate people from certain plans
const oldPriceIds = []

// the new prices we'll be going on to
const prices = {
  test: {
    year: '',
    month: '',
  },
  live: {
    year: '',
    month: '',
  },
}

// simple counters
let processed = 0

export async function changePlans() {
  // iterate all subscriptions
  for await (const subscription of stripe.subscriptions.list({ limit: 1 })) {
    // get the subsriptions customer object
    const customer = await stripe.customers.retrieve(String(subscription.customer))

    // change plans
    await processPlanChange(subscription, customer)
  }
}

async function processPlanChange(subscription: Stripe.Subscription, customer: Stripe.Customer | Stripe.DeletedCustomer) {
  // make sure customer is active
  if (customer.deleted === true) {
    console.log('Customer is deleted:', customer.id)
    return
  }

  // make sure customer not on emails to skip
  const email = customer.email
  if (ignoreEmails.includes(email)) {
    console.log('Customer is on custom plan:', email)
    return
  }

  // check if they don't have new prices
  const index = subscription.items.data.findIndex((v: Stripe.SubscriptionItem) => oldPriceIds.includes(v.price.id))
  if (index < 0) {
    console.log('No item found with price id:', subscription.id)
    return
  }

  const item = subscription.items.data[index]
  const interval = item.price.recurring.interval
  const quantity = item.quantity
  const mode = subscription.livemode ? 'live' : 'test'

  console.log(`[${mode}] ${email} is on a ${interval} plan with ${quantity} social sets.\n`)

  // create the new item from the existing one
  const newItem: Stripe.SubscriptionUpdateParams.Item = {
    id: item.id,
    plan: prices[mode][interval],
    quantity,
  }

  // update the subscription
  await stripe.subscriptions.update(subscription.id, { items: [newItem], proration_behavior: 'none' })

  // increase processed counter
  processed += 1

  // log shit
  console.log('\nProcessed subscriptions:', processed, '\n')

  await new Promise((resolve) => setTimeout(resolve, 1000))
}

import Stripe from 'stripe';
import EnvironmentService from './environment.service'

const EURO_TO_CENT = 100

class StripeService {
	// app
	constructor() {
		
	}

	static charge({amount, currency, source, description}) {
		const stripe = new Stripe(EnvironmentService.get('STRIPE_PK'));
		return new Promise((resolve,reject) => {
			stripe.charges.create(
			  {
			    amount: StripeService.formatAmount(amount),
			    currency: currency,
			    source: source, //tok_visa for test
			    description: description,
			  },
			  (err, charge) => {
			    if (err) { reject(err) }
			    else {
			    	resolve(charge)
			    }
			  }
			);			
		})
	}

	static formatAmount(amount) {
		return amount * EURO_TO_CENT
	}
}

export default StripeService
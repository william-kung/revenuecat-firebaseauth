# revenuecat-firebaseauth
This function is used with RevenueCat's webhook, which would update Firebase Auth's user custom claims.  It will extract the expiration_at_ms field, if it is before now (i.e. expired), remove that custom claims attribution.  Else, refresh the custom claim attribution in Firebase Auth.

After deploying this function, copy the webhook url created (from cloud console), paste it to revenuecat's console.

For instruction of setting up webhook, see: https://www.revenuecat.com/docs/integrations/webhooks#registering-your-webhook-url

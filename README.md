# revenuecat-firebaseauth
This function is used with RevenueCat's webhook, which would update Firebase Auth's user custom claims.  It will extract the expiration_at_ms field, if it is before now (i.e. expired), remove that custom claims attribution.  Else, refresh the custom claim attribution in Firebase Auth.

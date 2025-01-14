const functions = require('firebase-functions');
const { getAuth } = require('firebase-admin/auth');
const admin = require('firebase-admin');
const logger = require("firebase-functions/logger");

admin.initializeApp();

exports.refreshFirebaseAuthCustomClaims = onRequest(async (req, res) => {
  try {
    const uid = req.body.event.app_user_id;
    const entitlements = req.body.event.entitlement_ids;
    const expiration = new Date(req.body.event.expiration_at_ms);
    logger.log(`Expiration: ${expiration}`);
    const now = new Date();
    logger.log(`Now: ${now}`);

    if (uid.startsWith("$RCAnonymous")) {
      logger.info(`Anoymous user ${uid} without email`);
      return;
    }


    if (expiration > now) {
      await getAuth()
        .setCustomUserClaims(uid, {revenueCatEntitlements: entitlements });
        logger.log(`${uid} Refreshed entitlments.`)
      res.sendStatus(200);
      return;
    } else {
      await getAuth()
        .setCustomUserClaims(uid, {revenueCatEntitlements: [] });
        logger.log(`${uid} Removed entitlments.`)
      res.sendStatus(200);
      return;
    }
  } catch (e) {
    res.sendStatus(500);
    logger.error(e);
  }
});

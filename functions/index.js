const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const serialize = obj => JSON.parse(JSON.stringify(obj));

exports.markSongAsViewed = functions.https.onCall(async ({ songId }) => {
  try {
    const db = admin.firestore();

    console.debug('Fetched DB: ', serialize(db));

    const res = await db
      .collection('songs')
      .doc(songId)
      .set({ hasBeenViewed: true }, { merge: true });

    console.debug('Updated song: ', serialize(res));

    return true;
  } catch (error) {
    console.error('Error: ', serialize(error));
    throw new functions.https.HttpsError('failed-precondition', 'Could not set the song as viewed');
  }
});

import models from '../models/index.js'
import db from '../config/connection.js';

export default async (
  modelName: 'User' | 'Book' | 'Post' | 'Comment' | 'Group',
  collectionName: string
) => {
  try {
    let modelExists = await models[modelName].db?.db
      ?.listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExists?.length) {
      const connection = await db();
      await connection.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};

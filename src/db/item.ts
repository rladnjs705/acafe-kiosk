import db from '$db/mongo'

const Categories = db.collection('category');
const Items = db.collection('item');

export {
  Categories,
  Items,
}
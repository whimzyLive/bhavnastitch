import * as _moment from 'moment';
const moment = _moment;
import { demo } from 'backend/bh-shared-services/src/index';
export async function putItem(event, ctx) {
  const date = moment().format('yyyy-mm-dd');
  console.log(process.env);
  console.log(demo);
  console.log(date);
  return { statusCode: 200, body: JSON.stringify({ message: 'Working' }) };
}

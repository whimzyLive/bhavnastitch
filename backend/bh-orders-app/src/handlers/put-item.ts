import * as _moment from 'moment';
const moment = _moment;
export async function putItem(event, ctx) {
  const date = moment().format('yyyy-mm-dd');
  console.log(date);
  return { statusCode: 200, body: JSON.stringify({ message: 'Working' }) };
}

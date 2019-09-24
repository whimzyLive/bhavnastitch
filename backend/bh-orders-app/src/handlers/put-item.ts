import * as _moment from 'moment';
const moment = _moment;
import { TestClass } from 'backend/bh-shared-services/src';
export async function putItem(event, ctx) {
  const date = moment().format('yyyy-mm-dd');

  const testInstance = new TestClass();
  testInstance.test();
  console.log(date);
  return { statusCode: 200, body: JSON.stringify({ message: 'Working' }) };
}

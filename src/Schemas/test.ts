import { Schema, model, connect } from 'mongoose';
const ObjectId = Schema.ObjectId;
interface Test {
  name?: string;
}
const Test = new Schema<Test>({
  name: String,
});
export const testModel = model('Test', Test);

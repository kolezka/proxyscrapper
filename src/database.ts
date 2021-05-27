import mongoose from 'mongoose';

export default mongoose.connect('mongodb://localhost/proxies', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
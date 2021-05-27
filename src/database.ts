import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export default mongoose.connect('mongodb://localhost/proxies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
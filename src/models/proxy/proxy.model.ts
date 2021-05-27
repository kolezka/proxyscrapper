import mongoose, { Document, Model } from 'mongoose';

export interface IProxy {
  status: boolean,
  proxy: string,
  created_at: Date,
  updated_at: Date,
}

// methods
export interface IProxyBaseDocument extends IProxy, Document {}

export interface IProxyPopulatedDocument extends IProxyBaseDocument {}

export interface IProxyModel extends Model<IProxyBaseDocument> {}

export const ProxySchema = new mongoose.Schema<IProxyBaseDocument, IProxyModel>(
  {
    status: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
    },
    proxy: {
      type: mongoose.Schema.Types.String,
      required: true, 
      unique: true,
    },
  }, 
  {
    timestamps: true,
  }
);

ProxySchema.index({
  proxy: 1,
})

export const ProxyModel = mongoose.model<IProxyBaseDocument, IProxyModel>('Proxy', ProxySchema);

import mongoose, { Document, Model } from 'mongoose';

export interface IProxy {
  status: boolean,
  proxy: string,
  createdAt: Date,
  updatedAt: Date,
}

// methods
export interface IProxyBaseDocument extends IProxy, Document {}

// export interface IProxyPopulatedDocument extends IProxyBaseDocument {}

export type IProxyPopulatedDocument = IProxyBaseDocument;

// export interface IProxyModel extends Model<IProxyBaseDocument> {}

export type IProxyModel = Model<IProxyBaseDocument>;

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

export type UserTraitsShared = typeof userTraitsShared;

// These are fields that exist in each table's schema
const userTraitsShared = {
  id: '',
  summary: '',
  createdAt: '',
  updatedAt: '',
  userTraitsId: '',
};

export enum DataProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  OPENAI = 'OPENAI',
}

export const getVisitorListSelector = state => state.visitor;
export const getAssociationIdSelector = state => state.auth.user._associationId;
export const createVisitorSelector = state => state.createVisitor;
export const ownerDetailsSelector = state => state.ownerDetails;
export const accessTokenSelector = state => state.auth.token.token;

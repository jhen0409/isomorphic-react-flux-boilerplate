'use strict';
export default function(actionContext, payload, done) {
  actionContext.dispatch('CHANGE_ROUTE', payload);
  done();
};
'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var redirectCtrlStub = {
  index: 'redirectCtrl.index',
  show: 'redirectCtrl.show',
  create: 'redirectCtrl.create',
  update: 'redirectCtrl.update',
  destroy: 'redirectCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  'delete': sinon.spy()
};

// require the index with our stubbed out modules
var redirectIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './redirect.controller': redirectCtrlStub
});

describe('Redirect API Router:', function () {

  it('should return an express router instance', function () {
    redirectIndex.should.equal(routerStub);
  });

  describe('GET /', function () {

    it('should route to redirect.controller.index', function () {
      routerStub.get.withArgs('/', 'redirectCtrl.index').should.have.been.calledOnce;
    });
  });

  describe('GET //:id', function () {

    it('should route to redirect.controller.show', function () {
      routerStub.get.withArgs('/:id', 'redirectCtrl.show').should.have.been.calledOnce;
    });
  });

  describe('POST /', function () {

    it('should route to redirect.controller.create', function () {
      routerStub.post.withArgs('/', 'redirectCtrl.create').should.have.been.calledOnce;
    });
  });

  describe('PUT //:id', function () {

    it('should route to redirect.controller.update', function () {
      routerStub.put.withArgs('/:id', 'redirectCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('PATCH //:id', function () {

    it('should route to redirect.controller.update', function () {
      routerStub.patch.withArgs('/:id', 'redirectCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('DELETE //:id', function () {

    it('should route to redirect.controller.destroy', function () {
      routerStub['delete'].withArgs('/:id', 'redirectCtrl.destroy').should.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map

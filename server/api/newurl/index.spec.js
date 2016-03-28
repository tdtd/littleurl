'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var newurlCtrlStub = {
  index: 'newurlCtrl.index',
  show: 'newurlCtrl.show',
  create: 'newurlCtrl.create',
  update: 'newurlCtrl.update',
  destroy: 'newurlCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  'delete': sinon.spy()
};

// require the index with our stubbed out modules
var newurlIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './newurl.controller': newurlCtrlStub
});

describe('Newurl API Router:', function () {

  it('should return an express router instance', function () {
    newurlIndex.should.equal(routerStub);
  });

  describe('GET /newurl', function () {

    it('should route to newurl.controller.index', function () {
      routerStub.get.withArgs('/', 'newurlCtrl.index').should.have.been.calledOnce;
    });
  });

  describe('GET /newurl/:id', function () {

    it('should route to newurl.controller.show', function () {
      routerStub.get.withArgs('/:id', 'newurlCtrl.show').should.have.been.calledOnce;
    });
  });

  describe('POST /newurl', function () {

    it('should route to newurl.controller.create', function () {
      routerStub.post.withArgs('/', 'newurlCtrl.create').should.have.been.calledOnce;
    });
  });

  describe('PUT /newurl/:id', function () {

    it('should route to newurl.controller.update', function () {
      routerStub.put.withArgs('/:id', 'newurlCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('PATCH /newurl/:id', function () {

    it('should route to newurl.controller.update', function () {
      routerStub.patch.withArgs('/:id', 'newurlCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('DELETE /newurl/:id', function () {

    it('should route to newurl.controller.destroy', function () {
      routerStub['delete'].withArgs('/:id', 'newurlCtrl.destroy').should.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map

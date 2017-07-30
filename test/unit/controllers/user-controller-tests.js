const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { getRequestMock, getResponseMock } = require('../mocks/req_res');
const data = {
    posts: {
        create() { },
        deleteById() { },
    },
    users: {
        create() { },
        findById() { },
        updateById() { },
        pullById() { },
    },
    categories: {
        findByName() { },
        create() { },
        updateById() { },
        pullById() { },
    },
};
const controller = require('../../../controllers/user-controller')(data);

describe('User controller tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = getRequestMock();
        res = getResponseMock();
    });

    describe('login tests', () => {
        it('Login should render login.pug template', () => {
            controller.login(req, res);
            expect(res.viewName).to.be.equal('login');
        });
        // eslint-disable-next-line max-len 
        it('Login should render login.pug template with isAutenticated property equal to false', () => {
            controller.login(req, res);
            const context = {
                'isAutenticated': false,
            };
            expect(res.context).to.be.deep.equal(context);
        });
    });

    describe('logout tests', () => {
        it('Logout should call logout of the request', () => {
            req.login({ username: 'someUsername' });
            controller.getLogout(req, res);
            expect(req.isAuthenticated()).to.be.equal(false);
        });

        it('Logout should redirect to /401 when not authenticated', () => {
            controller.getLogout(req, res);
            expect(res.redirectUrl).to.be.equal('/401');
        });
        it('Logout should redirect to /login when authenticated', () => {
            req.login({ username: 'pesho', password: '123456' });
            controller.getLogout(req, res);
            expect(res.redirectUrl).to.be.equal('/login');
        });
    });

    describe('signUp tests', () => {
        it('should call data users create', () => {
            const create = sinon.stub(data.users, 'create')
                .returns(Promise.resolve());
            controller.signUp(req, res);
            // eslint-disable-next-line no-unused-expressions
            expect(create).to.be.calledOnce;
            create.restore();
        });

        it('should render /login', (done) => {
            // eslint-disable-next-line no-unused-vars
            const create = sinon.stub(data.users, 'create')
                .returns(Promise.resolve());
            controller.signUp(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/login');
                    done();
                });
        });
    });
        describe('getDashboard tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect to /401 if user is not autenticated server', () => {
            controller.getDashboard(req, res);
            expect(res.redirectUrl).to.be.equal('/401');
        });

        // eslint-disable-next-line max-len
        it('should render dashboard template if user is autenticated', (done) => {
            req.login({ username: 'someUsername', password: '123456' });
            controller.getDashboard(req, res);
            expect(res.viewName).to.be.equal('dashboard');
            done();
        });
    });
            describe('getEditor tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect to /401 if user is not autenticated server', () => {
            controller.getEditor(req, res);
            expect(res.redirectUrl).to.be.equal('/401');
        });

        // eslint-disable-next-line max-len
        it('should render dashboard template if user is autenticated', (done) => {
            req.login({ username: 'someUsername', password: '123456' });
            controller.getEditor(req, res);
            expect(res.viewName).to.be.equal('editor');
            done();
        });
                describe('getArticles tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect to /401 if user is not autenticated server', () => {
            controller.getArticles(req, res);
            expect(res.redirectUrl).to.be.equal('/401');
        });

        // eslint-disable-next-line max-len
        it('should render dashboard template if user is autenticated', (done) => {
            req.login({ username: 'someUsername', password: '123456' });
            controller.getArticles(req, res);
            expect(res.viewName).to.be.equal('articles');
            done();
        });
    });
    });
});

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { getRequestMock, getResponseMock } = require('../mocks/req_res');
const data = {
    posts: {
        getSome() {
            return Promise.resolve();
        },
        findById() { },
        filterBy({ title: seacrhTerm }) {
            return Promise.resolve();
        },
    },
    users: {
        findByUsername() {
            return Promise.resolve();
        },
    },
    categories: {
        getAll() {
            return Promise.resolve();
        },
        findById() {
            return Promise.resolve();
        },
    },
};
const controller = require('../../../controllers/post.controller')(data);

describe('Post controller tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = getRequestMock();
        res = getResponseMock();
    });
    describe('getHome tests', () => {
        const posts = {
            bulgaria: 'bulgaria',
            germany: 'germany',
        };

        let getAllStub;
        let getSomeStub;
        beforeEach(() => {
            getSomeStub = sinon.stub(data.posts, 'getSome');
            getSomeStub.returns(Promise.resolve(posts));

            getAllStub = sinon.stub(data.categories, 'getAll');
            getAllStub.returns(Promise.resolve(posts));
        });

        afterEach(() => {
            getSomeStub.restore();
            getAllStub.restore();
        });

        it('getHome should call data.categories.getSome', () => {
            controller.getHome(req, res);
            // eslint-disable-next-line no-unused-expressions
            expect(getSomeStub).to.have.been.calledOnce;
        });
    });
    describe('getLogin tests', () => {
        it('getAbout to render about.pug template', () => {
            controller.getLogin(req, res);
            expect(res.viewName).to.be.equal('login');
        });
    });
    describe('getAbouttests', () => {
        it('getAbout to render about.pug template', () => {
            controller.getAbout(req, res);
            expect(res.viewName).to.be.equal('about');
        });
    });

    describe('getContact tests', () => {
        it('getContact to render contact.pug template', () => {
            controller.getContact(req, res);
            expect(res.viewName).to.be.equal('contact');
        });
    });

    describe('getPostById tests', () => {
        // eslint-disable-next-line max-len
        it('getPostById to redirect to /404 when called with invalid id', () => {
            req.params.id = '12345678912345678912345';
            controller.getPostById(req, res);
            expect(res.redirectUrl).to.be.equal('/404');
        });

        it('should redirect to /404 when there is not existing post', () => {
            req.params.id = '123456789123456789123456';
            const findByIdStub = sinon.stub(data.posts, 'findById');
            findByIdStub.returns(Promise.resolve());

            controller.getPostById(req, res);
            expect(res.redirectUrl).to.be.equal('');
            findByIdStub.restore();
        });

        it('data posts getSome should be called with findById', () => {
            const expected = {
                id: '123456789123456789123456',
                post: 'Random',
                categories: 'Random2',
            };

            req.params.id = expected.id;

            const findByIdStub = sinon.stub(data.posts, 'findById');
            findByIdStub.returns(Promise.resolve(req.params.id));
            controller.getPostById(req, res);
            // eslint-disable-next-line no-unused-expressions
            expect(findByIdStub).to.be.calledOnce;
            // eslint-disable-next-line no-unused-expressions
            findByIdStub.restore();
        });
    });
    describe('getCategoryById tests', () => {
        // eslint-disable-next-line max-len
        it('getPostById to redirect to /404 when called with invalid id', () => {
            req.params.id = '1234567';
            controller.getCategoryById(req, res);
            expect(res.redirectUrl).to.be.equal('/404');
        });
        // eslint-disable-next-line max-len
        it('should redirect to /404 when there is not existing category', () => {
            req.params.id = '123456789123456789123456';
            const findByIdStub = sinon.stub(data.categories, 'findById');
            findByIdStub.returns(Promise.resolve());

            controller.getCategoryById(req, res);
            expect(res.redirectUrl).to.be.equal('');
            findByIdStub.restore();
        });

        it('data posts getSome should be called with findById', () => {
            const expected = {
                id: '123456789123456789123456',
                post: 'Random',
                categories: 'Random2',
            };

            req.params.id = expected.id;

            const categories = [{
                id: '123456789123456789123456',
                title: 'Something',
            },
            ];

            const findByIdStub = sinon.stub(data.categories, 'findById')
                .returns(Promise.resolve(req.params.id));

            const StubGetAll = sinon.stub(data.categories, 'getAll')
                .returns(Promise.resolve(categories));
            controller.getCategoryById(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(StubGetAll).to.be.calledOnce;
                    // eslint-disable-next-line no-unused-expressions
                    expect(findByIdStub).to.be.calledOnce;
                    StubGetAll.restore();
                    findByIdStub.restore();
                });
        });
    });
    describe('getAuthor tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect when there is not author found', () => {
            const findByUsernameStub = sinon.stub(data.users, 'findByUsername');
            findByUsernameStub.returns(Promise.resolve());

            controller.getAuthorByName(req, res);
            expect(res.redirectUrl).to.be.equal('');
            findByUsernameStub.restore();
        });

        it('data users findByUsername should be called with getAll', () => {
            const author = [{
                username: 'Pesho',
            },
            ];
            const findByUsernameStub = sinon.stub(data.users, 'findByUsername');
            findByUsernameStub.returns(Promise.resolve(author));

            const StubGet = sinon.stub(data.categories, 'getAll')
                .returns(Promise.resolve());
            controller.getAuthorByName(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(StubGet).to.be.calledOnce;
                    // eslint-disable-next-line no-unused-expressions
                    expect(findByUsernameStub).to.be.calledOnce;
                    StubGet.restore();
                    findByUsernameStub.restore();
                });

            findByUsernameStub.restore();
        });
    });

    describe('getCategories tests', () => {
        // eslint-disable-next-line max-len
        it('getAll to have been called', () => {
            const cats = {
                category: 'random',
            };

            const getStub = sinon.stub(data.categories, 'getAll')
                .returns(Promise.resolve(cats));

            controller.getCategories(req, res);
            // eslint-disable-next-line no-unused-expressions
            expect(getStub).to.be.calledOnce;
            getStub.restore();
        });
    });

    describe('getTag tests', () => {
        // eslint-disable-next-line max-len
        it('should redirect when there is not author found', () => {
            controller.getTag(req, res);
            expect(res.redirectUrl).to.be.equal('');
        });
        it('data categories getAll should be called', () => {
            req.params.tag = 'Some tag';

            const filterByStub = sinon.stub(data.posts, 'filterBy')
                .returns(Promise.resolve(req.params.tag));

            const getAllCategoriesStub = sinon
                .stub(data.categories, 'getAll')
                .returns(Promise.resolve());

            controller.getTag(req, res)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getAllCategoriesStub).to.be.calledOnce;
                    // eslint-disable-next-line no-unused-expressions
                    expect(filterByStub).to.be.calledOnce;

                    filterByStub.restore();
                });
        });
    });
});

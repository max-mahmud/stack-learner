const articleService = require('../../../lib/article');
const query = require('../../../utils/query');
const defaults = require('../../../config/defaults');

const create = async (req, res, next) => {
    const { title, body, cover, status } = req.body;

    try {
        const article = await articleService.create({
            title,
            body,
            cover,
            status,
            author: req.user,
        });

        const response = {
            code: 201,
            message: 'Article Created Successfully',
            data: { ...article },
            links: {
                self: `/articles/${article.id}`,
                author: `/articles/${article.id}/author`,
                comments: `/articles/${article.id}/comments`,
            },
        };

        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};

const findAllItems = async (req, res, next) => {
    const page = req.query.page || defaults.page;
    const limit = req.query.limit || defaults.limit;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sortBy || defaults.sortBy;
    const search = req.query.search || defaults.search;

    try {
        // data
        const articles = await articleService.findAllItems({
            page,
            limit,
            sortType,
            sortBy,
            search,
        });

        const data = query.getTransformedItems({
            items: articles,
            selection: ['id', 'title', 'cover', 'author', 'updatedAt', 'createdAt'],
            path: '/articles',
        });

        // pagination
        const totalItems = await articleService.count({ search });
        const pagination = query.getPagination({ totalItems, limit, page });

        // HATEOAS Links
        const links = query.getHATEOASForAllItems({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page,
        });

        res.status(200).json({
            data,
            pagination,
            links,
        });
    } catch (e) {
        next(e);
    }
};

const findSingleItem = async (req, res, next) => {
    const id = req.params.id;
    const expand = req.query.expand || '';

    try {
        const article = await articleService.findSingleItem({ id, expand });
        const response = {
            data: article,
            links: {
                self: `/articles/${article.id}`,
                author: `/articles/${article.id}/author`,
                comments: `/articles/${article.id}/comments`,
            },
        };

        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
};

const removeItem = async (req, res, next) => {
    const { id } = req.params;

    try {
        await articleService.removeItem(id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
};

const updateItem = async (req, res, next) => {
    const { id } = req.params;
    const cover = req.body.cover || '';
    const status = req.body.status || 'draft';

    try {
        const { article, code } = await articleService.updateOrCreate(id, {
            title: req.body.title,
            body: req.body.body,
            author: req.user,
            cover,
            status,
        });

        const response = {
            code,
            message:
                code === 200
                    ? 'Article updated successfully'
                    : 'Article created successfully',
            data: article,
            links: {
                self: `/articles/${article.id}`,
            },
        };

        res.status(code).json(response);
    } catch (e) {
        next(e);
    }
};

const updateItemPatch = async (req, res, next) => {
    const { id } = req.params;

    try {
        const article = await articleService.updateProperties(id, req.body);

        const response = {
            code: 200,
            message: 'Article updated successfully',
            data: article,
            links: {
                self: `/articles/${article.id}`,
            },
        };

        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
};

module.exports = { create, findAllItems, findSingleItem, removeItem, updateItem, updateItemPatch };
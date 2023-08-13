const { Router } = require('express');
const {NamespaceController} = require('../../http/controllers/support/namespace.controller');
const namespaceRouter = Router();

namespaceRouter.post("/add", NamespaceController.addNamespace);
namespaceRouter.get("/list", NamespaceController.getAllNamespaces);

module.exports = {
    namespaceRouter
}
import express from "express";

import { widgets } from "shared-commonjs";
import shared from "shared-commonjs";

const router = express.Router();

router.get("/", function(req, res) {
    const namedImportWidget = new widgets.JsWidget("NamedImport Widget");
    const defaultImportWidget = new shared.default.JsWidget("Default Imported Widget");
    res.status(200).json([
        namedImportWidget,
        defaultImportWidget
    ]);
});

export default router;

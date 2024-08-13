const { JsCompatTsWidget } = require("./ts-widget");

class JsWidget extends JsCompatTsWidget {
    name;

    /**
     *
     * @param name {TsWidgetName}
     */
    constructor(name) {
        super();
        this.name = name;
    }
}

module.exports = JsWidget;
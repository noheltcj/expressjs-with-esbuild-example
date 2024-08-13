export type TsWidgetName = string

export interface TsWidget {
    type: string
    name: TsWidgetName
}

export abstract class JsCompatTsWidget implements TsWidget {
    type = "widget";

    abstract name: TsWidgetName;
}

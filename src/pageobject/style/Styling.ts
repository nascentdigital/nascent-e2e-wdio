// types
export type StyledCssProps = {

    "display": string;
    "position": string;
    "top": string;
    "bottom": string;
    "left": string;
    "right": string;
    "padding-top": string;
    "padding-bottom": string;
    "padding-left": string;
    "padding-right": string;
    "margin-top": string;
    "margin-bottom": string;
    "margin-left": string;
    "margin-right": string;

    "flex": string;

    "font-family": string;
    "font-size": string;
    "font-weight": string | number;
    "font-stretch": string;
    "font-style": string;
    "line-height": string;
    "letter-spacing": string;

    "color": string;
    "background-color": string;
};

export type Styling = Partial<StyledCssProps>;

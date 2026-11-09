'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './theme.css';
/** Sets the theme's CSS variables for the whole admin (added by the plugin as a provider). */
export function ThemeStyles({ css, children }) {
    return (_jsxs(_Fragment, { children: [_jsx("style", { dangerouslySetInnerHTML: { __html: css } }), children] }));
}
/** Login-screen logo: the brand image, or the name as a wordmark with an accent dot. */
export function Logo({ name, src }) {
    if (src)
        return _jsx("img", { className: "zt-logo", src: src, alt: name });
    return (_jsxs("span", { className: "zt-wordmark", children: [name, _jsx("span", { className: "zt-dot", children: "." })] }));
}
/** Nav icon: the brand mark, or a monogram tile in the accent. */
export function Icon({ name, src }) {
    if (src)
        return _jsx("img", { className: "zt-icon", src: src, alt: "" });
    return (_jsx("span", { className: "zt-monogram", "aria-hidden": "true", children: name.charAt(0) }));
}

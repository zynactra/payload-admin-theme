import type { Plugin } from 'payload';
export type ThemeOptions = {
    /** Brand name: the default wordmark on the login screen and the logo's alt text. */
    name?: string;
    /** Image URL for the login-screen logo. Without it, `name` is shown as a wordmark. */
    logo?: string;
    /** Image URL for the small square icon at the top of the nav. Without it, a monogram tile is shown. */
    icon?: string;
    colors?: {
        /** Light-mode background. The admin's whole gray scale runs from `canvas` to `ink`. */
        canvas?: string;
        /** Darkest text colour. */
        ink?: string;
        /** Primary buttons, wordmark dot, monogram and login glow: a CSS colour or a CSS gradient. */
        accent?: string;
        /** Text colour on `accent`. */
        onAccent?: string;
    };
    /** CSS font-family for the whole admin. Any font other than the default must be loaded by the project. */
    font?: string;
    /** Corner radius of inputs (s), cards (m), large panels (l) and primary/secondary buttons. */
    radius?: {
        s?: string;
        m?: string;
        l?: string;
        button?: string;
    };
    /** Lock the admin to light or dark mode, or let each user choose ('all'). */
    mode?: 'all' | 'dark' | 'light';
};
export declare const ZYNACTRA: {
    readonly name: "Zynactra";
    readonly colors: {
        readonly canvas: "#FFFFFF";
        readonly ink: "#0A0A0A";
        readonly accent: "linear-gradient(90deg, #C351C6 0%, #D14EAE 22.12%, #DD4C9B 37.5%, #E64A89 55.77%, #EB4B80 67.79%, #EB5B69 80.29%, #EA6759 87.98%, #EA7444 100%)";
        readonly onAccent: "#FFFFFF";
    };
    readonly font: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    readonly radius: {
        readonly s: "8px";
        readonly m: "10px";
        readonly l: "16px";
        readonly button: "999px";
    };
};
/** The CSS variables the theme stylesheet reads, for the given options (defaults: Zynactra). */
export declare function themeCSS(options?: ThemeOptions): string;
/** Payload plugin: applies the theme to the admin panel. */
export declare const adminTheme: (options?: ThemeOptions) => Plugin;

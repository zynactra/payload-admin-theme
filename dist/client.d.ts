import type { ReactNode } from 'react';
import './theme.css';
/** Sets the theme's CSS variables for the whole admin (added by the plugin as a provider). */
export declare function ThemeStyles({ css, children }: {
    css: string;
    children?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
type BrandProps = {
    name: string;
    src?: string;
};
/** Login-screen logo: the brand image, or the name as a wordmark with an accent dot. */
export declare function Logo({ name, src }: BrandProps): import("react/jsx-runtime").JSX.Element;
/** Nav icon: the brand mark, or a monogram tile in the accent. */
export declare function Icon({ name, src }: BrandProps): import("react/jsx-runtime").JSX.Element;
export {};

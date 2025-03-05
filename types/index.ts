import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface User {
  login: string;
  avatar_url: string;
  name?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  html_url?: string;
  blog?: string;
  company?: string;
  location?: string;
}

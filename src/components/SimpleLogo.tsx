import { css } from "@styles/css";
import { LogoProps } from "@/components/Logo";

/**
 * Simplified Logo component with the ability to change the color.
 *
 * @param {string} props.className - Class which determines the color of the logo.
 * @returns {JSX.Element} The rendered SimpleLogo component.
 */
export function SimpleLogo({
  className = css({ color: "text.100" }),
}: LogoProps) {
  return (
    <svg
      width="50"
      height="16"
      viewBox="0 0 50 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.01754 15.9989H0V0.00115543H7.01754L7.09292 0.000737752C8.2125 -0.00773558 15.8869 -0.0658255 15.8869 8C15.8869 16.0658 8.2125 16.0077 7.09293 15.9993L7.05232 15.999L7.01754 15.9989ZM7.01754 3.3889H4.48343V12.6111H7.01754C7.01754 12.6111 11.501 12.8934 11.501 8C11.501 3.10659 7.01754 3.3889 7.01754 3.3889Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.7175 15.9989H18.1232V0.00115725H25.1462L25.365 0.000625159C27.3603 -0.00646251 31.9688 -0.02283 31.9688 4.23584C31.9688 6.87076 29.7271 7.71769 29.7271 7.71769C29.7271 7.71769 32.7485 8.37642 32.7485 11.576C32.7485 16.0285 27.4776 16.0061 25.8745 15.9993L25.8724 15.9993L25.7175 15.9989ZM25.1462 3.01249C25.1462 3.01249 27.5828 2.91838 27.5828 4.80047C27.5828 6.68255 25.1462 6.5811 25.1462 6.5811H22.5146V3.01249H25.1462ZM25.9259 9.41157C25.9259 9.41157 28.3626 9.31746 28.3626 11.1995C28.3626 13.0816 25.9259 12.9875 25.9259 12.9875H22.5146V9.41157H25.9259Z"
        fill="currentColor"
      />
      <path
        d="M45.614 15.9989V9.78798H39.4737V15.9989H35.1852V0.00115725H39.4737V6.21203H45.614V0.00115725H50V15.9989H45.614Z"
        fill="currentColor"
      />
    </svg>
  );
}

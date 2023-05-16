type Props = {
  className?: string | undefined;
  color?: string | undefined;
  viewBox?: string | undefined;
  size?: number | undefined;
};

const SearchIcon: React.FC<Props> = ({
  className,
  color = "#9F9F9F",
  viewBox = "0 0 20 20",
  size = "20",
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.1666 9.58333C14.1666 12.1146 12.1146 14.1667 9.58331 14.1667C7.05201 14.1667 4.99998 12.1146 4.99998 9.58333C4.99998 7.05202 7.05201 4.99999 9.58331 4.99999C12.1146 4.99999 14.1666 7.05202 14.1666 9.58333ZM13.3742 14.5528C12.3227 15.3561 11.0088 15.8333 9.58331 15.8333C6.13153 15.8333 3.33331 13.0351 3.33331 9.58333C3.33331 6.13155 6.13153 3.33333 9.58331 3.33333C13.0351 3.33333 15.8333 6.13155 15.8333 9.58333C15.8333 11.0088 15.3561 12.3228 14.5528 13.3743L17.214 16.0355C17.5395 16.361 17.5395 16.8886 17.214 17.214C16.8886 17.5395 16.3609 17.5395 16.0355 17.214L13.3742 14.5528Z"
        fill={color}
      />
    </svg>
  );
};

export default SearchIcon;

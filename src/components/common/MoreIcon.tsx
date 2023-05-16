type Props = {
  ariaLabel: string;
  color?: string | undefined;
  viewBox?: string | undefined;
  size?: number | undefined;
};

const MoreIcon: React.FC<Props> = ({
  ariaLabel,
  color = "#9F9F9F",
  viewBox = "0 0 20 20",
  size = "20",
}) => {
  return (
    <svg
      aria-label={ariaLabel}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.66675 10C6.66675 9.30964 6.1071 8.75 5.41675 8.75C4.72639 8.75 4.16675 9.30964 4.16675 10C4.16675 10.6904 4.72639 11.25 5.41675 11.25C6.1071 11.25 6.66675 10.6904 6.66675 10ZM11.2501 10C11.2501 9.30964 10.6904 8.75 10.0001 8.75C9.30973 8.75 8.75008 9.30964 8.75008 10C8.75008 10.6904 9.30973 11.25 10.0001 11.25C10.6904 11.25 11.2501 10.6904 11.2501 10ZM14.5834 8.75C15.2738 8.75 15.8334 9.30964 15.8334 10C15.8334 10.6904 15.2738 11.25 14.5834 11.25C13.8931 11.25 13.3334 10.6904 13.3334 10C13.3334 9.30964 13.8931 8.75 14.5834 8.75Z"
        fill={color}
      />
    </svg>
  );
};

export default MoreIcon;

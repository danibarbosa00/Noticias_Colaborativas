import "./button.css";

export const Button = ({ value, onClick, className }) => {
  return (
    <button className={className} value={value} onClick={onClick}>
      <p>{value}</p>
    </button>
  );
};

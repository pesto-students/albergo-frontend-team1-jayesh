const Rupee = () => <span>&#8377;</span>;

const MaterialIcon = ({ iconName }: { iconName: string }) => {
  return <span className="material-symbols-outlined">{iconName}</span>;
};

export { Rupee, MaterialIcon };

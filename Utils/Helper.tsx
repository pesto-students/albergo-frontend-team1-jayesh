export interface ITokenProp {
  token: string | null;
}

const MaterialIcon = (iconName: string) => {
  return <span className="material-symbols-outlined">{iconName}</span>;
};

export { MaterialIcon };

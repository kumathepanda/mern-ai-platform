type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.label}
      className="w-full px-4 py-3 bg-transparent border-2 border-white/30 rounded-xl text-white text-lg placeholder-white focus:outline-none focus:border-purple-500 transition-all duration-300"
    />
  );
};

export default CustomizedInput;

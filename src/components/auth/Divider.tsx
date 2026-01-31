interface DividerProps {
  text: string;
}

function Divider({ text }: DividerProps) {
  return (
    <div className="relative flex items-center my-6">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="flex-shrink mx-4 text-sm text-gray-500">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}

export default Divider;

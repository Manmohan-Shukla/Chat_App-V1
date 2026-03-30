type ButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
  text?: string;
};

export function Button({ onClick, children, text }: ButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-white text-gray-900 w-full mx-2 py-2 px-6 ibm-plex-mono-medium tracking-widest rounded-lg"
      >
        {text || children}
      </button>
    </div>
  );
}
const LineBtn = ({ text, bgColor, active, onLineBTNClick }) => {
  return (
    <div className="flex justify-center">
      <button
        className={`border-2 rounded-md text-2xl font-semibold transition-transform duration-300 ease-in-out transform ${
          active ? 'scale-105 shadow-lg' : ''
        }`}
        style={{
          backgroundColor: bgColor,
          color: active ? '#000000' : '#ffffff',
        }}
        onClick={onLineBTNClick}
      >
        {text}
      </button>
    </div>
  );
};

export default LineBtn;
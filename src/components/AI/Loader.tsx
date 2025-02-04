const Loader = () => {
  return (
    <div
      className="w-[7px] aspect-square rounded-full bg-black before:content-[''] before:absolute before:w-[7px] before:aspect-square before:rounded-full before:bg-black/20 before:-left-5 before:top-0 after:content-[''] after:absolute after:w-[7px] after:aspect-square after:rounded-full after:bg-black/20 after:left-5 after:top-0"
      style={{
        animation: "l5 1s infinite linear alternate",
      }}
    >
      <style>
        {`
          @keyframes l5 {
            0%  {box-shadow: 20px 0 #000, -20px 0 #0002; background: #000;}
            33% {box-shadow: 20px 0 #000, -20px 0 #0002; background: #0002;}
            66% {box-shadow: 20px 0 #0002, -20px 0 #000; background: #0002;}
            100% {box-shadow: 20px 0 #0002, -20px 0 #000; background: #000;}
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
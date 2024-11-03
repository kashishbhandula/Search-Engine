function Wallpaper({ children }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
      style={{ backgroundImage: "url('/wallpaper.jpg')" }}
    >
      {children}
    </div>
  );
}

export default Wallpaper;

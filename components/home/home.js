import Wallpaper from "./wallpaper";
import SearchBarWrapper from "./searchBarWrapper";
import { memo } from "react";

function Home() {
  return (
    <Wallpaper>
      <div className="text-white font-bold text-[50px] text-center mt-10">Infinisearch</div>
      <div className="mt-6">
        <SearchBarWrapper />
      </div>
    </Wallpaper>
  );
}

export default memo(Home);

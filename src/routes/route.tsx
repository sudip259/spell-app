import SpellList from "pages/SpellList";
import WishList from "pages/WishList";
import { Route, Routes } from "react-router-dom";

export default function RouterView() {
  return (
    <Routes>
      <Route path="/" element={<SpellList />} />
      <Route path="/home" element={<SpellList />} />
      <Route path="/spell-list" element={<SpellList />} />
      <Route path="/watch-later" element={<WishList />} />
    </Routes>
  );
}

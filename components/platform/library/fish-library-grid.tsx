import { fishSpecies } from "../../../lib/constants";
import FishLibraryCard from "./fish-library-card";

export default function FishLibraryGrid() {
  return (
    <div className="grid grid-3">
      {fishSpecies.map((fish) => (
        <FishLibraryCard key={fish.id} fish={fish} />
      ))}
    </div>
  );
}

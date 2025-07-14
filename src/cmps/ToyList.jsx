import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys }) {
  console.log(toys,"toys in ToyList");
  
  return (
    <ul className="toy-list">
      {toys.map(toy => (
        <ToyPreview key={toy._id} toy={toy} />
      ))}
    </ul>
  )
}
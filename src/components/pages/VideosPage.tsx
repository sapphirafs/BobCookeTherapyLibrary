// import { useState } from "react";
// import { videos } from "../../data/videos";
// import {VideoCard} from "../VideoCard";
// import {SearchBar} from "../../components/SearchBar";
// import {Pagination} from "../../components/Pagination";

// const ITEMS_PER_PAGE = 12;

// const VideosPage = () => {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   const filtered = videos.filter(v =>
//     v.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const start = (page - 1) * ITEMS_PER_PAGE;
//   const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

//   return (
//     <div className="page">
//       <h1>All Videos</h1>

//       <SearchBar value={search} onChange={setSearch} />

//       <div className="grid">
//         {paginated.map(video => (
//           <VideoCard key={video.id} video={video} />
//         ))}
//       </div>

//       <Pagination
//         current={page}
//         total={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
//         onChange={setPage}
//       />
//     </div>
//   );
// };

// export default VideosPage;

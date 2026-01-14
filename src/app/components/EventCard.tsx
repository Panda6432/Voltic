import Image from "next/image";

type EventCardProps = {
  title: string;
  category: string;
  event_date: string;
  location: string;
  image_url: string;
  status: "upcoming" | "live" | "past";
};

export default function EventCard({
  title,
  category,
  event_date,
  location,
  image_url,
  status,
}: EventCardProps) {
  return (
    <div className="group relative w-[350px] h-[450px] md:w-[420px] md:h-[600px] border border-white/10 overflow-hidden cursor-pointer bg-neutral-900 flex-shrink-0">
      
      {/* IMAGE */}
      <Image
        src={image_url}
        alt={title}
        fill
        className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        
        {/* CATEGORY + STATUS ROW */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-orbitron text-xs font-bold bg-[#FF3131] text-white px-3 py-1 uppercase tracking-wider">
            {category}
          </span>

          {status !== "past" && (
            <span
              className={`font-orbitron text-xs px-3 py-1 uppercase tracking-wider border ${
                status === "live"
                  ? "border-red-500 text-red-400"
                  : "border-yellow-400 text-yellow-300"
              }`}
            >
              {status}
            </span>
          )}
        </div>

        {/* DATE + LOCATION */}
        <p className="font-orbitron text-gray-400 text-sm tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {new Date(event_date).toDateString()} • {location}
        </p>

        {/* TITLE */}
        <h3 className="font-orbitron font-black text-2xl md:text-4xl leading-tight uppercase mb-4 group-hover:text-[#FF3131] transition-colors duration-300">
          {title}
        </h3>

        {/* ARROW */}
        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

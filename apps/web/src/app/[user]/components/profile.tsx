import Image from "next/image";

interface ProfileProps {
  name: string;
  title: string;
  image: string;
}

export default function Profile({ name, title, image }: ProfileProps) {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
      <div className="relative w-32 h-32 lg:w-40 lg:h-40">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="rounded-full object-cover border-4 border-blue-500 shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          {name}
        </h1>
        <p className="text-xl lg:text-lg text-gray-300">{title}</p>
      </div>
    </div>
  );
}

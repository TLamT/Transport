import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 bg-[url('./image/img.jpg')] bg-cover">
      
      <h1 className="text-4xl font-bold mb-6 text-gray-800">歡迎來到交通應用</h1>
      <div className="flex justify-center gap-10 text-2xl">
        <Link
          className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-red-600"
          href="/MTR"
        >
          MTR
        </Link>
        <Link
          className="transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-red-600"
          href="./KMB"
        >
          KMB
        </Link>
      </div>
    </div>
  );
}
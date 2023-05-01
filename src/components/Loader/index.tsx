import { AiOutlineLoading3Quarters } from "react-icons/ai";
import BarLoader from "react-spinners/BarLoader";

export default function Loader() {
  return (
    <div className='absolute inset-0 z-10 flex h-screen items-center justify-center bg-black/[0.3] backdrop-blur-sm'>
      {/* <AiOutlineLoading3Quarters size={60} className='animate-spin' /> */}
      <BarLoader color="#36d7b7" />
    </div>
  );
}

import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center mt-20 items-center h-[50vh]">
      <Loader className="animate-spin size-10 text-primary" />
    </div>
  );
};

export default Loading;

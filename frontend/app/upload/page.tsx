import Sidebar from "../../components/Sidebar";
import UploadBox from "../../components/UploadBox";

export default function UploadPage() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-10">
          Upload PDF
        </h1>

        <UploadBox />
      </div>

    </div>
  );
}
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { ImageUp, Send, X } from "lucide-react";
import { toast } from "sonner";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4  w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-accent"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary/80
              flex items-center justify-center"
              type="button"
            >
              <X strokeWidth={2.5} className="size-3 text-accent" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            spellCheck="false"
            className="w-full h-full bg-accent/40 text-sm sm:text-lg font-sans font-semibold text-primary placeholder:sm:text-lg placeholder:font-sans placeholder:text-sm placeholder:font-semibold placeholder:text-primary/40 border-none focus:outline-none rounded-lg p-2 sm:p-3"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex sm:px-4  sm:py-2 px-3 py-1 items-center justify-center rounded-full 
                     ${imagePreview ? "text-emerald-500" : "text-primary/90"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageUp className="" size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="sm:px-4 sm:py-2 px-3 py-1 rounded-full"
          disabled={!text.trim() && !imagePreview}
        >
          <Send
            className={`${
              !text.trim() && !imagePreview ? "text-accent" : "text-primary/90"
            }`}
            size={22}
          />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;

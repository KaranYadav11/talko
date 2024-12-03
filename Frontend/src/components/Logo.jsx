import { MessageCircle } from "lucide-react";

const ImagePattern = () => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-background p-12">
      <div className="max-w-md text-center flex items-center justify-center flex-col">
        <MessageCircle className="text-primary size-[380px]" />
        <h2 className="text-4xl font-heading font-semibold text-primary mb-4">
          Talko
        </h2>
        <p className="font-main text-primary/80 text-sm">
          {
            "Connect with your friends, share moments with them, stay in touch with your loved ones"
          }
        </p>
      </div>
    </div>
  );
};

export default ImagePattern;

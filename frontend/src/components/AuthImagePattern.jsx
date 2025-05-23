import Chat from "daisyui/components/chat";
import { MessageCircleCodeIcon } from "lucide-react";
import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-1 align-middle justify-center">
      <MessageCircleCodeIcon className="size-60 mx-auto" />
      <div>
        <h3 className="text-center text-3xl my-4">{title}</h3>
        <h5 className="text-center text-xl">{subtitle}</h5>
      </div>
    </div>
  );
};

export default AuthImagePattern;

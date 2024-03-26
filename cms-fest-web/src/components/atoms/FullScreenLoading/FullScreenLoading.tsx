import React from 'react';

export const FullScreenLoading: React.FC = () => {
  return (
    <div className="fixed z-20 w-screen h-screen flex flex-col justify-center items-center bg-black/[.6]">
    {/* <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-black/[.06]"> */}
      <div className="mt-[-10%]">
        <div className="flex w-[400px] justify-center items-center mt-8">
          <div className="w-[200px] h-[200px] animate-[pulse_2.8s_ease-in-out_infinite]">
            <img
              className={`w-fit h-fit object-cover`}
              src={`/assets/images/logo.png`}
              width={150}
              height={150}
              alt="image"
            />
          </div>
        </div>

        <div className="flex w-[400px] justify-center items-center mt-[40px]">
          <div className="h-[15px] w-[15px] mx-[16px] bgc-primary-600 animate-[bounce_0.8s_ease-in-out_infinite] rounded-full opacity-1" />
          <div className="h-[15px] w-[15px] mx-[16px] bgc-primary-600 animate-[bounce_0.8s_ease-in-out_infinite] rounded-full opacity-1" />
          <div className="h-[15px] w-[15px] mx-[16px] bgc-primary-600 animate-[bounce_0.8s_ease-in-out_infinite] rounded-full opacity-1" />
          <div className="h-[15px] w-[15px] mx-[16px] bgc-primary-600 animate-[bounce_0.8s_ease-in-out_infinite] rounded-full opacity-1" />
          <div className="h-[15px] w-[15px] mx-[16px] bgc-primary-600 animate-[bounce_0.8s_ease-in-out_infinite] rounded-full opacity-1" />
          <div className="h-[15px] w-[15px] mx-[16px] bgc-primary-600 animate-[bounce_0.8s_ease-in-out_infinite] rounded-full opacity-1" />
        </div>
      </div>
    </div>
  );
};

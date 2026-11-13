import React from "react"
import { Wifi } from "lucide-react"

export const PhoneStatusBar: React.FC = () => {
  return (
    <div className="w-full bg-[#091527] px-5 pt-2 pb-1 flex items-center justify-between text-white select-none flex-shrink-0 border-b border-[#10223d]">
      {/* Time */}
      <span className="text-[12px] font-bold font-sans tracking-tight text-white pl-1">
        9:41
      </span>

      {/* Dynamic Island Notch */}
      <div className="h-4 w-24 bg-black rounded-full border border-white/10 flex items-center justify-end px-2 shadow-inner">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Connectivity & Battery */}
      <div className="flex items-center gap-1.5 text-white pr-1">
        {/* Cellular signal bars */}
        <div className="flex items-end gap-[1.5px] h-2.5">
          <span className="w-[2.5px] h-1 bg-white rounded-full" />
          <span className="w-[2.5px] h-1.5 bg-white rounded-full" />
          <span className="w-[2.5px] h-2 bg-white rounded-full" />
          <span className="w-[2.5px] h-2.5 bg-white rounded-full" />
        </div>

        {/* WiFi */}
        <Wifi className="h-3 w-3 text-white stroke-[2.5]" />

        {/* Battery */}
        <div className="flex items-center">
          <div className="w-4 h-2.5 border border-white rounded-[3px] p-[1px] flex items-center">
            <div className="w-2.5 h-1.5 bg-emerald-400 rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-1 bg-white rounded-r" />
        </div>
      </div>
    </div>
  )
}


import React from 'react'


interface TabsProps {
    handleSwitchTab: (val: string) => void;
    tab: string;
}
const Tabs = ({
    handleSwitchTab,
    tab
}: TabsProps) => {
    return (
        <div
            className={`flex-start gap-2 relative  border bg-[#F3F4F6] h-9 p-[0.125rem] rounded-lg`}
        >
            <div
                className={`relative z-10 rounded text-sm sm:text-base text-black font-medium w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2 flex-center`}
                onClick={() => handleSwitchTab('nft')}
            >
                <span>NFTs</span>
            </div>
            <div
                className={`relative z-10 rounded text-sm sm:text-base text-black font-medium w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2 flex-center`}
                onClick={() => handleSwitchTab('tokens')}
            >
                <span>Tokens</span>
            </div>
            <div
                style={{
                    boxShadow: "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
                }}
                className={`absolute h-8 transition-transform duration-200 top-1/2 -translate-y-1/2 left-0 rounded-[0.375rem] z-[1]  bg-white ${tab === "nft"
                    ? 'translate-x-[5%] w-[42%] '
                    : 'translate-x-[100%] w-[49%] '
                    }`}
            ></div>
        </div>
    )
}

export default Tabs
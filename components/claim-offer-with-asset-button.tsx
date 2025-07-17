export default function ClaimOfferWithAssetButton() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-center justify-start p-0 relative size-full"
      id="node-2011_2838"
    >
      <div
        className="bg-[rgba(255,255,255,0.9)] box-border content-stretch flex flex-col gap-[26px] items-start justify-start p-[10px] relative rounded-2xl shrink-0 w-[374px]"
        id="node-2011_2887"
      >
        <div className="absolute border border-[#ff6c1f] border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_2.17545px_5.43863px_0px_rgba(0,0,0,0.1)]" />
        <div
          className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
          id="node-2011_2888"
        >
          <div
            className="box-border content-stretch flex flex-row gap-5 items-center justify-start p-0 relative shrink-0"
            id="node-2011_2889"
          >
            <div
              className="bg-[#000000] bg-clip-text bg-gradient-to-r font-['Inter:Semi_Bold',_sans-serif] font-semibold from-[#ff6c1f] leading-[0] not-italic relative shrink-0 text-[#000000] text-[20px] text-left text-nowrap to-[#6973ff]"
              id="node-2011_2916"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              <p className="block leading-[1.6] whitespace-pre">
                Claim your offer
              </p>
            </div>
          </div>
        </div>
        
        {/* Asset Button Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <button className="bg-gradient-to-r from-[#ff6c1f] to-[#6973ff] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold text-sm border-2 border-white">
            📎 Asset
          </button>
        </div>
      </div>
    </div>
  );
}
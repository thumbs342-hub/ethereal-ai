const partners = [
  { name: "MTN", color: "#FFCC00", textColor: "#000000" },
  { name: "Moov", color: "#0066B3", textColor: "#FFFFFF" },
  { name: "1xBet", color: "#1A5BA8", textColor: "#FFFFFF" },
  { name: "Vitalor", color: "#00A651", textColor: "#FFFFFF" },
];

const PartnerMarquee = () => {
  return (
    <div className="w-full overflow-hidden py-6 border-t border-border/20">
      <div className="marquee-container">
        <div className="marquee-content">
          {/* First set of logos */}
          {[...Array(3)].map((_, setIndex) => (
            partners.map((partner, index) => (
              <div 
                key={`${setIndex}-${index}`}
                className="flex items-center justify-center mx-12 shrink-0"
              >
                <div 
                  className="px-6 py-3 rounded-lg font-bold text-lg tracking-wide"
                  style={{ 
                    backgroundColor: partner.color,
                    color: partner.textColor,
                  }}
                >
                  {partner.name}
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerMarquee;

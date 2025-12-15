import Image from "next/image";

const features = [
    {
        icon: "/img/icon-chat.png",
        title: "You are our #1 priority",
        description:
            "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
        icon: "/img/icon-money.png",
        title: "More savings means higher rates",
        description:
            "The more you save with us, the higher your interest rate will be!",
    },
    {
        icon: "/img/icon-security.png",
        title: "Security you can trust",
        description:
            "We use top of the line encryption to make sure your data and money is always safe.",
    },
];

export default function Features() {
    return (
        <section className="flex flex-col lg:flex-row text-center">
            <h2 className="sr-only">Features</h2>

            {features.map((feature, index) => (
                <div
                    key={index}
                    className="flex-1 px-10 py-10"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-[150px] h-[150px] rounded-full border-10 border-emerald-500 flex items-center justify-center">
                            <Image
                                src={feature.icon}
                                alt={`${feature.title} Icon`}
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>

                    <h3 className="text-[#222] text-xl font-bold mb-3">
                        {feature.title}
                    </h3>

                    <p className="text-gray-700 text-m leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            ))}
        </section>
    );
}

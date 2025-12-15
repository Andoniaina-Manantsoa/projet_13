export default function Hero() {
    return (
        <div
            className="relative h-[300px] bg-cover bg-no-repeat lg:h-[400px]"
            style={{
                backgroundImage: "url('/img/bank-tree.jpeg')",
                backgroundPosition: "0 -190px",
            }}
        >
            <section className="absolute top-1/2 right-4 bg-white p-8 text-left mx-auto lg:absolute lg:top-[50px] lg:right-[50px] lg:w-[350px] lg:m-8 text-[#2c3e50]">
                <h2 className="sr-only">Promoted Content</h2>

                <p className="font-bold text-2xl leading-tight">
                    No fees.
                </p>
                <p className="font-bold text-2xl leading-tight">
                    No minimum deposit.
                </p>
                <p className="font-bold text-2xl leading-tight">
                    High interest rates.
                </p>

                <p className="mb-0 mt-4 text-[0.9rem] lg:text-[1.2rem]">
                    Open a savings account with Argent Bank today!
                </p>
            </section>
        </div>
    );
}

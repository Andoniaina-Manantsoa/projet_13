export default function Hero() {
    return (
        <div
            className="relative h-[300px] bg-cover bg-no-repeat lg:h-[400px]"
            style={{
                backgroundImage: "url('/img/bank-tree.jpeg')",
                backgroundPosition: "0 -190px",
            }}
        >
            <section className="relative bg-white p-8 text-left mx-auto lg:absolute lg:top-[50px] lg:right-[50px] lg:w-[350px] lg:m-8 text-[#2c3e50]">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="font-bold m-0 lg:text-[1.5rem]">No fees.</p>
                <p className="font-bold mt-[-6] lg:text-[1.5rem]">
                    No minimum deposit.
                </p>
                <p className="font-bold mt-[-6] lg:text-[1.5rem]">
                    High interest rates.
                </p>
                <p className="mb-0 mt-4 text-[0.9rem] lg:text-[1.2rem]">
                    Open a savings account with Argent Bank today!
                </p>
            </section>
        </div>
    );
}